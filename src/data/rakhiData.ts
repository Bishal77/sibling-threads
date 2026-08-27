/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE.
 *  Names, nicknames, chapter text, memories, promises, letters,
 *  the family timeline and the music track all live in this file.
 *  You never need to touch the components to personalise the gift.
 * ─────────────────────────────────────────────────────────────
 */

import memoryA from "@/assets/memory-a.jpg";
import memoryB from "@/assets/memory-b.jpg";
import memoryC from "@/assets/memory-c.jpg";
import memoryD from "@/assets/memory-d.jpg";
import familyPhoto from "@/assets/family.jpg";

export type Memory = {
  /** Replace with your own photo: drop it in src/assets and import it above. */
  image: string;
  title: string;
  caption: string;
  date: string;
  /** "tall" | "wide" | "square" — controls how it sits in the gallery. */
  shape?: "tall" | "wide" | "square";
};

export type Sister = {
  slug: string;
  name: string;
  nickname: string;
  flower: string;
  /** Chapter 01 */
  before: string[];
  /** Chapter 02 — one statement per card */
  special: string[];
  specialClosing: string;
  /** Chapter 03 */
  memories: Memory[];
  /** Chapter 04 */
  unsaidThings: string[];
  /** Chapter 06 */
  promises: string[];
  /** Chapter 07 */
  letter: { salutation: string; paragraphs: string[]; signoff: string };
  /** Chapter 08 */
  timeCapsule: string[];
};

export const site = {
  year: "2083",
  title: "A Gift I Couldn't Buy",
  eyebrow: "Raksha Bandhan",
  from: "From your brother.",
  openingMessage: [
    "I wanted to give you something this Raksha Bandhan.",
    "Something you could unwrap.",
    "Something you could keep.",
    "Something that would remind you of me.",
    "But this year, I couldn't.",
    "So I made you something instead.",
  ],
  /**
   * Optional background music.
   * Put a royalty-free track in /public/audio/ and set:
   *   audioSrc: "/audio/your-track.mp3"
   * Left empty, the site plays a soft generated ambient tone instead.
   */
  audioSrc: "",
};

const sharedMemories: Memory[] = [
  {
    image: memoryA,
    title: "Festival lights",
    caption: "Replace me with a childhood photo — the blurry one nobody deleted.",
    date: "Someday, long ago",
    shape: "tall",
  },
  {
    image: memoryB,
    title: "The little things",
    caption: "A screenshot, a note, a receipt from a day that mattered.",
    date: "An ordinary afternoon",
    shape: "wide",
  },
  {
    image: memoryC,
    title: "Home",
    caption: "The room, the terrace, the corner of the house we grew up in.",
    date: "Every year",
    shape: "square",
  },
  {
    image: memoryD,
    title: "That one photo",
    caption: "The one you'd never let me post. It's here anyway.",
    date: "You know the day",
    shape: "tall",
  },
];

export const sisters: Sister[] = [
  {
    slug: "one",
    name: "Sister One",
    nickname: "Didi",
    flower: "\u273F",
    before: [
      "Before you continue, I want you to know something.",
      "I couldn't buy you the gift I normally would.",
      "And honestly, that bothered me.",
      "But then I realised\u2026 maybe a gift doesn't have to cost money to mean something.",
      "So I made this. Every part of it is for you.",
    ],
    special: [
      "You have been part of more chapters of my life than you probably realise.",
      "You've seen versions of me that almost nobody else has.",
      "We've laughed.",
      "We've argued.",
      "We've annoyed each other.",
      "We've grown.",
      "And somehow, you're still one of the people I can call family.",
    ],
    specialClosing: "I don't say it enough, but I'm grateful you're my sister.",
    memories: sharedMemories,
    unsaidThings: [
      "I don't always know how to say what I feel.",
      "Sometimes I act like I don't care as much as I actually do.",
      "I notice more of the things you do for me than I probably ever tell you.",
      "Even when we disagree, you're still my sister.",
      "And that bond means more to me than I usually know how to explain.",
    ],
    promises: [
      "I promise to celebrate your happiness.",
      "I promise to annoy you for the rest of my life.",
      "I promise to be proud of the person you become.",
      "I promise that growing older won't mean growing apart.",
      "And whenever life gets difficult, I hope you'll remember that you don't have to face everything alone.",
    ],
    letter: {
      salutation: "Dear Didi,",
      paragraphs: [
        "I'm not very good at saying things out loud, so I wrote them down instead. You'll probably read this on your phone, somewhere ordinary, and that feels right \u2014 most of our best moments happened somewhere ordinary too.",
        "Thank you for the times you covered for me. For the food you saved. For the advice I pretended not to need and then quietly followed anyway.",
        "I hope this year is kinder to you than the last one was. I hope the things you're working towards arrive. And I hope that when they do, I'm one of the first people you call.",
      ],
      signoff: "Your brother",
    },
    timeCapsule: [
      "Maybe years from now you'll find this again.",
      "We'll both be older.",
      "Life will probably look very different.",
      "But I hope this little piece of today reminds you of one thing:",
    ],
  },
  {
    slug: "two",
    name: "Sister Two",
    nickname: "Bahini",
    flower: "\u2740",
    before: [
      "Before you continue, I want you to know something.",
      "I couldn't buy you the gift I normally would.",
      "And honestly, that bothered me.",
      "But then I realised\u2026 maybe a gift doesn't have to cost money to mean something.",
      "So I made this. Every part of it is for you.",
    ],
    special: [
      "You have been part of more chapters of my life than you probably realise.",
      "You've seen versions of me that almost nobody else has.",
      "We've laughed.",
      "We've argued.",
      "We've annoyed each other.",
      "We've grown.",
      "And somehow, you're still one of the people I can call family.",
    ],
    specialClosing: "I don't say it enough, but I'm grateful you're my sister.",
    memories: sharedMemories,
    unsaidThings: [
      "I don't always know how to say what I feel.",
      "Sometimes I act like I don't care as much as I actually do.",
      "I notice more of the things you do for me than I probably ever tell you.",
      "Even when we disagree, you're still my sister.",
      "And that bond means more to me than I usually know how to explain.",
    ],
    promises: [
      "I promise to celebrate your happiness.",
      "I promise to annoy you for the rest of my life.",
      "I promise to be proud of the person you become.",
      "I promise that growing older won't mean growing apart.",
      "And whenever life gets difficult, I hope you'll remember that you don't have to face everything alone.",
    ],
    letter: {
      salutation: "Dear Bahini,",
      paragraphs: [
        "You were the loud half of the house and I never told you how much quieter it is without that. I'm writing this because there are things I keep meaning to say and then don't.",
        "Thank you for laughing at the jokes that weren't funny. For remembering the dates I forget. For being stubborn about the things worth being stubborn about.",
        "Wherever you end up, I'd like you to know there's always one person keeping score of your good days and quietly cheering.",
      ],
      signoff: "Your brother",
    },
    timeCapsule: [
      "Maybe years from now you'll find this again.",
      "We'll both be older.",
      "Life will probably look very different.",
      "But I hope this little piece of today reminds you of one thing:",
    ],
  },
];

export const threeOfUs = {
  heading: "Two Sisters. One Brother. A Lifetime of Memories.",
  photo: familyPhoto,
  milestones: [
    {
      era: "Childhood",
      title: "Where it started",
      caption: "Three kids, one house, far too much noise.",
      image: memoryA,
    },
    {
      era: "School years",
      title: "Uniforms and arguments",
      caption: "Shared tiffin boxes and completely separate opinions.",
      image: memoryB,
    },
    {
      era: "Growing up",
      title: "Different rooms, same roof",
      caption: "We became people instead of just siblings.",
      image: memoryC,
    },
    {
      era: "Family moments",
      title: "The ones we still retell",
      caption: "Half the story is exaggerated. Nobody minds.",
      image: memoryD,
    },
    {
      era: `Today \u2014 Raksha Bandhan ${site.year}`,
      title: "This gift",
      caption: "Made instead of bought.",
      image: familyPhoto,
    },
    {
      era: "The future",
      title: "Still to be written",
      caption: "Leave this one empty for now.",
      image: memoryB,
    },
  ],
  closing: [
    "Whatever changes,",
    "wherever life takes us,",
    "I hope this part never changes.",
  ],
};

export const getSister = (slug?: string) => sisters.find((s) => s.slug === slug);
