/* ============================================
   AELADAILY — Product Data
   Atelier Wabi Theme v2
   ============================================ */

const PRODUCTS = {
    bestsellers: [
        {
            id: "p001",
            name: "Cotton Linen Tablecloth with Tassels",
            price: "€23.10",
            rating: "★★★★★",
            reviewCount: 47,
            tag: "Bestseller",
            tagClass: "",
            desc: "Woven from 100% natural cotton linen, this tablecloth brings soft, organic texture to your table. Hand-knotted tassels add artisanal charm. Gets softer with every wash.",
            svg: `<svg viewBox="0 0 300 375" width="100%" height="100%"><rect width="300" height="375" fill="#F5F1EA"/><rect x="30" y="55" width="240" height="240" rx="3" fill="#E8E0D5"/><line x1="30" y1="68" x2="270" y2="68" stroke="#C4B59A" stroke-width="0.8"/><line x1="30" y1="282" x2="270" y2="282" stroke="#C4B59A" stroke-width="0.8"/><circle cx="150" cy="175" r="32" fill="none" stroke="#8B7355" stroke-width="1"/><circle cx="150" cy="175" r="20" fill="#D4C5A9" opacity="0.4"/><circle cx="150" cy="175" r="10" fill="#8B7355" opacity="0.15"/><path d="M30 295 L34 308 M50 295 L54 308 M70 295 L74 308 M90 295 L94 308 M110 295 L114 308 M130 295 L134 308 M150 295 L154 308 M170 295 L174 308 M190 295 L194 308 M210 295 L214 308 M230 295 L234 308 M250 295 L254 308 M270 295 L274 308" stroke="#8B7355" stroke-width="0.8"/></svg>`
        },
        {
            id: "p002",
            name: "Hand-Woven Rope Storage Basket",
            price: "€34.60",
            rating: "★★★★★",
            reviewCount: 89,
            tag: "Bestseller",
            tagClass: "",
            desc: "Hand-woven from natural cotton rope, this basket is perfect for storing throws, magazines, or toys. Sturdy yet soft, it develops a unique patina with use.",
            svg: `<svg viewBox="0 0 300 375" width="100%" height="100%"><rect width="300" height="375" fill="#E8E0D5"/><ellipse cx="150" cy="130" rx="95" ry="26" fill="#C4B59A" opacity="0.4"/><path d="M55 130 Q55 285 150 295 Q245 285 245 130" fill="none" stroke="#8B7355" stroke-width="2.5"/><path d="M62 148 Q62 275 150 285 Q238 275 238 148" fill="none" stroke="#8B7355" stroke-width="1.8"/><path d="M58 168 Q58 265 150 275 Q242 265 242 168" fill="none" stroke="#8B7355" stroke-width="1.2"/><line x1="68" y1="188" x2="232" y2="188" stroke="#8B7355" stroke-width="0.8" opacity="0.4"/><line x1="65" y1="208" x2="235" y2="208" stroke="#8B7355" stroke-width="0.8" opacity="0.4"/><line x1="62" y1="228" x2="238" y2="228" stroke="#8B7355" stroke-width="0.8" opacity="0.4"/><line x1="60" y1="248" x2="240" y2="248" stroke="#8B7355" stroke-width="0.8" opacity="0.4"/><line x1="58" y1="268" x2="242" y2="268" stroke="#8B7355" stroke-width="0.8" opacity="0.4"/></svg>`
        },
        {
            id: "p003",
            name: "Natural Sisal Pot Brush",
            price: "€10.40",
            rating: "★★★★★",
            reviewCount: 312,
            tag: "Top Rated",
            tagClass: "",
            desc: "Made from natural sisal fibers and solid wood, this pot brush is tough on grime but gentle on your cookware. 100% biodegradable and plastic-free.",
            svg: `<svg viewBox="0 0 300 375" width="100%" height="100%"><rect width="300" height="375" fill="#F5F1EA"/><rect x="118" y="70" width="64" height="105" rx="8" fill="#8B7355" opacity="0.55"/><rect x="124" y="76" width="52" height="93" rx="5" fill="#8B7355" opacity="0.35"/><line x1="124" y1="90" x2="176" y2="90" stroke="#6B5A45" stroke-width="0.6" opacity="0.5"/><line x1="124" y1="120" x2="176" y2="120" stroke="#6B5A45" stroke-width="0.6" opacity="0.5"/><line x1="124" y1="150" x2="176" y2="150" stroke="#6B5A45" stroke-width="0.6" opacity="0.5"/><ellipse cx="150" cy="190" rx="75" ry="22" fill="#D4C5A9"/><g stroke="#8B7355" stroke-width="1.2"><line x1="95" y1="196" x2="95" y2="240"/><line x1="107" y1="199" x2="107" y2="245"/><line x1="119" y1="201" x2="119" y2="250"/><line x1="131" y1="203" x2="131" y2="255"/><line x1="143" y1="204" x2="143" y2="258"/><line x1="150" y1="205" x2="150" y2="260"/><line x1="157" y1="204" x2="157" y2="258"/><line x1="169" y1="203" x2="169" y2="255"/><line x1="181" y1="201" x2="181" y2="250"/><line x1="193" y1="199" x2="193" y2="245"/><line x1="205" y1="196" x2="205" y2="240"/></g></svg>`
        },
        {
            id: "p004",
            name: "Cotton Rope Plant Hanger",
            price: "€6.60",
            rating: "★★★★★",
            reviewCount: 156,
            tag: "Bestseller",
            tagClass: "",
            desc: "Hand-knotted from natural cotton rope, this plant hanger brings greenery into your space. Perfect for indoor herbs, trailing plants, or small pots.",
            svg: `<svg viewBox="0 0 300 375" width="100%" height="100%"><rect width="300" height="375" fill="#E8E0D5"/><circle cx="150" cy="50" r="10" fill="none" stroke="#8B7355" stroke-width="1.8"/><path d="M150 60 Q115 115 92 210 Q80 270 92 310" fill="none" stroke="#8B7355" stroke-width="1.8"/><path d="M150 60 Q185 115 208 210 Q220 270 208 310" fill="none" stroke="#8B7355" stroke-width="1.8"/><path d="M150 60 Q138 130 125 230 Q118 280 125 310" fill="none" stroke="#8B7355" stroke-width="1.3"/><path d="M150 60 Q162 130 175 230 Q182 280 175 310" fill="none" stroke="#8B7355" stroke-width="1.3"/><path d="M150 60 Q150 140 150 230 Q150 280 150 310" fill="none" stroke="#8B7355" stroke-width="1"/><ellipse cx="150" cy="260" rx="48" ry="18" fill="#D4C5A9" opacity="0.5"/><ellipse cx="150" cy="258" rx="36" ry="12" fill="#A8B5A0" opacity="0.25"/><circle cx="140" cy="255" r="3" fill="#A8B5A0" opacity="0.4"/><circle cx="160" cy="258" r="3" fill="#A8B5A0" opacity="0.4"/><circle cx="152" cy="252" r="2" fill="#A8B5A0" opacity="0.4"/></svg>`
        }
    ],
    newArrivals: [
        {
            id: "p005",
            name: "Wabi-Sabi Linen Cushion Cover",
            price: "€24.50",
            rating: "★★★★★",
            reviewCount: 23,
            tag: "New",
            tagClass: "tag-new",
            desc: "Minimalist linen cushion cover with a subtle organic texture. The perfect addition to your wabi-sabi living space. Hidden zipper closure.",
            svg: `<svg viewBox="0 0 300 375" width="100%" height="100%"><rect width="300" height="375" fill="#F5F1EA"/><rect x="45" y="75" width="210" height="210" rx="10" fill="#E8E0D5" stroke="#8B7355" stroke-width="1"/><rect x="55" y="85" width="190" height="190" rx="8" fill="none" stroke="#8B7355" stroke-width="0.5" opacity="0.4"/><line x1="45" y1="100" x2="255" y2="100" stroke="#C4B59A" stroke-width="0.5"/><line x1="45" y1="260" x2="255" y2="260" stroke="#C4B59A" stroke-width="0.5"/><circle cx="150" cy="180" r="28" fill="none" stroke="#8B7355" stroke-width="0.8" opacity="0.3"/><circle cx="150" cy="180" r="16" fill="#D4C5A9" opacity="0.2"/><path d="M142 176 Q150 168 158 176 Q150 184 142 176" fill="#D4C5A9" opacity="0.25"/></svg>`
        },
        {
            id: "p006",
            name: "Macrame Wall Hanging — Large",
            price: "€33.80",
            rating: "★★★★☆",
            reviewCount: 12,
            tag: "New",
            tagClass: "tag-new",
            desc: "Statement macrame wall hanging hand-knotted from natural cotton rope. Adds texture and warmth to any wall. 60×100cm.",
            svg: `<svg viewBox="0 0 300 375" width="100%" height="100%"><rect width="300" height="375" fill="#E8E0D5"/><rect x="75" y="40" width="150" height="14" rx="2" fill="#8B7355" opacity="0.35"/><g stroke="#8B7355" stroke-width="1" opacity="0.5"><path d="M85 54 L85 120 M98 54 L98 135 M111 54 L111 150 M124 54 L124 165 M137 54 L137 172 M150 54 L150 178 M163 54 L163 172 M176 54 L176 165 M189 54 L189 150 M202 54 L202 135 M215 54 L215 120"/></g><g stroke="#8B7355" stroke-width="0.8" fill="none" opacity="0.4"><path d="M85 120 Q95 145 85 170 Q95 195 85 220 Q95 245 85 270 Q95 295 85 320"/><path d="M215 120 Q205 145 215 170 Q205 195 215 220 Q205 245 215 270 Q205 295 215 320"/><path d="M111 150 Q121 180 111 210 Q121 240 111 270 Q121 300 111 330"/><path d="M189 150 Q179 180 189 210 Q179 240 189 270 Q179 300 189 330"/><path d="M137 172 Q147 205 137 238 Q147 271 137 304 Q147 337 137 350"/><path d="M163 172 Q153 205 163 238 Q153 271 163 304 Q153 337 163 350"/><path d="M150 178 Q162 215 150 252 Q162 289 150 326 Q162 350 150 360"/></g></svg>`
        },
        {
            id: "p007",
            name: "Soy Wax Candle — Gardenia",
            price: "€17.20",
            rating: "★★★★★",
            reviewCount: 8,
            tag: "New",
            tagClass: "tag-new",
            desc: "Hand-poured soy wax candle with natural gardenia essential oil. Clean-burning, long-lasting (35+ hours), and housed in a reusable glass jar.",
            svg: `<svg viewBox="0 0 300 375" width="100%" height="100%"><rect width="300" height="375" fill="#F5F1EA"/><rect x="95" y="130" width="110" height="165" rx="5" fill="#E8E0D5" stroke="#8B7355" stroke-width="1"/><rect x="102" y="137" width="96" height="151" rx="4" fill="#D4C5A9" opacity="0.25"/><rect x="108" y="118" width="84" height="12" rx="2" fill="#8B7355" opacity="0.45"/><line x1="150" y1="85" x2="150" y2="118" stroke="#3D3530" stroke-width="1.8"/><path d="M150 72 Q143 58 150 44 Q157 58 150 72" fill="#D4C5A9" opacity="0.6"/><path d="M142 64 Q136 52 138 40" stroke="#8B7355" stroke-width="0.8" fill="none" opacity="0.4"/><path d="M158 64 Q164 52 162 40" stroke="#8B7355" stroke-width="0.8" fill="none" opacity="0.4"/><circle cx="150" cy="215" r="28" fill="#D4C5A9" opacity="0.3"/><text x="150" y="220" text-anchor="middle" font-family="Cormorant Garamond" font-size="13" fill="#8B7355" opacity="0.45" font-style="italic">gardenia</text><text x="150" y="235" text-anchor="middle" font-family="Jost" font-size="7" fill="#8B7355" opacity="0.3" letter-spacing="2">SOY WAX</text></svg>`
        },
        {
            id: "p008",
            name: "Beeswax Food Wrap Set (3 pcs)",
            price: "€43.80",
            rating: "★★★★☆",
            reviewCount: 5,
            tag: "New",
            tagClass: "tag-new",
            desc: "Set of 3 reusable beeswax food wraps in different sizes. 100% natural: organic cotton, beeswax, jojoba oil, and tree resin. Replace cling film naturally.",
            svg: `<svg viewBox="0 0 300 375" width="100%" height="100%"><rect width="300" height="375" fill="#E8E0D5"/><rect x="35" y="90" width="105" height="105" rx="5" fill="#D4C5A9" opacity="0.55" stroke="#8B7355" stroke-width="0.8"/><rect x="165" y="70" width="85" height="85" rx="5" fill="#C4B59A" opacity="0.45" stroke="#8B7355" stroke-width="0.8"/><rect x="75" y="215" width="130" height="130" rx="5" fill="#D4C5A9" opacity="0.6" stroke="#8B7355" stroke-width="0.8"/><circle cx="87" cy="142" r="3" fill="#8B7355" opacity="0.2"/><circle cx="120" cy="155" r="2" fill="#8B7355" opacity="0.2"/><circle cx="200" cy="110" r="2.5" fill="#8B7355" opacity="0.2"/><circle cx="105" cy="280" r="3" fill="#8B7355" opacity="0.2"/><circle cx="170" cy="305" r="2" fill="#8B7355" opacity="0.2"/><text x="150" y="365" text-anchor="middle" font-family="Jost" font-size="9" fill="#8B7355" opacity="0.35" letter-spacing="2">100% NATURAL BEESWAX</text></svg>`
        }
    ]
};

// Full product catalog for collection page
const ALL_PRODUCTS = [
    ...PRODUCTS.bestsellers,
    ...PRODUCTS.newArrivals,
    {
        id: "p009",
        name: "Floral Cotton Linen Tablecloth",
        price: "€23.80",
        rating: "★★★★★",
        reviewCount: 60,
        tag: "",
        tagClass: "",
        category: "linen",
        svg: `<svg viewBox="0 0 300 375" width="100%" height="100%"><rect width="300" height="375" fill="#F5F1EA"/><rect x="30" y="55" width="240" height="240" rx="3" fill="#E8E0D5"/><circle cx="90" cy="120" r="8" fill="#A8B5A0" opacity="0.3"/><circle cx="210" cy="110" r="6" fill="#D4C5A9" opacity="0.4"/><circle cx="150" cy="175" r="10" fill="#A8B5A0" opacity="0.25"/><circle cx="80" cy="220" r="7" fill="#D4C5A9" opacity="0.35"/><circle cx="200" cy="230" r="8" fill="#A8B5A0" opacity="0.3"/><path d="M30 282 L34 295 M50 282 L54 295 M70 282 L74 295 M90 282 L94 295 M110 282 L114 295 M130 282 L134 295 M150 282 L154 295 M170 282 L174 295 M190 282 L194 295 M210 282 L214 295 M230 282 L234 295 M250 282 L254 295 M270 282 L274 295" stroke="#8B7355" stroke-width="0.6"/></svg>`
    },
    {
        id: "p010",
        name: "Wax Tablet — Osmanthus",
        price: "€5.10",
        rating: "★★★★★",
        reviewCount: 34,
        tag: "",
        tagClass: "",
        category: "aromatherapy",
        svg: `<svg viewBox="0 0 300 375" width="100%" height="100%"><rect width="300" height="375" fill="#E8E0D5"/><rect x="80" y="120" width="140" height="100" rx="60" fill="#D4C5A9" opacity="0.5" stroke="#8B7355" stroke-width="1"/><circle cx="120" cy="160" r="5" fill="#8B7355" opacity="0.2"/><circle cx="180" cy="170" r="4" fill="#8B7355" opacity="0.2"/><circle cx="150" cy="185" r="6" fill="#8B7355" opacity="0.15"/><line x1="150" y1="80" x2="150" y2="120" stroke="#8B7355" stroke-width="1.5" opacity="0.4"/><circle cx="150" cy="75" r="8" fill="none" stroke="#8B7355" stroke-width="1.5" opacity="0.4"/><text x="150" y="270" text-anchor="middle" font-family="Cormorant Garamond" font-size="14" fill="#8B7355" opacity="0.4" font-style="italic">osmanthus</text></svg>`
    }
];
