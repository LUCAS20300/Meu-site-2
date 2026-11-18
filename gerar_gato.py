"""Gera um gato low-poly estilizado e exporta como arquivo .obj (+ .mtl)."""
import numpy as np
import trimesh

parts = []
CAT = (0.95, 0.55, 0.25)          # laranja
CREAM = (0.97, 0.92, 0.82)        # barriga/patas

def add(mesh, transform, color):
    m = mesh.copy()
    m.apply_transform(transform)
    m.visual.face_colors = color
    parts.append(m)

def T(s=1, r=None, t=(0, 0, 0)):
    if np.isscalar(s):
        M = np.diag([s, s, s, 1.0])
    else:
        M = np.diag([s[0], s[1], s[2], 1.0])
    if r is not None:
        M = M @ r
    return trimesh.transformations.translation_matrix(t) @ M

sph = trimesh.creation.icosphere(subdivisions=2, radius=1.0)
cyl = trimesh.creation.cylinder(radius=1.0, height=2.0, sections=10)
cone = trimesh.creation.cone(radius=1.0, height=1.0, sections=8)
box = trimesh.creation.box(extents=(2, 2, 2))

# transformações auxiliares
def rot(axis, ang):
    return trimesh.transformations.rotation_matrix(ang, axis)

# ---- Corpo (esfera escalada, deitado) ----
add(sph, T(s=(0.62, 0.52, 0.95), t=(0, 0.95, 0)), CAT)

# ---- Cabeça ----
add(sph, T(s=0.42, t=(0, 1.35, 0.95)), CAT)

# ---- Focinho ----
add(sph, T(s=0.19, t=(0, 1.25, 1.31)), CREAM)

# ---- Nariz ----
add(sph, T(s=0.06, t=(0, 1.33, 1.36)), (0.9, 0.4, 0.35, 255))

# ---- Orelhas (cones) ----
for sx in (-1, 1):
    add(cone, T(s=(0.14, 0.30, 0.14), r=np.eye(4), t=(0.22 * sx, 1.78, 0.85)), CAT)
    # orelha interna
    add(cone, T(s=(0.09, 0.20, 0.09), t=(0.22 * sx, 1.76, 0.88)), (0.95, 0.72, 0.70, 255))

# ---- Olhos ----
for sx in (-1, 1):
    add(sph, T(s=0.07, t=(0.16 * sx, 1.45, 1.22)), (0.15, 0.13, 0.12, 255))

# ---- Barriga ----
add(sph, T(s=(0.42, 0.30, 0.62), t=(0, 0.78, 0.15)), CREAM)

# ---- Patas (cilindros curtos + esfera) ----
for sx in (-1, 1):
    for sz in (0.55, -0.35):
        add(cyl, T(s=(0.10, 0.45, 0.10), t=(0.45 * sx, 0.32, sz)), CAT)
        add(sph, T(s=0.13, t=(0.45 * sx, 0.14, sz + 0.02)), CREAM)

# ---- Cauda alongada (vários segmentos curvados) ----
seg = 8
for i in range(seg):
    f = i / (seg - 1)
    x = -0.30 * (1 - f) * 0.001
    z = -0.95 - 0.30 * f
    y = 1.05 + 0.85 * f ** 1.6
    add(sph, T(s=0.13 * (1 - 0.35 * f), t=(x, y, z)), CAT)

# ---- Listras (caixinhas finas no dorso) ----
for i, z in enumerate((-0.45, -0.05, 0.35)):
    add(box, T(s=(0.02, 0.035, 0.16), t=(0, 1.44 - abs(z) * 0.25, z)), (0.85, 0.42, 0.15, 255))

# ---- Bigodes (caixinhas finíssimas) ----
for sx in (-1, 1):
    for dy in (-0.05, 0.02):
        add(box, T(s=(0.008, 0.008, 0.22), r=rot((0, 1, 0), np.radians(6 * sx)),
                   t=(0.13 * sx, 1.28 + dy, 1.30)), (0.98, 0.97, 0.95, 255))

cat = trimesh.util.concatenate(parts)

# Suavizações/acertos finais
cat.merge_vertices(merge_tex=True, merge_norm=True)
cat.update_faces(cat.nondegenerate_faces())
cat.update_faces(cat.unique_faces())

cat.export("/workspace/gato3d/gato.obj")
print("Vertices:", len(cat.vertices), "| Faces:", len(cat.faces))
print("Bounds:", cat.bounds.round(2).tolist())
