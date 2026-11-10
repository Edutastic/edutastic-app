import Mascot from "../../components/ui/Mascot";
import Decor from "../../components/ui/Decor";
import Button from "../../components/ui/Button";
import TeacherPanel from "../../components/Teacher/TeacherPanel";

export const metadata = { title: "AI Teacher – Edutastic" };

const features = [
  { emoji: "💡", title: "Helpful hints", text: "Stuck on a level? Your teacher will nudge you the right way.", tint: "sun" },
  { emoji: "🔍", title: "Spot weak points", text: "See where a little extra practice will help most.", tint: "bubble" },
  { emoji: "📝", title: "Progress check-ins", text: "Friendly summaries of how you are doing.", tint: "mint" },
];

/*
  AI Teacher page – visual placeholder.
  The future AI integration should live in components/Teacher/TeacherPanel.tsx.
*/
export default function TeacherPage() {
  return (
    <main className="ed-container ed-page space-y-8">
      <section className="ed-hero px-6 py-8 sm:px-10">
        <Decor symbols={["💡", "📚", "✏️", "🌟", "🎓", "✨"]} />
        <div className="grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <span className="ed-chip">🦉 AI Teacher</span>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Meet <span className="text-sun-400">Eddie</span>, your learning buddy
            </h1>
            <p className="max-w-lg text-lg text-white/85">
              Soon you&apos;ll be able to chat with a friendly teacher who helps you learn at your own pace.
            </p>
            <span className="ed-chip ed-chip-sun">🚧 Coming soon</span>
          </div>
          <div className="flex justify-center">
            <Mascot size={220} className="ed-float drop-shadow-xl" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <TeacherPanel />
        <div className="space-y-4">
          {features.map((f) => (
            <div key={f.title} className={`ed-tint ed-tint-${f.tint} flex items-center gap-4 p-5`}>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-3xl">{f.emoji}</span>
              <div>
                <h2 className="text-xl font-semibold">{f.title}</h2>
                <p className="text-sm text-grape-900/75">{f.text}</p>
              </div>
            </div>
          ))}
          <Button href="/subjects/math/levels" variant="coral" className="w-full">Back to learning</Button>
        </div>
      </div>
    </main>
  );
}
