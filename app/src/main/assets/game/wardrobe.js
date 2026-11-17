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
const VIEWS = { body: "0 -62 200 466", outfit: "14 104 172 300", head: "52 12 96 112", hair: "10 -62 180 320", top: "24 -66 152 196" };
let svgUid = 0;
function starPath(cx, cy, r) {
  let d = "";
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, q = k % 2 ? r * .45 : r; d += (k ? "L" : "M") + (cx + q * Math.cos(a)).toFixed(1) + " " + (cy + q * Math.sin(a)).toFixed(1); }
  return d + "Z";
}

/* Alice, drawn like the book's engravings: ink outlines with a hand-drawn wobble, fine strand and fold lines,
   cross-hatched shadows (light from the left) and flat watercolor fills. The canvas is 200 wide; she is about 400 tall. */
function aliceSVG(look, view) {
  look = cleanLook(look);
  const uid = "al" + (++svgUid);
  const hc = itemOf("hairColor", look.hairColor), skin = itemOf("skin", look.skin).c, dc = itemOf("dressColor", look.dressColor).c;
  const style = look.hairStyle, outfit = look.outfit, extra = look.extra;
  const INK = "#2e2016", W = "#fffdf4", GOLD = "#e0ab35", RED = "#c0392f", PINK = "#f2a0b0";
  let defs = `<pattern id="${uid}h" width="3.6" height="3.6" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><line x1="0" y1="0" x2="0" y2="3.6" stroke="${INK}" stroke-width=".8"/></pattern>`
    + `<pattern id="${uid}x" width="3.6" height="3.6" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><path d="M0 0V3.6M0 0H3.6" stroke="${INK}" stroke-width=".8" fill="none"/></pattern>`
    + `<filter id="${uid}w" x="-6%" y="-6%" width="112%" height="112%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.4"/></filter>`;
  let H = hc.c;
  if (hc.rainbow) {
    defs += `<linearGradient id="${uid}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f26b84"/><stop offset=".22" stop-color="#f5ab4a"/><stop offset=".42" stop-color="#f3da63"/><stop offset=".62" stop-color="#7fcf8a"/><stop offset=".8" stop-color="#6cb2ee"/><stop offset="1" stop-color="#b08ae6"/></linearGradient>`;
    H = `url(#${uid}r)`;
  }
  const C = dc, D = shade(dc, -.3), L = shade(dc, .42);
  const P = [];
  const MIR = t => t + `<g transform="translate(200 0) scale(-1 1)">${t}</g>`;
  const S = (d, fill, o = {}) => { const t = `<path d="${d}" fill="${fill}"${o.sw === 0 ? ' stroke="none"' : o.sw ? ` stroke-width="${o.sw}"` : ""}${o.op ? ` opacity="${o.op}"` : ""}/>`; P.push(o.m ? MIR(t) : t); };
  const Ln = (d, o = {}) => S(d, "none", Object.assign({ sw: .9, op: .8 }, o));                       // fine ink line: folds, strands
  const Ht = (d, o = {}) => { const t = `<path d="${d}" fill="url(#${uid}${o.x ? "x" : "h"})" stroke="none" opacity="${o.op || .5}"/>`; P.push(o.m ? MIR(t) : t); };   // hatched shadow
  const Ci = (x, y, r, fill, o = {}) => { const t = `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"${o.sw === 0 ? ' stroke="none"' : o.sw ? ` stroke-width="${o.sw}"` : ""}${o.op ? ` opacity="${o.op}"` : ""}/>`; P.push(o.m ? MIR(t) : t); };

  Ht("M52 393 Q100 384 156 393 Q100 404 52 393Z", { op: .45 });                                         // shadow on the ground

  // the head (and everything on it) is drawn a little larger than life, as in the book
  const headOpen = () => P.push(`<g transform="translate(100 118) scale(1.17) translate(-100 -118)">`);
  // ---------------- hair behind the head ----------------
  headOpen();
  const cap = () => S("M66 80 Q60 36 100 36 Q140 36 134 80 Q138 100 128 112 L72 112 Q62 100 66 80Z", H);
  if (style === "long") {
    S("M68 62 Q50 104 50 156 Q46 196 56 216 Q66 222 74 210 L84 120 L116 120 L126 210 Q134 222 144 216 Q154 196 150 156 Q150 104 132 62Z", H);
    Ln("M62 100 Q54 150 58 208 M70 110 Q64 160 68 212 M138 100 Q146 150 142 208 M130 110 Q136 160 132 212 M56 130 Q52 170 54 200 M144 130 Q148 170 146 200");
    Ht("M132 80 Q148 120 149 170 Q150 200 144 214 Q136 200 138 150 Q138 110 128 84Z");
  } else if (style === "wavy") {
    S("M68 62 Q46 84 54 108 Q40 126 50 150 Q38 170 48 194 Q40 214 56 232 Q70 236 78 220 L86 120 L114 120 L122 220 Q130 236 144 232 Q160 214 152 194 Q162 170 150 150 Q160 126 146 108 Q154 84 132 62Z", H);
    Ln("M62 96 Q52 116 60 138 Q50 160 60 184 Q54 206 64 224 M72 112 Q64 136 72 160 Q64 184 72 214 M138 96 Q148 116 140 138 Q150 160 140 184 Q146 206 136 224 M128 112 Q136 136 128 160 Q136 184 128 214");
    Ht("M134 84 Q150 100 144 124 Q156 150 146 176 Q154 200 144 226 Q134 214 138 180 Q132 150 138 120 Q134 100 130 86Z");
  } else if (style === "bob") {
    S("M66 64 Q54 96 60 126 Q70 136 84 130 L116 130 Q130 136 140 126 Q146 96 134 64Z", H);
    Ln("M64 92 Q60 112 66 128 M72 100 Q70 116 76 130 M136 92 Q140 112 134 128 M128 100 Q130 116 124 130"); Ht("M134 76 Q144 100 138 126 Q130 130 126 124 Q134 104 130 80Z");
  } else if (style === "ponytail") {
    cap(); S("M128 56 Q164 64 162 124 Q164 180 148 212 Q138 216 136 204 Q146 160 142 122 Q142 92 122 80Z", H);
    Ln("M134 66 Q154 84 152 126 Q154 170 144 206 M130 76 Q148 96 146 130 Q148 168 140 200"); Ht("M148 80 Q164 110 161 150 Q160 190 148 210 Q146 180 152 140 Q152 104 142 82Z");
    S("M124 58 Q134 50 138 62 Q134 70 126 68Z", RED);
  } else if (style === "bun") {
    Ci(100, 27, 19, H); Ln("M86 27 Q100 13 114 27 Q100 41 90 29 Q100 21 108 29"); Ht("M108 13 Q122 25 112 43 Q118 29 108 13Z"); cap();
  } else if (style === "spacebuns") {
    Ci(66, 34, 16, H, { m: 1 }); Ln("M56 34 Q66 22 76 34 Q66 44 60 36", { m: 1 }); Ht("M138 22 Q150 34 140 48 Q144 36 138 22Z"); cap();
  } else if (style === "curly") {
    for (let a = 150; a <= 390; a += 20) { const r = a * Math.PI / 180; Ci((100 + 40 * Math.cos(r)).toFixed(1), (72 + 42 * Math.sin(r)).toFixed(1), 15, H); }
    [[58, 112], [142, 112], [56, 136], [144, 136], [62, 158], [138, 158], [74, 124], [126, 124]].forEach(([x, y]) => Ci(x, y, 14, H));
    Ln("M52 60 q6 -8 12 0 M136 60 q6 -8 12 0 M50 110 q6 -8 12 0 M138 110 q6 -8 12 0 M56 150 q6 -8 12 0 M132 150 q6 -8 12 0 M74 30 q6 -8 12 0 M114 30 q6 -8 12 0");
    Ht("M140 50 Q160 80 154 120 Q158 150 142 168 Q148 130 144 100 Q146 70 136 52Z");
  } else cap();   // pigtails, braids: the bunches are drawn in front, later

  P.push("</g>");
  // ---------------- legs, stockings, shoes ----------------
  const legTop = { party: 236, overalls: 352, gown: 999 }[outfit] || 284;
  if (legTop < 372) {
    S(`M83 ${legTop} L82 374 L96 374 L97 ${legTop}Z`, W, { m: 1 });
    let st = ""; for (let y = Math.max(legTop + 8, 296); y < 372; y += 9) st += `M82.6 ${y} Q89 ${y + 2} 96.2 ${y} `;
    if (st) S(st, "none", { sw: 2.2, m: 1, op: .85 }); P[P.length - 1] = P[P.length - 1].replace(/fill="none"/g, `fill="none" stroke="${shade(C, -.1)}"`);
    Ht(`M110 ${legTop} L117 ${legTop} L118 372 L112 372Z`, { op: .35 });
  }
  if (outfit !== "gown") { S("M80 372 Q74 390 88 391 L99 391 Q100 380 97 372Z", "#33241a", { m: 1 }); Ln("M82 378 Q89 374 97 378", { m: 1, op: 1 }); Ci(89, 377, 1.2, GOLD, { m: 1, sw: .5 }); }

  // ---------------- outfits ----------------
  const bodice = f => { S("M72 126 Q100 136 128 126 L124 178 Q100 184 76 178Z", f); Ht("M118 132 L127 128 L124 176 L114 179Z"); };
  const skirt = (f, hem = 292) => {
    const k = (hem - 176) / 116, y = v => (176 + (v - 176) * k).toFixed(1);
    S(`M76 176 Q100 182 124 176 Q152 ${y(222)} 170 ${y(284)} Q134 ${y(300)} 100 ${y(300)} Q66 ${y(300)} 30 ${y(284)} Q48 ${y(222)} 76 176Z`, f);
    Ln(`M88 184 Q80 ${y(240)} 70 ${y(296)} M100 184 Q101 ${y(240)} 100 ${y(299)} M112 184 Q122 ${y(240)} 132 ${y(296)} M64 ${y(218)} Q54 ${y(256)} 46 ${y(290)} M138 ${y(218)} Q148 ${y(256)} 156 ${y(290)}`);
    Ln(`M38 ${y(272)} Q100 ${y(288)} 162 ${y(272)} M41 ${y(264)} Q100 ${y(280)} 159 ${y(264)}`, { op: .55 });
    Ht(`M124 178 Q152 ${y(222)} 169 ${y(283)} Q150 ${y(292)} 134 ${y(296)} Q134 ${y(240)} 116 182Z`);
    Ht(`M34 ${y(282)} Q46 ${y(250)} 58 ${y(226)} Q52 ${y(262)} 48 ${y(291)}Z`, { op: .3 });
  };
  const sleeves = f => { S("M72 126 Q52 121 49 140 Q51 157 70 154 Q77 140 72 126Z", f, { m: 1 }); Ln("M54 132 Q60 142 58 153 M62 128 Q67 140 65 154", { m: 1 }); Ln("M53 150 Q61 157 70 153", { m: 1, op: 1 }); Ht("M138 128 Q151 136 149 150 Q141 155 133 153 Q142 142 138 128Z"); };
  const arms = () => { S("M57 150 Q47 186 45 212 Q41 226 50 230 Q59 228 57 213 Q61 186 68 153Z", skin, { m: 1 }); Ln("M47 221 q2 5 6 5 M51 219 q1 4 4 5", { m: 1 }); Ht("M146 160 Q153 190 155 214 Q152 190 144 168Z", { op: .4 }); };
  const collar = () => S("M86 124 Q100 136 114 124 Q108 119 100 127 Q92 119 86 124Z", W);
  let sleeveFill = C, sleeveLate = true;
  switch (outfit) {
    case "pinafore":
      skirt(C); bodice(C);
      S("M80 176 Q100 181 120 176 Q136 230 142 274 Q100 288 58 274 Q64 230 80 176Z", W);                 // apron
      Ln("M90 184 Q86 230 78 280 M110 184 Q114 230 122 280 M100 182 L100 284"); Ln("M62 264 Q100 277 138 264", { op: .9 });
      S("M79 222 q8 9 16 0 M105 222 q8 9 16 0", "none", { sw: 1.3 }); Ht("M120 178 Q136 230 141 273 Q132 277 124 279 Q122 230 112 182Z", { op: .35 });
      S("M84 132 L116 132 L119 177 L81 177Z", W); Ln("M92 136 L91 174 M108 136 L109 174", { op: .5 });      // bib
      S("M78 170 Q100 177 122 170 L123 180 Q100 187 77 180Z", W);                                            // sash
      break;
    case "dots":
      skirt(C); bodice(C); [[52, 262], [76, 240], [70, 278], [96, 262], [100, 222], [122, 246], [128, 280], [148, 262], [86, 204], [114, 204], [100, 288], [44, 280], [156, 280], [96, 150], [108, 164]].forEach(([x, y]) => Ci(x, y, 4.2, W, { sw: .7 }));
      S("M78 170 Q100 177 122 170 L123 180 Q100 187 77 180Z", W); S("M100 176 Q88 164 84 176 Q88 188 100 180 Q112 188 116 176 Q112 164 100 176Z", W); Ci(100, 178, 3, W);
      break;
    case "stars":
      skirt(D); bodice(D); [[56, 264, 6], [78, 236, 5], [72, 282, 4], [98, 258, 7], [100, 214, 5], [124, 240, 6], [130, 282, 5], [150, 266, 5], [88, 200, 4], [116, 198, 4], [96, 150, 4], [110, 166, 3.4], [42, 282, 3.4]].forEach(([x, y, r]) => S(starPath(x, y, r), GOLD, { sw: .7 }));
      S("M78 170 Q100 177 122 170 L123 180 Q100 187 77 180Z", GOLD); S("M100 158 a7 7 0 1 0 6 10 a6 6 0 1 1 -6 -10Z", GOLD, { sw: .7 });
      sleeveFill = D; break;
    case "hearts":
      skirt(C); bodice(C); S("M88 180 L112 180 L126 297 Q100 302 74 297Z", W); Ln("M100 184 L100 298", { op: .4 });
      [[100, 200, 5], [94, 226, 5], [106, 248, 5.5], [92, 272, 6], [110, 284, 5]].forEach(([x, y, r]) => S(heartPath(x, y, r), RED, { sw: .7 }));
      S("M34 276 Q100 294 166 276 L169 285 Q100 303 31 285Z", GOLD); S("M90 132 L110 132 L112 176 L88 176Z", W); S(heartPath(100, 152, 6), RED, { sw: .7 });
      S("M78 170 Q100 177 122 170 L123 180 Q100 187 77 180Z", GOLD);
      break;
    case "sailor":
      skirt(C); bodice(C); S("M36 268 Q100 285 164 268 L166 274 Q100 291 34 274Z", W, { sw: .7 }); S("M39 256 Q100 273 161 256 L163 262 Q100 279 37 262Z", W, { sw: .7 });
      S("M72 126 Q86 150 100 168 Q114 150 128 126 Q114 134 100 134 Q86 134 72 126Z", W); Ln("M78 132 Q90 152 100 162 Q110 152 122 132", { op: .9 });
      S("M100 166 L90 196 L100 190 L110 196Z", RED); Ci(100, 168, 4, RED);
      break;
    case "party":
      S("M34 236 Q22 210 58 194 Q100 180 142 194 Q178 210 166 236 Q132 254 100 254 Q68 254 34 236Z", L);
      Ln("M100 184 L100 252 M86 186 Q76 220 62 246 M114 186 Q124 220 138 246 M74 190 Q56 214 40 236 M126 190 Q144 214 160 236");
      S("M50 222 Q42 202 70 190 Q100 180 130 190 Q158 202 150 222 Q100 240 50 222Z", C); Ln("M100 184 L100 232 M88 186 Q80 208 70 228 M112 186 Q120 208 130 228");
      Ht("M130 190 Q158 202 150 222 Q138 228 126 230 Q138 210 124 190Z"); Ht("M150 226 Q168 220 164 238 Q150 246 138 250Z", { op: .35 });
      bodice(C); [[60, 236], [84, 244], [116, 244], [140, 236], [100, 247]].forEach(([x, y]) => S(starPath(x, y, 3), W, { sw: .5 }));
      S("M78 172 Q100 178 122 172 L123 180 Q100 186 77 180Z", D);
      break;
    case "overalls":
      bodice(W); S("M74 176 L126 176 L124 362 L103 362 L100 236 L97 362 L76 362Z", C);
      Ln("M86 190 L84 356 M114 190 L116 356 M100 184 L100 236"); Ht("M112 180 L126 178 L124 360 L112 360Z"); Ln("M77 352 L97 352 M103 352 L123 352", { op: 1 });
      S("M84 140 L116 140 L118 182 L82 182Z", C); S("M86 142 L78 126 L84 124 L92 142Z", C, { m: 1 }); Ci(87, 146, 2.4, GOLD, { m: 1, sw: .6 });
      S("M92 154 L108 154 L107 168 L93 168Z", D, { sw: .8 });
      sleeveFill = W; break;
    case "cards":
      skirt(C, 300); bodice(C); sleeveLate = false; sleeves(C); arms();
      S("M66 130 L134 130 L142 286 L58 286Z", W); Ln("M71 136 L129 136 L136 280 L64 280Z", { op: .5 });
      S(heartPath(100, 204, 20), RED, { sw: .9 }); S(heartPath(76, 150, 6), RED, { sw: .6 }); S(heartPath(124, 266, 6), RED, { sw: .6 });
      Ht("M126 132 L134 130 L142 286 L130 286Z", { op: .3 });
      break;
    case "waistcoat":
      skirt(D, 286); bodice(W);
      S("M70 126 L90 126 L100 152 L110 126 L130 126 L137 212 L106 224 L100 212 L94 224 L63 212Z", C);
      Ht("M70 126 L90 126 L100 152 L110 126 L130 126 L137 212 L106 224 L100 212 L94 224 L63 212Z", { x: 1, op: .32 });
      Ln("M90 126 L84 150 L96 170 M110 126 L116 150 L104 170", { op: 1 }); Ci(100, 180, 2, GOLD, { sw: .6 }); Ci(100, 194, 2, GOLD, { sw: .6 });
      Ci(120, 196, 7, GOLD, { sw: 1 }); Ci(120, 196, 4.4, W, { sw: .6 }); Ln("M120 196 L120 193 M120 196 L122 197", { op: 1 }); Ln("M113 194 Q104 186 100 190", { sw: 1.2, op: 1 });
      S("M100 130 L88 124 L88 138Z", RED, { m: 1 }); Ci(100, 131, 3, RED);
      break;
    case "gown":
      S("M76 176 Q100 182 124 176 Q174 252 190 384 Q100 402 10 384 Q26 252 76 176Z", C);
      Ln("M90 186 Q70 280 56 390 M100 186 L100 396 M110 186 Q130 280 144 390 M70 210 Q40 300 28 384 M130 210 Q160 300 172 384");
      S("M76 178 Q58 250 34 306 Q68 282 100 306 Q132 282 166 306 Q142 250 124 178 Q100 184 76 178Z", L); Ln("M88 186 Q78 240 60 290 M112 186 Q122 240 140 290 M100 186 L100 300");
      Ht("M124 178 Q142 250 166 306 Q150 296 140 290 Q130 240 116 184Z"); Ht("M150 310 Q176 340 188 383 Q168 390 150 393 Q160 350 150 310Z");
      S("M12 374 Q22 366 32 378 Q42 368 54 381 Q66 371 78 384 Q90 374 100 386 Q110 374 122 384 Q134 371 146 381 Q158 368 168 378 Q178 366 188 374 L190 386 Q100 404 10 386Z", W);
      bodice(D); Ln("M92 140 L108 150 M92 150 L108 140 M92 156 L108 166 M92 166 L108 156", { op: 1 });
      [[48, 330], [76, 350], [124, 350], [152, 330], [100, 336], [62, 368], [138, 368]].forEach(([x, y]) => S(starPath(x, y, 3.2), GOLD, { sw: .5 }));
      S("M78 172 Q100 178 122 172 L123 180 Q100 186 77 180Z", GOLD);
      break;
  }
  if (sleeveLate) { arms(); sleeves(sleeveFill); }
  if (outfit === "pinafore") { S("M84 132 Q66 118 62 136 Q64 146 80 152 Q76 142 84 132Z", W, { m: 1 }); Ln("M68 130 Q70 140 78 146", { m: 1 }); }   // shoulder frills
  if (outfit !== "sailor" && outfit !== "waistcoat" && outfit !== "gown") collar();
  if (outfit === "hearts") { S("M74 126 Q60 96 80 100 Q84 112 88 126Z", W, { m: 1 }); Ln("M72 108 L82 122 M77 102 L85 120", { m: 1 }); }             // the Queen's standing collar

  // ---------------- neck, head, face ----------------
  S("M92 104 L92 124 Q100 130 108 124 L108 104Z", skin); Ht("M96 112 L108 108 L108 122 Q104 126 100 126Z", { op: .45 });
  headOpen();
  S("M70 74 Q69 100 86 111 Q100 119 114 111 Q131 100 130 74 Q130 46 100 46 Q70 46 70 74Z", skin);
  Ht("M124 66 Q131 86 120 104 Q112 112 106 114 Q122 100 122 78Z", { op: .32 });
  Ci(80, 94, 6.5, PINK, { sw: 0, op: .5 }); Ci(120, 94, 6.5, PINK, { sw: 0, op: .5 });
  if (extra !== "glasses") {
    S("M81 81 Q88 74.5 95 81 Q88 84.5 81 81Z", W, { m: 1, sw: .8 }); Ci(88.4, 80, 2.9, "#4a6a8a", { m: 1, sw: .6 }); Ci(88.4, 80, 1.3, INK, { m: 1, sw: 0 }); Ci(89.3, 79, .7, "#fff", { m: 1, sw: 0 });
    S("M80.5 81 Q88 73.6 95.5 81", "none", { m: 1, sw: 1.5 }); Ln("M80.5 80.6 L78.8 79.4", { m: 1, op: 1 });
  }
  Ln("M80 71 Q87 67 95 70.5", { m: 1, sw: 1, op: .7 });
  Ln("M99 84 Q96.5 94 99.5 96.5 Q102 97.2 103.5 95.6", { op: .8 });
  S("M93 102 Q100 105 107 102 Q100 110.5 93 102Z", "#d0675e", { sw: .9 });

  // ---------------- hair in front ----------------
  if (style === "curly") { [[76, 50], [90, 42], [110, 42], [124, 50], [68, 64], [132, 64]].forEach(([x, y]) => Ci(x, y, 11, H)); Ln("M72 48 q5 -7 10 0 M94 38 q5 -7 10 0 M118 46 q5 -7 10 0"); }
  else if (style === "bob") { S("M68 86 Q62 36 100 36 Q138 36 132 86 Q130 66 118 58 Q104 66 86 62 Q72 66 68 86Z", H); Ln("M76 62 Q84 46 98 42 M124 62 Q118 48 106 42 M90 60 Q96 50 104 46"); }
  else { S("M69 84 Q62 36 100 36 Q138 36 131 84 Q128 62 113 55 Q104 51 100 58 Q96 51 87 55 Q72 62 69 84Z", H); Ln("M100 57 Q99 46 100 37 M92 54 Q84 46 78 50 M108 54 Q116 46 122 50 M84 57 Q74 56 70 68 M116 57 Q126 56 130 68 M96 52 Q90 42 84 40 M104 52 Q110 42 116 40"); Ht("M120 42 Q134 56 131 82 Q128 64 116 54Z", { op: .4 }); }
  if (style === "pigtails") {
    S("M68 84 Q38 86 34 128 Q34 162 52 176 Q64 160 64 126 Q66 100 72 90Z", H, { m: 1 }); Ln("M60 92 Q44 110 44 140 Q44 158 52 168 M64 98 Q54 116 54 142 Q54 156 58 164", { m: 1 });
    Ht("M160 100 Q168 130 160 160 Q154 170 148 176 Q158 150 156 120Z"); S("M64 82 Q54 74 52 86 Q56 94 66 92Z", RED, { m: 1 });
  }
  if (style === "braids") {
    for (let k = 0; k < 11; k++) { const y = 94 + k * 10.5, x = 62 - k * .5 + (k % 2 ? 2.5 : -2.5); S(`M${x - 9} ${y - 2} Q${x} ${y - 10} ${x + 9} ${y - 2} Q${x + 4} ${y + 12} ${x} ${y + 9} Q${x - 4} ${y + 12} ${x - 9} ${y - 2}Z`, H, { m: 1 }); }
    S("M50 212 Q57 204 64 212 Q62 232 57 238 Q52 232 50 212Z", H, { m: 1 }); S("M48 206 L66 206 L64 214 L50 214Z", RED, { m: 1 }); Ht("M142 100 Q150 150 146 200 Q140 150 138 104Z", { op: .4 });
  }

  // ---------------- extras ----------------
  switch (extra) {
    case "band": S("M69 70 Q100 30 131 70 L130 78 Q100 40 70 78Z", "#33241a"); Ln("M74 68 Q100 38 126 68", { op: .5 }); P[P.length - 1] = P[P.length - 1].replace('fill="none"', 'fill="none" stroke="#fff"'); break;
    case "clips": S(heartPath(76, 60, 6), RED, { m: 1, sw: .9 }); break;
    case "bow": S("M100 38 Q76 12 62 28 Q62 48 100 44Z", RED, { m: 1 }); Ln("M94 38 Q80 26 68 30", { m: 1 }); S("M96 42 L86 62 L96 56Z", RED, { m: 1 }); S("M93 34 Q100 30 107 34 Q109 42 100 46 Q91 42 93 34Z", RED); Ht("M106 34 Q124 20 136 30 Q130 40 112 42Z", { op: .4 }); break;
    case "flowers":
      S("M70 70 Q100 34 130 70", "none", { sw: 2.2 });
      [[72, 66, PINK], [82, 52, W], [94, 43, "#f3cf5a"], [106, 43, PINK], [118, 52, W], [128, 66, "#f3cf5a"]].forEach(([x, y, c]) => { for (let a = 0; a < 5; a++) { const r = a * 1.2566; Ci((x + 4.6 * Math.cos(r)).toFixed(1), (y + 4.6 * Math.sin(r)).toFixed(1), 3.6, c, { sw: .6 }); } Ci(x, y, 2.4, "#e39a2a", { sw: .6 }); });
      S("M88 46 q-6 -8 2 -10 q4 6 -2 10Z M112 46 q6 -8 -2 -10 q-4 6 2 10Z", "#7aa35a", { sw: .7 }); break;
    case "catears": S("M72 58 L66 14 L98 40Z", "#8a6bb0", { m: 1 }); S("M76 50 L72 26 L90 41Z", PINK, { m: 1, sw: .7 }); Ht("M128 58 L134 14 L124 30Z", { op: .45 }); S("M69 70 Q100 32 131 70 L130 77 Q100 40 70 77Z", "#8a6bb0"); break;
    case "bunny": S("M88 46 Q68 -6 80 -20 Q98 -14 98 44Z", W, { m: 1 }); S("M90 38 Q78 2 83 -8 Q92 -4 93 38Z", PINK, { m: 1, sw: .6 }); Ht("M112 46 Q130 4 122 -16 Q116 -6 116 40Z", { op: .35 }); S("M69 70 Q100 32 131 70 L130 77 Q100 40 70 77Z", W); break;
    case "glasses": S(heartPath(88, 80, 9.5), "#f4a9b8", { m: 1, sw: 1.6 }); Ln("M80 76 q3 -3 6 -2", { m: 1, op: .9 }); Ln("M96 78 Q100 75 104 78", { sw: 1.5, op: 1 }); Ln("M77 78 L70 76", { m: 1, sw: 1.3, op: 1 }); break;
    case "tiara": S("M74 54 L80 34 L90 46 L100 20 L110 46 L120 34 L126 54 Q100 42 74 54Z", GOLD); Ci(100, 36, 4, RED, { sw: .8 }); Ci(84, 44, 2.4, "#6fa3d6", { m: 1, sw: .6 }); Ci(100, 20, 2.4, W, { sw: .6 }); Ht("M110 46 L120 34 L126 54 Q118 50 110 48Z", { op: .4 }); break;
    case "tophat":
      P.push(`<g transform="rotate(8 100 40)">`);
      S("M56 44 Q100 30 144 44 Q148 52 100 56 Q52 52 56 44Z", "#4a4f5c"); S("M72 44 L64 -10 Q100 -22 136 -10 L128 44 Q100 52 72 44Z", "#4a4f5c");
      Ht("M110 -15 Q124 -14 136 -10 L128 44 Q118 47 108 48Z", { x: 1, op: .5 }); S("M70.5 30 Q100 38 129.5 30 L128 44 Q100 52 72 44Z", C);
      S("M104 4 L126 2 L125 22 L105 24Z", W, { sw: .8 }); P.push(`<text x="115" y="17" font-size="9" text-anchor="middle" fill="${INK}" stroke="none" font-family="Georgia,serif">10/6</text>`);
      P.push(`</g>`); break;
    case "crown": S("M70 54 L64 12 L84 32 L100 2 L116 32 L136 12 L130 54 Q100 44 70 54Z", GOLD); S("M70 54 Q100 44 130 54 L130 44 Q100 34 70 44Z", "#c98d22"); Ci(100, 24, 4.4, RED, { sw: .8 }); Ci(84, 46, 2.6, "#6fa3d6", { sw: .6 }); Ci(116, 46, 2.6, "#7aa35a", { sw: .6 }); Ci(100, 43, 2.6, RED, { sw: .6 }); Ci(64, 12, 3, W, { m: 1, sw: .7 }); Ci(100, 2, 3, W, { sw: .7 }); Ht("M116 32 L136 12 L130 44 Q122 40 114 38Z", { op: .4 }); break;
  }
  P.push("</g>");
  return `<svg viewBox="${VIEWS[view || "body"]}" xmlns="http://www.w3.org/2000/svg"><defs>${defs}</defs><g filter="url(#${uid}w)" stroke="${INK}" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round">${P.join("")}</g></svg>`;
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
