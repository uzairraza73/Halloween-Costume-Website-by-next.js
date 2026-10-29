export interface MegaMenuItem {
  label: string;
  slug: string;
  hasArrow?: boolean;
}

export interface MegaMenuColumn {
  title: string;
  icon: string;
  items: MegaMenuItem[];
}

export const MEGA_MENU_DATA: MegaMenuColumn[] = [
  {
    title: "Shop All Costume Characters",
    icon: "🧑‍🤝‍🧑",
    items: [
      { label: "Addams Family", slug: "addams-family" },
      { label: "American Girl", slug: "american-girl" },
      { label: "Barbie", slug: "barbie" },
      { label: "Beetlejuice", slug: "beetlejuice" },
      { label: "Disney", slug: "disney" },
      { label: "Flintstones", slug: "flintstones" },
      { label: "Ghostbusters", slug: "ghostbusters" },
      { label: "Harry Potter", slug: "harry-potter", hasArrow: true },
      { label: "Jurassic World", slug: "jurassic-world" },
      { label: "House of the Dragon", slug: "house-of-the-dragon" },
      { label: "K-Pop Demon Hunters", slug: "k-pop-demon-hunters" },
      { label: "Looney Tunes", slug: "looney-tunes" },
      { label: "Peanuts", slug: "peanuts" },
      { label: "Scooby-Doo", slug: "scooby-doo" },
      { label: "SpongeBob", slug: "spongebob" },
      { label: "Teenage Mutant Ninja Turtles", slug: "tmnt" },
    ],
  },
  {
    title: "Shop All Costume Themes",
    icon: "🎃",
    items: [
      { label: "Couple, Group & Costume Sets", slug: "couples", hasArrow: true },
      { label: "Classics", slug: "classics" },
      { label: "Career & Occupation", slug: "career-occupation", hasArrow: true },
      { label: "Candy Brands", slug: "candy-brands" },
      { label: "Horror & Fright", slug: "scary" },
      { label: "Inflatable", slug: "inflatable" },
      { label: "Funny", slug: "funny" },
      { label: "Superheros", slug: "superhero", hasArrow: true },
      { label: "Wheelchair & Wagon Covers", slug: "wheelchair-wagon", hasArrow: true },
    ],
  },
  {
    title: "Shop All Adult Costumes",
    icon: "🧛",
    items: [
      { label: "Women's Costumes", slug: "womens" },
      { label: "Men's Costumes", slug: "mens", hasArrow: true },
      { label: "Unisex Costumes", slug: "unisex" },
      { label: "Plus Size Costumes", slug: "plus-size" },
      { label: "Couple & Group Costumes", slug: "couples", hasArrow: true },
      { label: "Sexy Costumes", slug: "sexy" },
    ],
  },
  {
    title: "Shop All Kids' Costumes",
    icon: "🎁",
    items: [
      { label: "Baby & Infant Costumes", slug: "baby-infant" },
      { label: "Boys' Costumes", slug: "boys" },
      { label: "Girls' Costumes", slug: "girls" },
    ],
  },
];
