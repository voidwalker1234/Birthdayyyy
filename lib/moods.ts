export type Mood = "pink" | "lavender" | "blue" | "peach" | "mint" | "yellow";
export type MoodOption = { id: Mood; name: string; color: string; note: string };

export const moods: MoodOption[] = [
  { id: "pink", name: "Baby pink", color: "#efa4b7", note: "soft & sweet" },
  { id: "lavender", name: "Lavender", color: "#b6a0e5", note: "a little dreamy" },
  { id: "blue", name: "Powder blue", color: "#91bedc", note: "cloud nine" },
  { id: "peach", name: "Peach", color: "#f1aa8e", note: "sunny warmth" },
  { id: "mint", name: "Mint green", color: "#92c6ad", note: "fresh & lovely" },
  { id: "yellow", name: "Butter yellow", color: "#e6c767", note: "little sunshine" },
];
