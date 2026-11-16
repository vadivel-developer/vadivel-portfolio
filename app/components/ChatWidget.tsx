"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Icon from "./Icon";

// the chat panel is only downloaded the first time someone opens the chat
const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false, loading: () => null });

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {mounted && (
        <div
          className={`fixed bottom-24 right-4 z-50 w-[min(92vw,390px)] origin-bottom-right transition-all duration-200 sm:right-6 ${
            open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
          }`}
          aria-hidden={!open}
        >
          <ChatPanel onClose={() => setOpen(false)} />
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setMounted(true);
          setOpen((v) => !v);
        }}
        aria-label={open ? "Close the AI assistant" : "Ask the AI assistant"}
        aria-expanded={open}
        className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--button)] text-2xl text-[var(--button-text)] shadow-2xl transition-transform hover:scale-110 sm:right-6"
      >
        <Icon name={open ? "fa-solid fa-xmark" : "fa-solid fa-comment-dots"} />
      </button>
    </>
  );
}
