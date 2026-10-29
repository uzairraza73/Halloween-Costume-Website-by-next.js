export interface SubCategoryItem {
  name: string;
  slug: string;
  tag?: string;
  description?: string;
  badge?: string;
}

export interface HeaderCategory {
  id: string;
  label: string;
  slug: string;
  icon: string;
  accentColor: string; // e.g. orange, purple, red, cyan, etc.
  description: string;
  popularSubCategories: SubCategoryItem[];
  featuredCostumes: {
    name: string;
    slug: string;
    price: string;
  }[];
}

export const CATEGORIES_WITH_SUBS: HeaderCategory[] = [
  {
    id: "scary",
    label: "Horror & Scary",
    slug: "scary",
    icon: "💀",
    accentColor: "#EF4444",
    description: "Bone-chilling costumes, undead creatures & terrifying killers",
    popularSubCategories: [
      { name: "Grim Reapers & Phantoms", slug: "reaper", tag: "reaper", badge: "Trending" },
      { name: "Skeletons & Skulls", slug: "scary", tag: "skeleton" },
      { name: "Zombies & Undead Walkers", slug: "scary", tag: "undead" },
      { name: "Classic Slashers & Killers", slug: "scary", tag: "horror" },
      { name: "Demon & Beast Masks", slug: "scary", tag: "demon" },
    ],
    featuredCostumes: [
      { name: "Shadow Reaper Elite", slug: "shadow-reaper-elite", price: "$89.99" },
      { name: "Neon Skeleton Glow Suit", slug: "neon-skeleton-glow-suit", price: "$49.99" },
    ],
  },
  {
    id: "vampire-gothic",
    label: "Vampires & Gothic",
    slug: "vampire-gothic",
    icon: "🧛",
    accentColor: "#A855F7",
    description: "Victorian nobility, bloodthirsty aristocrats & gothic darkness",
    popularSubCategories: [
      { name: "Victorian & Gothic Counts", slug: "vampire-gothic", tag: "victorian", badge: "Popular" },
      { name: "Vampire Noblewomen & Capes", slug: "vampire-gothic", tag: "countess" },
      { name: "Dracula & Transylvanian Capes", slug: "vampire-gothic", tag: "dracula" },
      { name: "Gothic Dark Romance & Corsets", slug: "vampire-gothic", tag: "gothic" },
      { name: "Fangs, Blood & Coffin Props", slug: "vampire-gothic", tag: "accessories" },
    ],
    featuredCostumes: [
      { name: "Crimson Countess Vampire", slug: "crimson-countess-vampire", price: "$74.99" },
      { name: "Lord Dracula Velvet Cloak", slug: "crimson-countess-vampire", price: "$84.99" },
    ],
  },
  {
    id: "witchcraft",
    label: "Witches & Magic",
    slug: "witchcraft",
    icon: "🔮",
    accentColor: "#8B5CF6",
    description: "Mystical sorceresses, potions, enchanted gowns & covens",
    popularSubCategories: [
      { name: "Midnight Sorceress Gowns", slug: "witchcraft", tag: "sorceress", badge: "Hot" },
      { name: "Wicked Green Witches", slug: "witchcraft", tag: "witch" },
      { name: "Spellcraft & Alchemy Accessories", slug: "witchcraft", tag: "magic" },
      { name: "Pointed Hats & Magic Wands", slug: "witchcraft", tag: "props" },
      { name: "Dark Occult & Celestial Robes", slug: "witchcraft", tag: "celestial" },
    ],
    featuredCostumes: [
      { name: "Hex Queen Sorceress", slug: "hex-queen-sorceress", price: "$64.99" },
      { name: "Celestial Moon Witch", slug: "hex-queen-sorceress", price: "$59.99" },
    ],
  },
  {
    id: "superhero",
    label: "Superheroes & Villains",
    slug: "superhero",
    icon: "⚡",
    accentColor: "#3B82F6",
    description: "Armored vigilantes, comic legends, anti-heroes & masks",
    popularSubCategories: [
      { name: "Dark Knights & Vigilantes", slug: "superhero", tag: "knight", badge: "Top Rated" },
      { name: "Comic Book Avengers & Heroes", slug: "superhero", tag: "hero" },
      { name: "Infamous Supervillains & Rogues", slug: "superhero", tag: "villain" },
      { name: "Foam Muscle Suits & Armor", slug: "superhero", tag: "armor" },
      { name: "Capes, Gauntlets & Masks", slug: "superhero", tag: "mask" },
    ],
    featuredCostumes: [
      { name: "Dark Knight Crusader", slug: "dark-knight-crusader", price: "$119.99" },
      { name: "Cyber Armor vigilante", slug: "dark-knight-crusader", price: "$109.99" },
    ],
  },
  {
    id: "couples",
    label: "Couples & Duos",
    slug: "couples",
    icon: "🧑‍🤝‍🧑",
    accentColor: "#F97316",
    description: "Matching pairs, iconic movie couples & dynamic horror duos",
    popularSubCategories: [
      { name: "Haunted Bride & Groom Sets", slug: "couples", tag: "bride", badge: "Best Seller" },
      { name: "Vampire King & Queen Duos", slug: "couples", tag: "vampire" },
      { name: "Funny & Foodie Pair Costumes", slug: "couples", tag: "funny" },
      { name: "Famous Movie & TV Duos", slug: "couples", tag: "movie" },
      { name: "Fairytale & Medieval Pairs", slug: "couples", tag: "fairytale" },
    ],
    featuredCostumes: [
      { name: "Haunted Bride & Groom Set", slug: "haunted-bride-and-groom", price: "$139.99" },
      { name: "Vampire Noble Couple", slug: "haunted-bride-and-groom", price: "$149.99" },
    ],
  },
  {
    id: "kids",
    label: "Kids & Teens",
    slug: "kids",
    icon: "👦",
    accentColor: "#10B981",
    description: "Friendly ghosts, mini monsters, cute wizards & family fun",
    popularSubCategories: [
      { name: "Infant & Toddler Onesies", slug: "kids", tag: "toddler", badge: "Cute" },
      { name: "Little Wizards & Witches", slug: "kids", tag: "witch" },
      { name: "Spooky Monster Costumes", slug: "kids", tag: "monster" },
      { name: "Mini Heroes & Princesses", slug: "kids", tag: "hero" },
      { name: "Trick-or-Treat Trick Bags & Lights", slug: "kids", tag: "accessories" },
    ],
    featuredCostumes: [
      { name: "Little Pumpkin Prince", slug: "little-pumpkin-prince", price: "$34.99" },
      { name: "Junior Wizard Robe Set", slug: "junior-wizard-robe", price: "$39.99" },
    ],
  },
  {
    id: "props",
    label: "Props & Decor",
    slug: "props",
    icon: "🎃",
    accentColor: "#F59E0B",
    description: "Animatronics, foggers, tomb stones, foam weapons & lighting",
    popularSubCategories: [
      { name: "Animatronics & Sound Props", slug: "props", tag: "animatronics", badge: "High Tech" },
      { name: "Fog Machines & LED Lighting", slug: "props", tag: "lighting" },
      { name: "Tombstones & Graveyard Decor", slug: "props", tag: "graveyard" },
      { name: "Foam Scythes, Swords & Wands", slug: "props", tag: "weapon" },
      { name: "Jack-O'-Lanterns & Hanging Bats", slug: "props", tag: "decor" },
    ],
    featuredCostumes: [
      { name: "Spectral Fogging Cauldron", slug: "spectral-fogging-cauldron", price: "$44.99" },
      { name: "LED Jack-O'-Lantern 3-Pack", slug: "led-jack-o-lantern", price: "$29.99" },
    ],
  },
];
