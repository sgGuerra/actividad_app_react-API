"use client";
/**
 * ChatBox.jsx
 * ─────────────────────────────────────────────────────────────
 * Renders the chat history between the user and the AI.
 * Each message is styled differently based on who sent it.
 *
 * Props:
 *   - messages: array of { role: "user"|"ai", text: string }
 *   - isAiThinking: boolean — shows a "typing" indicator
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react";
import { ChatMessage } from "@/utils/types";

interface ChatBoxProps {
  messages: ChatMessage[];
  isAiThinking: boolean;
}

export default function ChatBox({ messages, isAiThinking }: ChatBoxProps) {
  // This ref lets us auto-scroll to the latest message
  const bottomRef = useRef(null);

  // Every time messages change, scroll to the bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiThinking]);

  return (
    <div className="relative z-10 flex h-[22rem] flex-col gap-4 overflow-y-auto rounded-3xl border border-indigo-300/20 bg-slate-950/50 p-4 sm:p-5">
      {/* Render each message */}
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}

      {/* AI "typing" indicator */}
      {isAiThinking && (
        <div className="flex animate-fadeInUp items-center gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-cyan-200/40 bg-cyan-400/10 text-[10px] text-cyan-100">
            IA
          </div>
          <div className="rounded-2xl rounded-tl-none border border-white/15 bg-black px-4 py-3">
            <div className="flex h-5 items-center gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      {/* Invisible anchor at the bottom for auto-scroll */}
      <div ref={bottomRef} />
    </div>
  );
}

/**
 * MessageBubble
 * Renders a single chat message.
 * User messages appear on the RIGHT, AI messages on the LEFT.
 */
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-end gap-2 animate-fadeInUp ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-[10px] ${
          isUser ? "border-fuchsia-200 bg-fuchsia-300 text-slate-900" : "border-cyan-200/40 bg-cyan-400/10 text-cyan-100"
        }`}
      >
        {isUser ? "Tú" : "IA"}
      </div>

      {/* Message text */}
      <div
        className={`max-w-xs rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-sm ${
          isUser
            ? "rounded-br-none bg-gradient-to-r from-fuchsia-200 to-fuchsia-300 text-slate-900"
            : "rounded-bl-none border border-cyan-200/20 bg-slate-950 text-white"
        }`}
      >
        {/* Split on ** for bold formatting */}
        {formatMessage(message.text)}
      </div>
    </div>
  );
}

/**
 * formatMessage
 * Converts **bold** markdown to <strong> tags.
 * Simple inline parser — no need for a full markdown library.
 */
function formatMessage(text?: string) {
  if (!text) return null;
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold">
        {part}
      </strong>
    ) : (
      part
    )
  );
}
