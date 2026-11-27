import type { Curriculum } from "./types";

export const curriculum: Curriculum = {
  "4-5": {
    "number-forest": {
      title: "Number Forest",
      emoji: "🌳",
      description: "Practise counting with forest friends.",
      stages: {
        tutorial: {
          title: "Tutorial",
          emoji: "📖",
          description: "Meet the numbers.",
        },
        "guided-interaction": {
          title: "Guided Interaction",
          emoji: "🧭",
          description: "Try a few examples together.",
        },
        exercise: {
          title: "Exercise",
          emoji: "🧩",
          description: "Practise counting on your own.",
        },
        test: {
          title: "Test",
          emoji: "🏆",
          description: "Show what you have learned.",
        },
      },
    },
  },
};