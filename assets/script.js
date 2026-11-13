const AFFILIATE_BASE = "https://shopee.com.br";

const products = [
  { id: 1, emoji: "🎧", name: "Fone de Ouvido Bluetooth TWS Pro", price: "R$ 29,90", old: "R$ 89,90", rating: 4.8, cat: "eletronicos", tag: "MAIS VENDIDO", url: AFFILIATE_BASE + "/SEU-LINK-AFILIADO-1" },
  { id: 2, emoji: "⌚", name: "Smartwatch Relógio Inteligente com Monitor Cardíaco", price: "R$ 59,90", old: "R$ 199,90", rating: 4.7, cat: "eletronicos", tag: "FRETE GRÁTIS", url: AFFILIATE_BASE + "/SEU-LINK-AFILIADO-2" },
  { id: 3, emoji: "💡", name: "Luminária LED de Mesa Touch Recarregável", price: "R$ 19,90", old: "R$ 49,90", rating: 4.6, cat: "casa", tag: "OFERTA RELÂMPAGO", url: AFFILIATE_BASE + "/SEU-LINK-AFILIADO-3" },
  { id: 4, emoji: "🍳", name: "Air Fryer 4L Digital Antiaderente", price: "R$ 219,90", old: "R$ 399,90", rating: 4.9, cat: "casa", tag: "MAIS VENDIDO", url: AFFILIATE_BASE + "/SEU-LINK-AFILIADO-4" },
  { id: 5, emoji: "👕", name: "Camiseta Básica Algodão Premium Unissex", price: "R$ 24,90", old: "R$ 59,90", rating: 4.5, cat: "moda", tag: "PROMOÇÃO", url: AFFILIATE_BASE + "/SEU-LINK-AFILIADO-5" },
  { id: 6, emoji: "💄", name: "Kit Maquiagem Profissional 12 Peças", price: "R$ 39,90", old: "R$ 99,90", rating: 4.7, cat: "beleza", tag: "FRETE GRÁTIS", url: AFFILIATE_BASE + "/SEU-LINK-AFILIADO-6" },
  { id: 7, emoji: "🎮", name: "Controle Sem Fio para Smartphone e PC", price: "R$ 79,90", old: "R$ 149,90", rating: 4.6, cat: "games", tag: "OFERTA RELÂMPAGO", url: AFFILIATE_BASE + "/SEU-LINK-AFILIADO-7" },
  { id: 8, emoji: "🔌", name: "Carregador Rápido 20W com Cabo USB-C", price: "R$ 22,90", old: "R$ 59,90", rating: 4.8, cat: "eletronicos", tag: "PROMOÇÃO", url: AFFILIATE_BASE + "/SEU-LINK-AFILIADO-8" },
  { id: 9, emoji: "🧴", name: "Organizador Multiuso para Cozinha", price: "R$ 34,90", old: "R$ 79,90", rating: 4.5, cat: "casa", tag: "MAIS VENDIDO", url: AFFILIATE_BASE + "/SEU-LINK-AFILIADO-9" },
  { id: 10, emoji: "👟", name: "Tênis Esportivo Leve Unissex", price: "R$ 89,90", old: "R$ 199,90", rating: 4.6, cat: "moda", tag: "FRETE GRÁTIS", url: AFFILIATE_BASE + "/SEU-LINK-AFILIADO-10" },
  { id: 11, emoji: "🎧", name: "Caixa de Som Bluetooth Portátil à Prova d'Água", price: "R$ 49,90", old: "R$ 119,90", rating: 4.7, cat: "eletronicos", tag: "PROMOÇÃO", url: AFFILIATE_BASE + "/SEU-LINK-AFILIADO-11" },
  { id: 12, emoji: "🪞", name: "Lâmpada LED RGB Inteligente Wi-Fi", price: "R$ 27,90", old: "R$ 69,90", rating: 4.5, cat: "casa", tag: "OFERTA RELÂMPAGO", url: AFFILIATE_BASE + "/SEU-LINK-AFILIADO-12" }
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const empty = document.getElementById("empty");
let activeCat = "todos";

function render() {
  const term = search.value.toLowerCase().trim();
  const filtered = products.filter(p => {
    const matchCat = activeCat === "todos" || p.cat === activeCat;
    const matchTerm = p.name.toLowerCase().includes(term);
    return matchCat && matchTerm;
  });

  grid.innerHTML = filtered.map(p => `
    <article class="card">
      <div class="card-img">${p.emoji}</div>
      <div class="card-body">
        <span class="card-tag">${p.tag}</span>
        <h3>${p.name}</h3>
        <div class="rating">⭐ ${p.rating.toFixed(1)} <span style="color:var(--muted)">(avaliações Shopee)</span></div>
        <div class="price-row">
          <span class="price">${p.price}</span>
          <span class="price-old">${p.old}</span>
        </div>
        <a class="card-btn" href="${p.url}" target="_blank" rel="nofollow sponsored noopener">Comprar na Shopee 🛒</a>
      </div>
    </article>
  `).join("");

  empty.hidden = filtered.length > 0;
}

search.addEventListener("input", render);

document.querySelectorAll(".category").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(c => c.classList.remove("active"));
    link.classList.add("active");
    activeCat = link.dataset.cat;
    render();
  });
});

document.querySelectorAll(".copy-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(btn.dataset.code); } catch (e) {}
    const original = btn.textContent;
    btn.textContent = "Copiado! ✓";
    setTimeout(() => (btn.textContent = original), 1800);
  });
});

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

render();
