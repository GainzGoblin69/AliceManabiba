"use strict";
/* =====================================================================
   ALICE'S WARDROBE — everything she can unlock with hearts, and the
   dress-up Alice drawn from whatever she's wearing.
   Prices: a word earns 10-15 hearts, so the first things cost ~10.
   ===================================================================== */
const HRT = '<span class="hrt">♥\uFE0E</span>';
const WARDROBE = {
  hairColor: { label: "Hair color", icon: "🎨", view: "head", items: [
    { id: "golden", name: "Golden", price: 0, c: "#f0c454" },
    { id: "honey", name: "Honey", price: 10, c: "#e0a640" },
    { id: "brown", name: "Brown", price: 10, c: "#8a5a34" },
    { id: "chestnut", name: "Chestnut", price: 15, c: "#6b3a1f" },
    { id: "black", name: "Black", price: 15, c: "#2b2230" },
    { id: "ginger", name: "Ginger", price: 20, c: "#d8672a" },
    { id: "strawberry", name: "Strawberry", price: 20, c: "#f29a7e" },
    { id: "pink", name: "Pink", price: 30, c: "#ff8fc0" },
    { id: "lavender", name: "Lavender", price: 30, c: "#b79cf0" },
    { id: "sky", name: "Sky blue", price: 35, c: "#7cc4f2" },
    { id: "mint", name: "Mint", price: 35, c: "#8fe0c4" },
    { id: "midnight", name: "Midnight", price: 40, c: "#3c4fa8" },
    { id: "silver", name: "Silver", price: 40, c: "#d8dbe6" },
    { id: "rosegold", name: "Rose gold", price: 45, c: "#e8a598" },
    { id: "rainbow", name: "Rainbow", price: 90, c: "#ff8fc0", rainbow: true },
  ]},
  hairStyle: { label: "Hairstyle", icon: "✂️", view: "hair", items: [
    { id: "long", name: "Long", price: 0 },
    { id: "bob", name: "Bob", price: 25 },
    { id: "pigtails", name: "Pigtails", price: 30 },
    { id: "ponytail", name: "Ponytail", price: 30 },
    { id: "bun", name: "Bun", price: 35 },
    { id: "braids", name: "Braids", price: 40 },
    { id: "wavy", name: "Wavy", price: 40 },
    { id: "curly", name: "Curly", price: 50 },
    { id: "spacebuns", name: "Space buns", price: 55 },
  ]},
  outfit: { label: "Outfit", icon: "👗", view: "outfit", items: [
    { id: "pinafore", name: "Pinafore", price: 0 },
    { id: "party", name: "Tutu", price: 35 },
    { id: "dots", name: "Tea party", price: 40 },
    { id: "sailor", name: "Sailor", price: 50 },
    { id: "overalls", name: "Overalls", price: 50 },
    { id: "stars", name: "Starry night", price: 60 },
    { id: "waistcoat", name: "Rabbit's coat", price: 65 },
    { id: "hearts", name: "Queen of Hearts", price: 75 },
    { id: "cards", name: "Card guard", price: 75 },
    { id: "gown", name: "Ball gown", price: 90 },
  ]},
  dressColor: { label: "Colors", icon: "🌈", view: "outfit", items: [
    { id: "alice", name: "Alice blue", price: 0, c: "#6fa3d6" },
    { id: "rose", name: "Rose", price: 0, c: "#d9607a" },
    { id: "skyblue", name: "Sky", price: 10, c: "#7fb6ea" },
    { id: "lilac", name: "Lilac", price: 10, c: "#b394e6" },
    { id: "mintgreen", name: "Mint", price: 10, c: "#7fd3b0" },
    { id: "sunshine", name: "Sunshine", price: 15, c: "#f5c842" },
    { id: "peach", name: "Peach", price: 15, c: "#f6a37a" },
    { id: "coral", name: "Coral", price: 15, c: "#ff7f6b" },
    { id: "bubblegum", name: "Bubblegum", price: 20, c: "#ff9ad5" },
    { id: "ruby", name: "Ruby", price: 20, c: "#c8203a" },
    { id: "teal", name: "Teal", price: 20, c: "#2bb3b1" },
    { id: "emerald", name: "Emerald", price: 25, c: "#2e9b6a" },
    { id: "navy", name: "Navy", price: 25, c: "#2f3e7a" },
    { id: "snow", name: "Snow white", price: 25, c: "#f3f0ea" },
    { id: "night", name: "Night", price: 25, c: "#3a2c4a" },
    { id: "gold", name: "Gold", price: 40, c: "#e0b03a" },
  ]},
  extra: { label: "Extras", icon: "👑", view: "top", items: [
    { id: "band", name: "Hair band", price: 0 },
    { id: "none", name: "Nothing", price: 0 },
    { id: "clips", name: "Heart clips", price: 15 },
    { id: "bow", name: "Big bow", price: 25 },
    { id: "flowers", name: "Flower crown", price: 35 },
    { id: "catears", name: "Cat ears", price: 40 },
    { id: "bunny", name: "Bunny ears", price: 45 },
    { id: "glasses", name: "Heart glasses", price: 45 },
    { id: "tiara", name: "Tiara", price: 60 },
    { id: "tophat", name: "Top hat", price: 65 },
    { id: "crown", name: "Royal crown", price: 90 },
  ]},
  skin: { label: "Skin", icon: "🙂", view: "head", items: [
    { id: "s1", name: "Fair", price: 0, c: "#f8dcc8" },
    { id: "s2", name: "Light", price: 0, c: "#f1c6a3" },
    { id: "s3", name: "Tan", price: 0, c: "#d9a07a" },
    { id: "s4", name: "Golden", price: 0, c: "#c08458" },
    { id: "s5", name: "Brown", price: 0, c: "#8a5634" },
    { id: "s6", name: "Deep", price: 0, c: "#5e3a22" },
  ]},
};
const WARD_ORDER = ["hairColor", "hairStyle", "outfit", "dressColor", "extra", "skin"];
const DEFAULT_LOOK = { hairColor: "golden", hairStyle: "long", outfit: "pinafore", dressColor: "alice", extra: "band", skin: "s1" };

function itemOf(cat, id) { const list = WARDROBE[cat].items; return list.find(i => i.id === id) || list[0]; }
function cleanLook(look) {
  const out = {};
  for (const cat of WARD_ORDER) { const id = look && look[cat]; out[cat] = WARDROBE[cat].items.some(i => i.id === id) ? id : DEFAULT_LOOK[cat]; }
  return out;
}
function owns(s, cat, id) { const it = itemOf(cat, id); return it.price === 0 || !!(s.owned && s.owned[cat + ":" + id]); }
function cheapestNew(s) {
  let best = null;
  for (const cat of WARD_ORDER) for (const it of WARDROBE[cat].items)
    if (!owns(s, cat, it.id) && (!best || it.price < best.price)) best = it;
  return best;
}

/* ---------- drawing Alice ---------- */
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16), ch = [n >> 16, (n >> 8) & 255, n & 255];
  const f = v => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
  return "#" + ch.map(v => f(v).toString(16).padStart(2, "0")).join("");
}
function heartPath(x, y, s) {
  return `M${x} ${y + s} C${x - s * 1.5} ${y - s * .1} ${x - s * .7} ${y - s * 1.3} ${x} ${y - s * .4} C${x + s * .7} ${y - s * 1.3} ${x + s * 1.5} ${y - s * .1} ${x} ${y + s} Z`;
}
const VIEWS = { body: "0 -30 100 202", outfit: "4 14 92 158", head: "16 4 68 72", hair: "4 -6 92 122", top: "8 -30 84 100" };
let svgUid = 0;

function aliceSVG(look, view) {
  look = cleanLook(look);
  const uid = "al" + (++svgUid);
  const hc = itemOf("hairColor", look.hairColor), skin = itemOf("skin", look.skin).c, dc = itemOf("dressColor", look.dressColor).c;
  const style = look.hairStyle, outfit = look.outfit, extra = look.extra;
  let defs = "";
  let H = hc.c;
  if (hc.rainbow) {
    defs += `<linearGradient id="${uid}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6b8b"/><stop offset=".22" stop-color="#ffb347"/><stop offset=".42" stop-color="#ffe066"/><stop offset=".62" stop-color="#7ed98b"/><stop offset=".8" stop-color="#6cb8ff"/><stop offset="1" stop-color="#b48cf2"/></linearGradient>`;
    H = `url(#${uid}r)`;
  }
  const HD = hc.rainbow ? "#b07ad6" : shade(hc.c, -.28);
  const C = dc, D = shade(dc, -.28), L = shade(dc, .38);
  const skinD = shade(skin, -.12);
  const P = [];

  // ---- hair behind the head
  const cap = `<circle cx="50" cy="44" r="24" fill="${H}"/>`;
  if (style === "long") P.push(`<path d="M24 44 Q14 70 20 88 Q16 100 30 106 Q50 110 70 106 Q84 100 80 88 Q86 70 76 44 Z" fill="${H}"/><path d="M24 60 Q20 80 26 100 M30 70 Q28 88 34 104 M76 60 Q80 80 74 100 M70 70 Q72 88 66 104" fill="none" stroke-width=".7" opacity=".5"/>`);
  else if (style === "wavy") P.push(`<path d="M25 42 Q13 58 21 70 Q11 82 20 94 Q13 106 28 112 L72 112 Q87 106 80 94 Q89 82 79 70 Q87 58 75 42 Z" fill="${H}"/>`);
  else if (style === "bob") P.push(`<path d="M24 42 Q19 66 28 73 Q50 78 72 73 Q81 66 76 42 Z" fill="${H}"/>`);
  else if (style === "ponytail") P.push(cap, `<path d="M64 30 Q100 38 90 100 Q84 108 79 98 Q86 62 66 44 Z" fill="${H}"/>`);
  else if (style === "bun") P.push(`<circle cx="50" cy="15" r="13" fill="${H}"/>`, cap);
  else if (style === "spacebuns") P.push(`<circle cx="28" cy="22" r="11" fill="${H}"/><circle cx="72" cy="22" r="11" fill="${H}"/>`, cap);
  else if (style === "curly") {
    let c = "";
    for (let a = 140; a <= 400; a += 26) { const r = a * Math.PI / 180; c += `<circle cx="${(50 + 26 * Math.cos(r)).toFixed(1)}" cy="${(44 + 26 * Math.sin(r)).toFixed(1)}" r="11"/>`; }
    [[25, 68], [75, 68], [27, 84], [73, 84], [34, 96], [66, 96], [50, 70]].forEach(([x, y]) => c += `<circle cx="${x}" cy="${y}" r="11"/>`);
    P.push(`<g fill="${H}" stroke="${HD}" stroke-width="1">${c}</g>`, cap);
  }
  else P.push(cap); // pigtails, braids: sides drawn later

  // ---- legs and shoes
  const legTop = { party: 108, overalls: 146, gown: 999 }[outfit] || 132;
  if (legTop < 160) P.push(`<rect x="38" y="${legTop}" width="8" height="${160 - legTop}" rx="3" fill="#fff"/><rect x="54" y="${legTop}" width="8" height="${160 - legTop}" rx="3" fill="#fff"/><path d="M38 146 h8 M38 152 h8 M54 146 h8 M54 152 h8" fill="none" stroke="#6fa3d6" stroke-width="1.6"/>`);
  const shoe = outfit === "gown" ? 164 : 162;
  P.push(`<ellipse cx="42" cy="${shoe}" rx="8" ry="5" fill="#2a1b2e"/><ellipse cx="58" cy="${shoe}" rx="8" ry="5" fill="#2a1b2e"/>`);

  // ---- the outfit
  const dress = `<path d="M34 76 L66 76 L84 140 Q50 150 16 140 Z" fill="${C}"/>`;
  let puff = false;
  switch (outfit) {
    case "pinafore":
      P.push(dress, `<path d="M38 80 L62 80 L72 136 Q50 143 28 136 Z" fill="#fffaf2"/><path d="M38 80 L62 80 L60 92 L40 92 Z" fill="#fffaf2"/><path d="M37 82 Q28 76 31 88 Q34 84 39 88 Z M63 82 Q72 76 69 88 Q66 84 61 88 Z" fill="#fffaf2"/><path d="M36 93 Q50 97 64 93" fill="none" stroke-width="1"/><path d="M36 112 q5 5 10 0 M54 112 q5 5 10 0" fill="none" stroke="#b9382f" stroke-width="1.4"/><path d="M30 134 Q50 141 70 134" fill="none" stroke="#b9382f" stroke-width="1.2"/>`);
      break;
    case "dots":
      P.push(dress, `<g fill="#fff">${[[30, 112], [44, 124], [58, 108], [70, 128], [38, 138], [62, 140], [50, 96], [26, 132], [74, 112], [52, 132]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2"/>`).join("")}</g><path d="M38 76 Q50 90 62 76 Z" fill="#fff"/>`);
      puff = true; break;
    case "stars":
      P.push(dress, `<g fill="#ffe27a" font-size="10" text-anchor="middle">${[[30, 116], [46, 128], [60, 104], [70, 126], [38, 100], [56, 140], [24, 136], [76, 138]].map(([x, y]) => `<text x="${x}" y="${y}">★</text>`).join("")}</g><rect x="35" y="92" width="30" height="5" rx="2" fill="#ffd34d"/>`);
      puff = true; break;
    case "hearts":
      P.push(dress, `<path d="M20 136 Q50 146 80 136" stroke="#ffd34d" stroke-width="3" fill="none"/><g fill="#fff">${[[32, 112], [50, 122], [66, 110], [40, 134], [62, 134], [50, 100]].map(([x, y]) => `<path d="${heartPath(x, y, 4)}"/>`).join("")}</g><path d="M30 77 L35 69 L40 77 L45 69 L50 77 L55 69 L60 77 L65 69 L70 77 Z" fill="#fff" stroke="#e8dde2" stroke-width="1"/>`);
      puff = true; break;
    case "sailor":
      P.push(dress, `<path d="M20 130 Q50 140 80 130" stroke="#fff" stroke-width="3" fill="none"/><path d="M19 135 Q50 145 81 135" stroke="#fff" stroke-width="2" fill="none"/><path d="M34 76 L66 76 L60 98 L50 90 L40 98 Z" fill="#fff"/><path d="M44 92 L50 98 L56 92 L53 104 L50 100 L47 104 Z" fill="#e23b4f"/>`);
      puff = true; break;
    case "party":
      P.push(`<ellipse cx="50" cy="112" rx="36" ry="12" fill="${L}"/><ellipse cx="50" cy="106" rx="31" ry="11" fill="${C}"/><ellipse cx="50" cy="101" rx="24" ry="7" fill="${L}"/><path d="M36 76 L64 76 L62 101 L38 101 Z" fill="${C}"/><g fill="#fff">${[[28, 110], [44, 114], [60, 113], [74, 108], [36, 104], [66, 103]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4"/>`).join("")}</g>`);
      puff = true; break;
    case "overalls":
      P.push(`<path d="M33 76 L67 76 L69 102 L31 102 Z" fill="#fff"/><path d="M33 100 L67 100 L66 148 L52 148 L50 118 L48 148 L34 148 Z" fill="${C}"/><rect x="40" y="84" width="20" height="18" rx="3" fill="${C}"/><path d="M41 86 L37 77 M59 86 L63 77" stroke="${C}" stroke-width="4" stroke-linecap="round"/><circle cx="42" cy="88" r="1.8" fill="#ffd34d"/><circle cx="58" cy="88" r="1.8" fill="#ffd34d"/><rect x="45" y="90" width="10" height="7" rx="1.5" fill="${D}"/>`);
      break;
    case "cards":
      P.push(dress, `<path d="M38 82 L62 82 L69 136 L31 136 Z" fill="#fffdf6" stroke="${D}" stroke-width="1.5"/><text x="50" y="117" font-size="24" text-anchor="middle" fill="#c8203a">♥</text><text x="37" y="92" font-size="7" fill="#c8203a">♥</text><text x="63" y="132" font-size="7" text-anchor="end" fill="#c8203a">♥</text>`);
      break;
    case "waistcoat":
      P.push(`<path d="M34 98 L66 98 L80 140 Q50 148 20 140 Z" fill="${D}"/><path d="M34 76 L66 76 L66 100 L34 100 Z" fill="#fff"/><path d="M36 76 L46 76 L50 90 L54 76 L64 76 L64 104 L50 112 L36 104 Z" fill="${C}"/><g fill="#ffd34d"><circle cx="50" cy="96" r="1.6"/><circle cx="50" cy="103" r="1.6"/></g><circle cx="59" cy="99" r="4" fill="#ffd34d" stroke="#b8862a" stroke-width="1"/><path d="M55 99 Q48 96 44 100" stroke="#ffd34d" stroke-width="1" fill="none"/>`);
      break;
    case "gown":
      P.push(`<path d="M34 76 L66 76 L72 102 Q98 148 94 164 Q50 174 6 164 Q2 148 28 102 Z" fill="${C}"/><path d="M28 104 Q50 112 72 104 Q86 136 82 160 Q50 168 18 160 Q14 136 28 104 Z" fill="${L}" opacity=".45"/><path d="M36 76 L64 76 L62 102 Q50 108 38 102 Z" fill="${D}"/><path d="M8 162 Q50 174 92 162" stroke="#ffd34d" stroke-width="3" fill="none"/><g fill="#fff8c4">${[[24, 130], [40, 146], [60, 140], [76, 128], [50, 124], [30, 156], [70, 156]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6"/>`).join("")}</g>`);
      puff = true; break;
  }
  // arms, then puffy sleeves over the shoulders
  P.push(`<path d="M34 78 Q24 96 22 110 M66 78 Q76 96 78 110" stroke="#2e2016" stroke-width="9.3" fill="none"/><path d="M34 78 Q24 96 22 110 M66 78 Q76 96 78 110" stroke="${skin}" stroke-width="7" fill="none"/>`);
  if (puff) P.push(`<circle cx="34" cy="80" r="7.5" fill="${L}"/><circle cx="66" cy="80" r="7.5" fill="${L}"/>`);

  // ---- head and face
  P.push(`<rect x="45" y="64" width="10" height="14" fill="${skin}"/><circle cx="50" cy="46" r="22" fill="${skin}"/>`);
  if (extra !== "glasses") P.push(`<ellipse cx="42" cy="48.5" rx="2.3" ry="2.9" fill="#2e2016" stroke="none"/><ellipse cx="58" cy="48.5" rx="2.3" ry="2.9" fill="#2e2016" stroke="none"/><circle cx="42.8" cy="47.4" r=".9" fill="#fff" stroke="none"/><circle cx="58.8" cy="47.4" r=".9" fill="#fff" stroke="none"/><path d="M38.6 46.4 Q41 44 44.6 45.6 M55.4 45.6 Q59 44 61.4 46.4" fill="none" stroke-width="1"/><path d="M38.5 42.5 Q42 40.6 45.5 42 M54.5 42 Q58 40.6 61.5 42.5" fill="none" stroke-width=".8" opacity=".7"/>`);
  P.push(`<circle cx="37" cy="55" r="4" fill="#f7a6b6" opacity=".6" stroke="none"/><circle cx="63" cy="55" r="4" fill="#f7a6b6" opacity=".6" stroke="none"/><path d="M49.4 51.5 Q48.6 54 50.6 54.4" fill="none" stroke-width=".9" opacity=".7"/><path d="M45 58 Q50 61.6 55 58" stroke="#b03a3a" stroke-width="1.8" fill="none"/>`);

  // ---- hair at the sides and in front
  if (style === "pigtails") P.push(`<ellipse cx="21" cy="60" rx="9" ry="17" transform="rotate(22 21 60)" fill="${H}"/><ellipse cx="79" cy="60" rx="9" ry="17" transform="rotate(-22 79 60)" fill="${H}"/><circle cx="26" cy="45" r="4" fill="#ff6fa3"/><circle cx="74" cy="45" r="4" fill="#ff6fa3"/>`);
  if (style === "braids") {
    let b = "";
    for (let k = 0; k < 7; k++) { const y = 62 + k * 8; b += `<ellipse cx="${29 + (k % 2)}" cy="${y}" rx="6" ry="5"/><ellipse cx="${71 - (k % 2)}" cy="${y}" rx="6" ry="5"/>`; }
    P.push(`<g fill="${H}" stroke="${HD}" stroke-width=".8">${b}</g><circle cx="30" cy="114" r="3.5" fill="#ff6fa3"/><circle cx="70" cy="114" r="3.5" fill="#ff6fa3"/>`);
  }
  if (style === "curly") P.push(`<g fill="${H}" stroke="${HD}" stroke-width="1"><circle cx="35" cy="30" r="9"/><circle cx="45" cy="25" r="9"/><circle cx="56" cy="25" r="9"/><circle cx="66" cy="31" r="9"/></g>`);
  else if (style === "bob") P.push(`<path d="M27 48 Q25 20 50 20 Q75 20 73 48 Q70 30 56 30 Q60 36 44 36 Q32 34 27 48 Z" fill="${H}"/>`);
  else P.push(`<path d="M27 46 Q26 20 50 20 Q74 20 73 46 Q68 32 50 32 Q32 32 27 46 Z" fill="${H}"/><path d="M36 24 Q31 30 30 38 M44 21.5 Q40 26 39 32 M56 21.5 Q60 26 61 32 M64 24 Q69 30 70 38" fill="none" stroke-width=".7" opacity=".55"/>`);

  // ---- extras
  switch (extra) {
    case "band": P.push(`<path d="M29 36 Q50 18 71 36" stroke="#2a1b2e" stroke-width="5" fill="none" stroke-linecap="round"/>`); break;
    case "clips": P.push(`<path d="${heartPath(32, 34, 4.5)}" fill="#ff4f8b"/><path d="${heartPath(68, 34, 4.5)}" fill="#ff4f8b"/>`); break;
    case "bow": P.push(`<g transform="rotate(-14 34 22)"><path d="M34 22 L20 12 L20 32 Z" fill="#ff4f8b"/><path d="M34 22 L48 12 L48 32 Z" fill="#ff4f8b"/><circle cx="34" cy="22" r="4.5" fill="#e0306f"/></g>`); break;
    case "flowers": P.push(`<path d="M28 34 Q50 16 72 34" stroke="#6fb86a" stroke-width="3" fill="none"/>` + [[29, 32, "#ff8fc0"], [37, 25, "#fff"], [46, 21, "#ffd34d"], [55, 21, "#ff8fc0"], [64, 25, "#fff"], [71, 32, "#ffd34d"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${c}"/><circle cx="${x}" cy="${y}" r="1.6" fill="#f0a020"/>`).join("")); break;
    case "catears": P.push(`<path d="M28 30 L30 6 L44 22 Z" fill="#a35bd1"/><path d="M72 30 L70 6 L56 22 Z" fill="#a35bd1"/><path d="M31 25 L32 12 L40 22 Z" fill="#ff9ad5"/><path d="M69 25 L68 12 L60 22 Z" fill="#ff9ad5"/><path d="M29 36 Q50 18 71 36" stroke="#a35bd1" stroke-width="4" fill="none"/>`); break;
    case "bunny": P.push(`<ellipse cx="39" cy="2" rx="7" ry="20" transform="rotate(-10 39 2)" fill="#fff" stroke="#e8dde2"/><ellipse cx="61" cy="2" rx="7" ry="20" transform="rotate(10 61 2)" fill="#fff" stroke="#e8dde2"/><ellipse cx="39" cy="4" rx="3.5" ry="14" transform="rotate(-10 39 4)" fill="#ffb6cf"/><ellipse cx="61" cy="4" rx="3.5" ry="14" transform="rotate(10 61 4)" fill="#ffb6cf"/><path d="M29 36 Q50 18 71 36" stroke="#fff" stroke-width="4" fill="none"/>`); break;
    case "glasses": P.push(`<path d="${heartPath(41, 48, 7)}" fill="#ff4f8b" opacity=".9"/><path d="${heartPath(59, 48, 7)}" fill="#ff4f8b" opacity=".9"/><path d="M47 46 Q50 44 53 46" stroke="#c0306a" stroke-width="2" fill="none"/><path d="M29 45 L34 46 M71 45 L66 46" stroke="#c0306a" stroke-width="2"/>`); break;
    case "tiara": P.push(`<path d="M33 28 L37 17 L43 24 L50 9 L57 24 L63 17 L67 28 Q50 22 33 28 Z" fill="#ffd34d" stroke="#c9962a" stroke-width="1.2"/><circle cx="50" cy="19" r="3.2" fill="#ff4f8b"/><circle cx="38" cy="23" r="1.8" fill="#7cc4f2"/><circle cx="62" cy="23" r="1.8" fill="#7cc4f2"/>`); break;
    case "tophat": P.push(`<g transform="rotate(12 58 18)"><ellipse cx="58" cy="22" rx="22" ry="5" fill="#3a2a4a"/><rect x="45" y="-8" width="26" height="30" rx="2" fill="#3a2a4a"/><rect x="45" y="12" width="26" height="6" fill="${C}"/><rect x="62" y="2" width="10" height="7" fill="#fff" stroke="#ccc" stroke-width=".6"/><text x="67" y="7.6" font-size="4.2" text-anchor="middle" fill="#333">10/6</text></g>`); break;
    case "crown": P.push(`<path d="M32 30 L32 10 L41 20 L50 2 L59 20 L68 10 L68 30 Z" fill="#ffd34d" stroke="#c9962a" stroke-width="1.4"/><rect x="32" y="25" width="36" height="6" fill="#f0b830"/><circle cx="50" cy="16" r="3.4" fill="#e23b4f"/><circle cx="40" cy="28" r="2" fill="#7cc4f2"/><circle cx="60" cy="28" r="2" fill="#7fd3b0"/>`); break;
  }
  return `<svg viewBox="${VIEWS[view || "body"]}" xmlns="http://www.w3.org/2000/svg"><defs>${defs}</defs><g stroke="#2e2016" stroke-width="1.15" stroke-linejoin="round" stroke-linecap="round">${P.join("")}</g></svg>`;
}

/* ---------- the wardrobe screen ---------- */
let wardTab = "hairColor";

function goWardrobe() {
  TTS.stop(); busy = false; setFocus(null); show("wardrobe");
  $("wardPoints").innerHTML = HRT + " " + save.points;
  buildWardTabs(); showWardTab(wardTab);
  setFocus(document.querySelector(`#wardTabs .tab[data-tab="${wardTab}"]`));
  wardMsg("Pick a tab, then try things on!");
}
function wardMsg(t) { $("wardMsg").innerHTML = t; }
function wardPreview(look) { $("wardAlice").innerHTML = aliceSVG(look || save.look); }

function buildWardTabs() {
  const box = $("wardTabs"); box.innerHTML = "";
  WARD_ORDER.forEach((cat, k) => {
    const t = document.createElement("div"); t.className = "tab fx" + (cat === wardTab ? " active" : "");
    t.dataset.tab = cat; t.style.left = (k * 165) + "px";
    t.innerHTML = `<span>${WARDROBE[cat].icon}</span>${WARDROBE[cat].label}`;
    box.appendChild(t);
  });
}
function showWardTab(cat) {
  wardTab = cat;
  document.querySelectorAll("#wardTabs .tab").forEach(t => t.classList.toggle("active", t.dataset.tab === cat));
  const grid = $("wardGrid"); grid.innerHTML = "";
  WARDROBE[cat].items.forEach((it, k) => {
    const d = document.createElement("div"); d.className = "tile fx"; d.dataset.cat = cat; d.dataset.item = it.id;
    d.style.left = ((k % 6) * 165) + "px"; d.style.top = (Math.floor(k / 6) * 198) + "px";
    grid.appendChild(d);
  });
  refreshTiles();
  wardPreview();
}
function refreshTiles() {
  document.querySelectorAll("#wardGrid .tile").forEach(d => {
    const cat = d.dataset.cat, it = itemOf(cat, d.dataset.item), mine = owns(save, cat, it.id), wearing = save.look[cat] === it.id;
    const look = Object.assign({}, save.look, { [cat]: it.id });
    d.classList.toggle("wearing", wearing); d.classList.toggle("locked", !mine);
    d.innerHTML = `<div class="pv">${aliceSVG(look, WARDROBE[cat].view)}</div><div class="nm">${it.name}</div>`
      + `<div class="pr">${wearing ? "Wearing" : mine ? "✓ Yours" : it.price + " " + HRT}</div>`;
  });
  $("wardPoints").innerHTML = HRT + " " + save.points;
}
/* focusing a tile tries it on; focusing a tab opens it */
function wardFocus(el) {
  if (screen !== "wardrobe" || !el) return;
  if (el.dataset.tab) { if (el.dataset.tab !== wardTab) showWardTab(el.dataset.tab); wardPreview(); wardMsg(`${WARDROBE[el.dataset.tab].icon} ${WARDROBE[el.dataset.tab].label} · press ▼ to try them on`); return; }
  if (el.dataset.item) {
    const cat = el.dataset.cat, it = itemOf(cat, el.dataset.item);
    wardPreview(Object.assign({}, save.look, { [cat]: it.id }));
    if (save.look[cat] === it.id) wardMsg(`${it.name} · wearing it now`);
    else if (owns(save, cat, it.id)) wardMsg(`${it.name} · press OK to wear it`);
    else if (save.points >= it.price) wardMsg(`${it.name} · press OK to buy it for <b>${it.price} ${HRT}</b>`);
    else wardMsg(`${it.name} costs ${it.price} ${HRT} · spell ${Math.ceil((it.price - save.points) / 10)} more word${it.price - save.points > 10 ? "s" : ""} to get it!`);
  }
}
function wardPick(el) {
  const cat = el.dataset.cat, it = itemOf(cat, el.dataset.item);
  if (owns(save, cat, it.id)) {
    save.look[cat] = it.id; Store.set(save); Snd.play("step");
  } else if (save.points >= it.price) {
    save.points -= it.price; save.owned[cat + ":" + it.id] = true; save.look[cat] = it.id; Store.set(save);
    Snd.play("win"); confetti(18); setTimeout(() => TTS.say("Ooh, " + it.name + "!", .95), 900);
  } else { Snd.play("bzz"); el.classList.remove("wrong"); void el.offsetWidth; el.classList.add("wrong"); return; }
  refreshTiles(); wardFocus(el); refreshAlice();
}
/* her look everywhere she appears */
function refreshAlice() {
  const t = $("titleAlice"); if (t) t.innerHTML = aliceSVG(save.look);
  const m = $("mapAlice"); if (m) m.innerHTML = aliceSVG(save.look);
  const o = $("ovAlice"); if (o) o.innerHTML = aliceSVG(save.look);
  const b = $("btnWardrobe"); if (b) { const n = cheapestNew(save); b.classList.toggle("newstuff", !!n && n.price <= save.points); }
}
