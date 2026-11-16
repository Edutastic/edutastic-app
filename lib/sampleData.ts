/*
  PLACEHOLDER DATA ONLY.
  Everything in this file is fictional sample content used to make the designs
  look complete. Replace with real data (API / database) in later stages.
*/

export const learner = {
  name: "John",
  fullName: "John Marston",
  ageGroup: "4-5",
  avatar: "🦊",
  streak: 5,
  stars: 128,
  xp: 1240,
  xpNext: 1500,
  rank: "Explorer",
};

export type Tint = "grape" | "bolt" | "coral" | "bubble" | "sun" | "mint";

export const subjects = [
  { slug: "math", name: "Mathematics", emoji: "🔢", tint: "bolt" as Tint, active: true, progress: 38 },
  { slug: "science", name: "Science", emoji: "🔬", tint: "mint" as Tint, active: false, progress: 0 },
  { slug: "geography", name: "Geography", emoji: "🌍", tint: "sun" as Tint, active: false, progress: 0 },
  { slug: "logic", name: "Logic", emoji: "🧩", tint: "bubble" as Tint, active: false, progress: 0 },
  { slug: "general", name: "General Knowledge", emoji: "💡", tint: "coral" as Tint, active: false, progress: 0 },
];

export const ageGroups = [
  { value: "4-5", label: "Ages 4–5", emoji: "🐣", blurb: "Enchanted Kingdom" },
  { value: "6-8", label: "Ages 6–8", emoji: "🚀", blurb: "Adventure Island" },
  { value: "9-10", label: "Ages 9–10", emoji: "🏆", blurb: "Future Hub" },
  { value: "11-12", label: "Ages 11–12", emoji: "👑", blurb: "Brainy legends" },
];


export const mathTopics = [
  {
    name: "Number Forest",
    emoji: "🌳",
    description: "Learn to count numbers, fruits and forest animals!",
    difficulty: "Easy",
    tint: "coral" as Tint,
    progress: 80,
  },
  {
    name: "Pattern Bridge",
    emoji: "🌈",
    description: "Find patterns and discover what comes next!",
    difficulty: "Easy",
    tint: "bolt" as Tint,
    progress: 55,
  },
  {
    name: "Potion Shop",
    emoji: "🧪",
    description: "Sort magical ingredients into different groups!",
    difficulty: "Medium",
    tint: "sun" as Tint,
    progress: 30,
  },
  {
    name: "Giants Garden",
    emoji: "🌻",
    description: "Discover big and small things and compare their sizes!",
    difficulty: "Medium",
    tint: "mint" as Tint,
    progress: 10,
  },
  {
    name: "Picnic Village",
    emoji: "🧺",
    description: "Split treats and share quantities with friends!",
    difficulty: "Tricky",
    tint: "bubble" as Tint,
    progress: 0,
  },
  {
    name: "Shape Castle",
    emoji: "🏰",
    description: "Explore circles, squares, triangles and more!",
    difficulty: "Tricky",
    tint: "grape" as Tint,
    progress: 0,
  },
];


export const recentActivities = [
  { title: "Activity Placeholder A", when: "Today", emoji: "🎈", stars: 3 },
  { title: "Activity Placeholder B", when: "Yesterday", emoji: "🚂", stars: 2 },
  { title: "Activity Placeholder C", when: "2 days ago", emoji: "🐙", stars: 3 },
];

export const weekly = [
  { day: "Mon", minutes: 15 },
  { day: "Tue", minutes: 25 },
  { day: "Wed", minutes: 0 },
  { day: "Thu", minutes: 20 },
  { day: "Fri", minutes: 35 },
  { day: "Sat", minutes: 30 },
  { day: "Sun", minutes: 10 },
];

export const skills = [
  { name: "Subtopic A", value: 6, tint: "grape" as const },
  { name: "Subtopic B", value: 11, tint: "sun" as const },
  { name: "Subtopic C", value: 3, tint: "coral" as const },
];

export const badges = [
  { name: "First Steps", emoji: "👣", unlocked: true },
  { name: "Star Collector", emoji: "⭐", unlocked: true },
  { name: "Hot Streak", emoji: "🔥", unlocked: true },
  { name: "Quick Thinker", emoji: "⚡", unlocked: true },
  { name: "Brave Explorer", emoji: "🧭", unlocked: false },
  { name: "Puzzle Master", emoji: "🧩", unlocked: false },
  { name: "Rocket Learner", emoji: "🚀", unlocked: false },
  { name: "Super Champion", emoji: "👑", unlocked: false },
];

export const trophies = [
  { name: "Bronze Cup", emoji: "🥉", unlocked: true },
  { name: "Silver Cup", emoji: "🥈", unlocked: false },
  { name: "Golden Cup", emoji: "🥇", unlocked: false },
];

export const achievements = [
  { title: "Achievement Placeholder One", desc: "A short description of the goal goes here.", progress: 100, emoji: "🎯", tint: "mint" as Tint },
  { title: "Achievement Placeholder Two", desc: "A short description of the goal goes here.", progress: 60, emoji: "🌈", tint: "sun" as Tint },
  { title: "Achievement Placeholder Three", desc: "A short description of the goal goes here.", progress: 25, emoji: "🦄", tint: "bubble" as Tint },
];

export type NodeState = "done" | "current" | "open" | "locked";

export const stages = [
  {
    title: "Stage 1",
    name: "Sunny Meadow",
    emoji: "🌻",
    tint: "mint" as Tint,
    nodes: [
      { n: 1, state: "done" as NodeState, stars: 3 },
      { n: 2, state: "done" as NodeState, stars: 2 },
      { n: 3, state: "done" as NodeState, stars: 3 },
      { n: 4, state: "current" as NodeState, stars: 0 },
      { n: 5, state: "open" as NodeState, stars: 0 },
      { n: 6, state: "locked" as NodeState, stars: 0 },
    ],
  },
  {
    title: "Stage 2",
    name: "Candy Canyon",
    emoji: "🍭",
    tint: "bubble" as Tint,
    nodes: [
      { n: 7, state: "locked" as NodeState, stars: 0 },
      { n: 8, state: "locked" as NodeState, stars: 0 },
      { n: 9, state: "locked" as NodeState, stars: 0 },
      { n: 10, state: "locked" as NodeState, stars: 0 },
      { n: 11, state: "locked" as NodeState, stars: 0 },
    ],
  },
];
