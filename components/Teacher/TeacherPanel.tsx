import Mascot from "../ui/Mascot";

/*
  ==========================================================================
  AI TEACHER – INTEGRATION POINT FOR THE FUTURE DEVELOPER
  --------------------------------------------------------------------------
  This is a VISUAL PLACEHOLDER only. No chatbot, API or AI logic exists.

  To integrate the real teacher:
    • Replace the static `messages` below with live conversation state
      (or pass a `messages` prop in from a client component / hook).
    • Replace the disabled input + button with a real message form.
    • Keep the outer <section> markup: pages (/teacher) and the in-game
      "Hint" flow can both render <TeacherPanel /> unchanged.
  ==========================================================================
*/

export type TeacherMessage = { from: "teacher" | "child"; text: string };

const placeholderMessages: TeacherMessage[] = [
  { from: "teacher", text: "Hi there! I'm Felix, your learning buddy! 👋" },
  { from: "child", text: "Can you help me with a level?" },
  { from: "teacher", text: "Of course! (Sample message – the real Teacher is coming soon.)" },
];

type Props = { messages?: TeacherMessage[]; enabled?: boolean };

export default function TeacherPanel({ messages = placeholderMessages, enabled = false }: Props) {
  return (
    <section className="ed-card overflow-hidden" aria-label="AI Teacher chat (placeholder)">
      <header className="flex items-center gap-3 bg-grape-600 px-5 py-3 text-white">
        <Mascot size={44} />
        <div className="flex-1">
          <p className="font-display text-xl font-semibold leading-none">Felix the Teacher</p>
          <p className="text-sm text-white/80">{enabled ? "Online" : "Coming soon"}</p>
        </div>
        <span className="ed-chip">🚧 Preview</span>
      </header>

      <div className="space-y-3 p-5" data-teacher-messages>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "child" ? "justify-end" : "justify-start"}`}>
            <p
              className={`max-w-[80%] rounded-3xl px-4 py-3 font-semibold ${
                m.from === "child" ? "rounded-br-lg bg-bolt-500 text-white" : "rounded-bl-lg bg-grape-100 text-grape-900"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 border-t-2 border-line bg-surface-2 p-4">
        <input className="ed-input" placeholder="Chat will be available soon…" disabled aria-label="Message the teacher" />
        <button type="button" className="ed-btn ed-btn-bolt" disabled aria-disabled="true">
          Send
        </button>
      </div>
    </section>
  );
}
