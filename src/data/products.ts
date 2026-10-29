export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  longDescription: string;
  sizes: string[];
  tags: string[];
  badge?: string;
  badgeColor?: "pumpkin" | "spectral" | "slime";
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  sku: string;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  count: number;
  gradient: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Scary & Horror",
    slug: "scary",
    image:
      "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=600&q=80",
    description: "Terror awaits in every stitch",
    count: 42,
    gradient: "from-red-900 to-void",
  },
  {
    id: "cat-2",
    name: "Vampire & Gothic",
    slug: "vampire-gothic",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    description: "Eternal darkness, timeless style",
    count: 35,
    gradient: "from-spectral to-void",
  },
  {
    id: "cat-3",
    name: "Witchcraft & Magic",
    slug: "witchcraft",
    image:
      "https://images.unsplash.com/photo-1508361727343-ca787442dcd7?w=600&q=80",
    description: "Cast your spell with style",
    count: 28,
    gradient: "from-purple-900 to-void",
  },
  {
    id: "cat-4",
    name: "Superhero",
    slug: "superhero",
    image:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&q=80",
    description: "Save the world in style",
    count: 31,
    gradient: "from-blue-900 to-void",
  },
  {
    id: "cat-5",
    name: "Couples",
    slug: "couples",
    image:
      "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=600&q=80",
    description: "Scare together, stay together",
    count: 18,
    gradient: "from-pumpkin/50 to-void",
  },
  {
    id: "cat-6",
    name: "Kids",
    slug: "kids",
    image:
      "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=600&q=80",
    description: "Little monsters, big adventures",
    count: 47,
    gradient: "from-slime/30 to-void",
  },
  {
    id: "cat-7",
    name: "Props & Decor",
    slug: "props",
    image:
      "https://images.unsplash.com/photo-1572552635104-e2e33c45e4fb?w=600&q=80",
    description: "Set the haunted scene",
    count: 22,
    gradient: "from-yellow-900 to-void",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-001",
    slug: "shadow-reaper-elite",
    name: "Shadow Reaper Elite",
    category: "scary",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviewCount: 342,
    images: [
      "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&q=80",
      "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800&q=80",
      "https://images.unsplash.com/photo-1572552635104-e2e33c45e4fb?w=800&q=80",
    ],
    description:
      "Command the night with this premium Death Reaper costume featuring hand-sewn detailing and dramatic flowing fabric.",
    longDescription:
      "The Shadow Reaper Elite is our flagship horror costume, crafted from premium blackout velvet with ghostly translucent overlay panels. The hood features reinforced wire framing for a dramatic silhouette. Includes authentic weathered scythe prop with LED accent lighting. Limited collector's edition.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["horror", "reaper", "scary", "grim"],
    badge: "HOT",
    badgeColor: "pumpkin",
    stock: 15,
    isTrending: true,
    isBestSeller: true,
    sku: "SR-ELITE-001",
    features: [
      "Premium blackout velvet construction",
      "Translucent ghostly overlay panels",
      "Wire-reinforced dramatic hood",
      "LED-lit scythe prop included",
      "Machine washable liner",
    ],
  },
  {
    id: "prod-002",
    slug: "crimson-countess-vampire",
    name: "Crimson Countess Vampire",
    category: "vampire-gothic",
    price: 74.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewCount: 218,
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
      "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&q=80",
    ],
    description:
      "Elegant Victorian vampire countess costume with dramatic cape, corset bodice, and flowing skirts.",
    longDescription:
      "Transform into the immortal Crimson Countess — a breathtaking vampire noblewoman from the 18th century. Features a structured brocade corset with crimson velvet panels, three-tiered organza skirts with black lace trim, and a dramatic split-back cathedral cape with crimson satin lining. Includes fang accessories and period-correct jewelry set.",
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["vampire", "gothic", "elegant", "victorian"],
    badge: "SALE",
    badgeColor: "spectral",
    stock: 23,
    isTrending: true,
    sku: "CC-VAMP-002",
    features: [
      "Structured brocade corset bodice",
      "Three-tiered organza skirts",
      "Cathedral-length vampire cape",
      "Fang accessories included",
      "Victorian jewelry set",
    ],
  },
  {
    id: "prod-003",
    slug: "hex-queen-sorceress",
    name: "Hex Queen Sorceress",
    category: "witchcraft",
    price: 64.99,
    rating: 4.7,
    reviewCount: 176,
    images: [
      "https://images.unsplash.com/photo-1508361727343-ca787442dcd7?w=800&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    ],
    description:
      "Become the most powerful witch of the coven with this spellbinding sorceress ensemble.",
    longDescription:
      "The Hex Queen Sorceress costume features a deeply structured velvet gown with constellation embroidery in silver thread. The cascading sleeves have moon-phase cutouts lined with metallic mesh. Includes artisanal hat with enchanted star detailing, braided belt with pouch, and spell-scroll accessories.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tags: ["witch", "sorceress", "magic", "fantasy"],
    badge: "NEW",
    badgeColor: "slime",
    stock: 31,
    isNew: true,
    sku: "HQ-SORC-003",
    features: [
      "Velvet gown with constellation embroidery",
      "Moon-phase sleeve cutouts",
      "Artisanal pointed hat",
      "Braided belt with accessory pouch",
      "Spell-scroll prop set",
    ],
  },
  {
    id: "prod-004",
    slug: "dark-knight-crusader",
    name: "Dark Knight Crusader",
    category: "superhero",
    price: 119.99,
    originalPrice: 159.99,
    rating: 4.9,
    reviewCount: 412,
    images: [
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&q=80",
      "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&q=80",
    ],
    description:
      "Dominate Halloween night with this ultra-realistic dark crusader suit featuring muscle-mapped foam armor.",
    longDescription:
      "The ultimate superhero Halloween experience. EVA foam muscle-mapped chest armor with hand-painted battle weathering. Includes helmet with LED eye lenses that glow red, articulated gauntlets, utility belt with prop gadgets, and floor-length scalloped cape in military-grade nylon.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["superhero", "knight", "dark", "armor"],
    badge: "BEST SELLER",
    badgeColor: "pumpkin",
    stock: 8,
    isBestSeller: true,
    isTrending: true,
    sku: "DK-CRUS-004",
    features: [
      "EVA foam muscle-mapped armor",
      "LED glowing eye helmet",
      "Articulated EVA gauntlets",
      "Utility belt with prop gadgets",
      "Military-grade nylon cape",
    ],
  },
  {
    id: "prod-005",
    slug: "haunted-bride-and-groom",
    name: "Haunted Bride & Groom Set",
    category: "couples",
    price: 139.99,
    originalPrice: 189.99,
    rating: 4.8,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=800&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    ],
    description:
      "A perfectly matched couple's set — undead bride and groom in complementary gothic formal wear.",
    longDescription:
      "The complete Haunted Bride & Groom couples costume set. The bride features a distressed ivory lace gown with vintage cathedral veil, gartered stockings, and faux-blood accessories. The groom suit includes a tailored charcoal morning coat with coffin-button detailing, matching top hat, and dried flower boutonniere. Both include professional-grade special effects makeup kit.",
    sizes: ["S/M", "L/XL"],
    tags: ["couples", "wedding", "undead", "gothic"],
    badge: "COUPLES",
    badgeColor: "spectral",
    stock: 12,
    isNew: true,
    sku: "HBG-COUPLE-005",
    features: [
      "2-piece complete couples set",
      "Distressed lace bridal gown",
      "Tailored morning coat for groom",
      "Professional SFX makeup kit",
      "Period-appropriate accessories",
    ],
  },
  {
    id: "prod-006",
    slug: "little-pumpkin-king",
    name: "Little Pumpkin King",
    category: "kids",
    price: 39.99,
    rating: 4.9,
    reviewCount: 567,
    images: [
      "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800&q=80",
      "https://images.unsplash.com/photo-1572552635104-e2e33c45e4fb?w=800&q=80",
    ],
    description:
      "Your little one will rule Halloween night as the adorable yet spooky Pumpkin King!",
    longDescription:
      "The Little Pumpkin King costume is made from soft, breathable materials safe for sensitive skin. Features a glowing pumpkin chest medallion (battery-operated LED), plush crown with genuine fur trim, and comfortable stretch pants with shoe covers. Available in toddler through teen sizes.",
    sizes: ["2T", "3T", "4T", "S (5-6)", "M (7-8)", "L (9-10)", "XL (11-12)"],
    tags: ["kids", "pumpkin", "cute", "friendly"],
    badge: "KIDS",
    badgeColor: "slime",
    stock: 45,
    isBestSeller: true,
    sku: "LPK-KIDS-006",
    features: [
      "Hypoallergenic soft fabric",
      "LED glowing pumpkin medallion",
      "Plush crown with fur trim",
      "Comfortable stretch pants",
      "Shoe cover attachments",
    ],
  },
  {
    id: "prod-007",
    slug: "animated-ghost-skull-prop",
    name: "Animated Skull Specter Prop",
    category: "props",
    price: 49.99,
    rating: 4.6,
    reviewCount: 134,
    images: [
      "https://images.unsplash.com/photo-1572552635104-e2e33c45e4fb?w=800&q=80",
      "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&q=80",
    ],
    description:
      "Motion-activated animated skull prop with eerie sound effects and red LED eyes for ultimate atmosphere.",
    longDescription:
      "Create the perfect haunted scene with the Animated Skull Specter. Motion-activated sensor triggers 8 bone-chilling sound effects and illuminates 3W red LED eyes. Hand-painted weathered resin skull sits atop a wrought-iron style display stand. Includes fog machine adapter port. Batteries or AC adapter (included).",
    sizes: ["One Size"],
    tags: ["prop", "decor", "skull", "animated"],
    badge: "SPOOKY",
    badgeColor: "slime",
    stock: 19,
    sku: "ASS-PROP-007",
    features: [
      "Motion-activated sensor",
      "8 bone-chilling sound effects",
      "3W red LED illuminated eyes",
      "Hand-painted resin construction",
      "AC adapter + batteries included",
    ],
  },
  {
    id: "prod-008",
    slug: "phantom-of-darkness",
    name: "Phantom of Darkness",
    category: "scary",
    price: 79.99,
    rating: 4.7,
    reviewCount: 203,
    images: [
      "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&q=80",
      "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800&q=80",
    ],
    description:
      "A mysterious masquerade phantom with half-mask, dramatic opera cape, and hidden compartment accessories.",
    longDescription:
      "Inspired by the iconic theatrical phantom, this costume features a precisely molded alabaster half-mask with hand-painted aging effects. The opera cape is constructed from silk-satin with dramatic scarlet lining. The formal jacket includes a hidden magnetic pocket system for vanishing trick accessories. Perfect for masquerade balls and Halloween events.",
    sizes: ["S", "M", "L", "XL"],
    tags: ["phantom", "masquerade", "opera", "mystery"],
    stock: 27,
    isNew: true,
    isTrending: true,
    sku: "POD-SCAR-008",
    features: [
      "Precision-molded alabaster half-mask",
      "Silk-satin opera cape with scarlet lining",
      "Hidden magnetic compartments",
      "Formal tailored jacket",
      "Vanishing trick accessory set",
    ],
  },
  {
    id: "prod-009",
    slug: "spectral-lord-vampire",
    name: "Spectral Lord Dracula",
    category: "vampire-gothic",
    price: 94.99,
    originalPrice: 124.99,
    rating: 4.8,
    reviewCount: 167,
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&q=80",
    ],
    description:
      "Command eternal fear as Count Dracula in this regal vampire lord costume with authentic period-correct detailing.",
    longDescription:
      "The most authentic Dracula portrayal available. Features a tailored black frock coat with purple silk vest and authentic period-correct cravat. The sculpted high-collar cape spans 8ft wing-to-wing. Includes white gloves, medallion clasp, vampire rings set, fangs, and theatrical face powder.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["dracula", "vampire", "count", "aristocrat"],
    badge: "SALE",
    badgeColor: "spectral",
    stock: 14,
    isTrending: true,
    sku: "SLD-VAMP-009",
    features: [
      "Tailored black frock coat",
      "Purple silk authentic cravat vest",
      "8-foot wing-span vampire cape",
      "Vampire ring and medallion set",
      "Theatrical makeup included",
    ],
  },
  {
    id: "prod-010",
    slug: "moon-witch-forest-spirit",
    name: "Moon Witch Forest Spirit",
    category: "witchcraft",
    price: 72.99,
    rating: 4.6,
    reviewCount: 145,
    images: [
      "https://images.unsplash.com/photo-1508361727343-ca787442dcd7?w=800&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    ],
    description:
      "A mystical forest witch with flowing tiered skirts, nature-inspired accessories, and bioluminescent accents.",
    longDescription:
      "Walk among the ancient trees as the Moon Witch Forest Spirit. This ethereal costume features six-tiered bohemian skirts in forest greens and midnight blacks. The bodice is adorned with hand-sewn leaf and crystal embellishments. Includes a root-wood staff with glowing crystal orb, flower crown with faux succulents, and botanical belt pouch.",
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["witch", "forest", "nature", "bohemian"],
    badge: "NEW",
    badgeColor: "slime",
    stock: 22,
    isNew: true,
    sku: "MWFS-WITC-010",
    features: [
      "Six-tiered bohemian skirts",
      "Hand-sewn leaf & crystal bodice",
      "Root-wood staff with glowing orb",
      "Succulent flower crown",
      "Botanical belt pouch",
    ],
  },
  {
    id: "prod-011",
    slug: "neon-skeleton-rave",
    name: "Neon Skeleton Rave Suit",
    category: "scary",
    price: 55.99,
    rating: 4.7,
    reviewCount: 298,
    images: [
      "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&q=80",
      "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800&q=80",
    ],
    description:
      "UV-reactive neon skeleton bodysuit that glows intensely under black light for dance floors and festivals.",
    longDescription:
      "The Neon Skeleton Rave Suit is engineered for epic Halloween parties. The full-body stretch suit features UV-reactive neon paint on hyper-accurate skeleton anatomy. Under ambient light it reads as sleek black; under UV/blacklight it erupts in electric neon glory. Available in standard and plus sizes with full-length zipper for easy wear.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    tags: ["skeleton", "rave", "UV", "glow", "neon"],
    badge: "TRENDING",
    badgeColor: "slime",
    stock: 38,
    isTrending: true,
    isBestSeller: true,
    sku: "NSKRS-SCAR-011",
    features: [
      "UV-reactive neon skeleton print",
      "Full-body stretch fabric",
      "Full-length back zipper",
      "Machine washable",
      "Available in plus sizes",
    ],
  },
  {
    id: "prod-012",
    slug: "kids-friendly-ghost",
    name: "Friendly Ghost Glow Suit",
    category: "kids",
    price: 34.99,
    rating: 4.9,
    reviewCount: 423,
    images: [
      "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800&q=80",
      "https://images.unsplash.com/photo-1572552635104-e2e33c45e4fb?w=800&q=80",
    ],
    description:
      "Your little ghost will steal all the candy! Adorable glow-in-the-dark ghost costume for the littlest trick-or-treaters.",
    longDescription:
      "The Friendly Ghost Glow Suit is perfect for toddlers and young children. Soft fleece construction with phosphorescent ghost face print glows in the dark after brief light exposure. The billowing ghost shape makes it extra cute and comfortable. Includes matching ghost hood with expression-changing magnetic patch set (happy, silly, spooky).",
    sizes: ["2T", "3T", "4T", "S (5-6)", "M (7-8)"],
    tags: ["kids", "ghost", "glow", "cute", "friendly"],
    badge: "KIDS PICK",
    badgeColor: "slime",
    stock: 52,
    isBestSeller: true,
    sku: "FGG-KIDS-012",
    features: [
      "Soft hypoallergenic fleece",
      "Phosphorescent glow print",
      "Billowing comfortable silhouette",
      "Magnetic expression patch set",
      "Machine washable",
    ],
  },
  {
    id: "prod-013",
    slug: "wednesday-gothic-school-uniform",
    name: "Nevermore Dark Academy Uniform",
    category: "addams-family",
    price: 69.99,
    originalPrice: 94.99,
    rating: 4.95,
    reviewCount: 512,
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
      "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&q=80",
    ],
    description: "Embrace the macabre with this signature dark academy pleated uniform inspired by the Addams Family.",
    longDescription: "Step into the halls of Nevermore with this deluxe raven-black striped blazer, pleated midi skirt, crisp collared shirt, and matching obsidian tie. Features embroidered school crest and premium structured tailoring.",
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["addams-family", "wednesday", "gothic", "womens", "classics"],
    badge: "TRENDING #1",
    badgeColor: "pumpkin",
    stock: 24,
    isTrending: true,
    isBestSeller: true,
    sku: "ADD-WED-013",
    features: ["Embroidered academy crest", "Structured twill blazer", "Permanent pleat midi skirt", "Includes shirt & tie"],
  },
  {
    id: "prod-014",
    slug: "beetlejuice-bio-exorcist-suit",
    name: "Bio-Exorcist Pinstripe Suit",
    category: "beetlejuice",
    price: 84.99,
    originalPrice: 119.99,
    rating: 4.88,
    reviewCount: 388,
    images: [
      "https://images.unsplash.com/photo-1508361727343-ca787442dcd7?w=800&q=80",
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&q=80",
    ],
    description: "It's showtime! Stand out with the iconic black and white striped bio-exorcist three-piece suit.",
    longDescription: "Say his name three times and own the party. Premium vertical stripe tailored jacket with padded shoulders, matching stretch trousers, black tie, and wild mossy-green accent wig.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["beetlejuice", "classics", "funny", "mens", "horror"],
    badge: "MOVIE CLASSIC",
    badgeColor: "slime",
    stock: 18,
    isTrending: true,
    sku: "BJ-SUIT-014",
    features: ["High-contrast stripe pattern", "Tailored jacket with peak lapels", "Includes tie & green character wig"],
  },
  {
    id: "prod-015",
    slug: "inflatable-mega-t-rex",
    name: "Inflatable Mega T-Rex Titan",
    category: "inflatable",
    price: 74.99,
    originalPrice: 99.99,
    rating: 4.92,
    reviewCount: 640,
    images: [
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&q=80",
      "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=800&q=80",
    ],
    description: "Roar into Halloween with the viral 7-foot battery-powered inflatable Tyrannosaurus costume.",
    longDescription: "Equipped with high-output ultra-quiet blower fan that fully inflates in 45 seconds. Crystal clear viewing window and reinforced boot covers.",
    sizes: ["Standard Adult", "Plus Size", "Youth XL"],
    tags: ["inflatable", "funny", "jurassic-world", "mens", "womens"],
    badge: "VIRAL HIT",
    badgeColor: "pumpkin",
    stock: 35,
    isBestSeller: true,
    sku: "INF-TREX-015",
    features: ["Dual high-speed quiet fans", "Water-resistant ripstop nylon", "Reinforced clear face panel"],
  },
  {
    id: "prod-016",
    slug: "ghostbusters-proton-pack-operative",
    name: "Ghostbusters Tech Operative Jumpsuit",
    category: "ghostbusters",
    price: 79.99,
    originalPrice: 109.99,
    rating: 4.86,
    reviewCount: 295,
    images: [
      "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=800&q=80",
      "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&q=80",
    ],
    description: "Who you gonna call? Authentic flight suit with embroidered 'No-Ghost' patch and inflatable Proton Pack.",
    longDescription: "Officially licensed aesthetic with four interchangeable name badges (Venkman, Spengler, Stantz, Zeddemore), working front zip, elbow pads, and lightweight proton blaster wand.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["ghostbusters", "classics", "unisex", "career-occupation"],
    badge: "RETRO HIT",
    badgeColor: "spectral",
    stock: 22,
    sku: "GB-FLIGHT-016",
    features: ["4 interchangeable name patches", "Heavy duty twill fabric", "Inflatable Proton Pack with wand"],
  },
  {
    id: "prod-017",
    slug: "hogwarts-dark-arts-sorcerer",
    name: "Hogwarts Dark Arts Master Robe",
    category: "harry-potter",
    price: 89.99,
    originalPrice: 125.0,
    rating: 4.97,
    reviewCount: 478,
    images: [
      "https://images.unsplash.com/photo-1508361727343-ca787442dcd7?w=800&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    ],
    description: "Cast unforgettable enchantments with velvet lined wizard robes and illuminating wand.",
    longDescription: "Crafted from heavy ceremonial twill with satin interior lining, deep interior wand pocket, antique bronze clasp, and hand-carved resin wand.",
    sizes: ["S", "M", "L", "XL"],
    tags: ["harry-potter", "witchcraft", "mens", "womens", "classics"],
    badge: "STAFF PICK",
    badgeColor: "pumpkin",
    stock: 19,
    isBestSeller: true,
    sku: "HP-ROBE-017",
    features: ["Interior wand holster pocket", "Satin-lined hood and sleeves", "Heavy drape velvet trim"],
  },
  {
    id: "prod-018",
    slug: "baby-plump-pumpkin-romper",
    name: "Baby Plump Pumpkin Fleece Romper",
    category: "baby-infant",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.98,
    reviewCount: 560,
    images: [
      "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800&q=80",
      "https://images.unsplash.com/photo-1572552635104-e2e33c45e4fb?w=800&q=80",
    ],
    description: "The sweetest pumpkin in the patch! Ultra-soft padded plush fleece with green leaf collar.",
    longDescription: "Designed for ultimate infant comfort and quick diaper changes with full bottom snap inseam. Includes matching leaf-topped beanie and non-skid pumpkin booties.",
    sizes: ["0-6M", "6-12M", "12-18M", "18-24M"],
    tags: ["baby-infant", "kids", "funny", "props"],
    badge: "TOP BABY",
    badgeColor: "slime",
    stock: 45,
    isBestSeller: true,
    sku: "INF-PUMP-018",
    features: ["100% hypoallergenic cloud plush", "Full snap diaper access", "Includes non-skid booties"],
  }
];
