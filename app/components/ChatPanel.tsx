"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Icon from "./Icon";

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "What is your tech stack?",
  "Tell me about your HubSpot work",
  "Which projects should I look at?",
  "How can I contact you?",
];

const greeting: Msg = {
  role: "assistant",
  content: "Hi! I'm an AI assistant. Ask me anything about Vadivel's skills, experience or projects.",
};

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [provider, setProvider] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    field.current?.focus();
  }, []);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setError("");
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // the greeting is UI only; send the real conversation
        body: JSON.stringify({ messages: next.filter((m) => m !== greeting) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setMessages([...next, { role: "assistant", content: data.reply }]);
        setProvider(data.provider || "");
      }
    } catch {
      setError("Could not reach the assistant. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div
      role="dialog"
      aria-label="AI assistant"
      className="flex h-[min(70vh,540px)] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl"
    >
      <div className="flex items-center gap-3 bg-[var(--button)] px-4 py-3 text-[var(--button-text)]">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-base">
          <Icon name="fa-solid fa-robot" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold leading-tight">Ask about Vadivel</p>
          <p className="text-[11.5px] opacity-75">AI assistant{provider ? ` · via ${provider}` : ""}</p>
        </div>
        <button onClick={onClose} aria-label="Close chat" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15">
          <Icon name="fa-solid fa-xmark" />
        </button>
      </div>

      <div ref={box} className="flex-1 space-y-3 overflow-y-auto bg-[var(--bg)] p-4" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex"}>
            <p
              className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[14px] leading-6 ${
                m.role === "user"
                  ? "rounded-br-sm bg-[var(--button)] text-[var(--button-text)]"
                  : "rounded-bl-sm border border-[var(--border)] bg-[var(--card)] text-[var(--text)]"
              }`}
            >
              {m.content}
            </p>
          </div>
        ))}

        {busy && (
          <div className="flex">
            <span className="flex gap-1 rounded-2xl rounded-bl-sm border border-[var(--border)] bg-[var(--card)] px-4 py-3" aria-label="Thinking">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted)]" style={{ animationDelay: `${d * 0.15}s` }} />
              ))}
            </span>
          </div>
        )}

        {error && <p className="rounded-xl bg-red-50 px-3.5 py-2.5 text-[13px] leading-5 text-red-700">{error}</p>}

        {messages.length === 1 && !busy && (
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-[var(--heading)]/20 bg-[var(--card)] px-3 py-1.5 text-[12.5px] text-[var(--heading)] transition-colors hover:bg-[var(--accent-soft)]"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="border-t border-[var(--border)] bg-[var(--card)] p-3">
        <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] py-1.5 pl-4 pr-1.5 focus-within:border-[var(--accent)]">
          <input
            ref={field}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={500}
            placeholder="Ask a question…"
            aria-label="Your question"
            className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--button)] text-[var(--button-text)] disabled:opacity-40"
          >
            <Icon name="fa-solid fa-arrow-up" className="text-xs" />
          </button>
        </div>
        <p className="mt-2 px-1 text-[11px] leading-4 text-[var(--muted)]">AI answers may be inaccurate. For anything important, email Vadivel directly.</p>
      </form>
    </div>
  );
}
