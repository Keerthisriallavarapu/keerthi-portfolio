"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Send, Sparkles, User, Loader2 } from "lucide-react";

interface ChatPanelProps {
  onClose: () => void;
}

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

const SUGGESTED = [
  "What's your experience with vLLM and inference optimization?",
  "Tell me about a hard production problem you've solved",
  "Why should we hire you over other senior ML candidates?",
  "What did you build at Bank of America?",
];

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Keerthi's AI assistant. I have access to his resume, project READMEs, and engineering decisions docs. Ask me anything about his experience, technical depth, or specific projects — I'll answer with citations from his actual work.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!r.ok || !r.body) {
        throw new Error("API error");
      }

      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      // Add empty assistant message to stream into
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        assistantContent += chunk;
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantContent,
          };
          return updated;
        });
      }
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Hmm, I couldn't connect to my backend. (If you're running this locally, make sure the ANTHROPIC_API_KEY env var is set.) In the meantime, you can browse Keerthi's projects below.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      />
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] z-50 bg-white border-l border-gray-200 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="font-medium text-gray-900 leading-tight">
                ask my resume
              </div>
              <div className="text-[11px] text-gray-500 font-mono">
                RAG-powered career assistant
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin"
        >
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-500 ml-10">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>thinking…</span>
            </div>
          )}

          {/* Suggestions only shown initially */}
          {messages.length === 1 && !loading && (
            <div className="space-y-2 pt-2">
              <div className="text-xs text-gray-400 font-mono px-1">
                or try one of these:
              </div>
              {SUGGESTED.map((q, i) => (
                <button
                  key={i}
                  onClick={() => send(q)}
                  className="block w-full text-left text-sm px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-4 border-t border-gray-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ask anything about keerthi…"
                disabled={loading}
                className="w-full px-4 py-3 pr-12 rounded-full bg-gray-100 focus:bg-white border border-transparent focus:border-gray-300 focus:outline-none text-sm placeholder-gray-400 transition-all"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-accent-500 to-purple-500 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
          <p className="text-[10px] text-gray-400 mt-2 px-2 font-mono">
            Powered by Claude · responses cited from real resume and project docs
          </p>
        </div>
      </motion.div>
    </>
  );
}

function ChatMessage({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="flex items-start gap-3 flex-row-reverse">
        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <User className="w-3.5 h-3.5 text-gray-600" />
        </div>
        <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-gray-900 max-w-[85%]">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-500 to-purple-500 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="text-sm text-gray-800 leading-relaxed max-w-[85%] whitespace-pre-wrap">
        {message.content || (
          <span className="text-gray-400 italic">…</span>
        )}
      </div>
    </div>
  );
}
