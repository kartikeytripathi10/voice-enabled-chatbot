"use client";

import { useState } from "react";
import { Mic, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const toggleListening = () => {
    const newStatus = !listening;
    setListening(newStatus);
    setMessages((prev) => [
      ...prev,
      newStatus ? "🎤 Listening..." : "🛑 Stopped listening.",
    ]);
  };

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4">
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl shadow-2xl w-full max-w-3xl">
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-t-3xl px-6 py-5 shadow-md">
          <h1 className="text-3xl font-extrabold tracking-wide">AI Voice Chat</h1>
          <p className="text-sm opacity-90">Talk to your AI assistant</p>
        </div>

        <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400 italic">Start a conversation...</p>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex ${
                  msg.startsWith("🎤") || msg.startsWith("🛑")
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl shadow max-w-xs text-sm ${
                    msg.startsWith("🎤") || msg.startsWith("🛑")
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-800 border border-gray-700 text-gray-100"
                  }`}
                >
                  {msg}
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="flex items-center justify-center px-6 py-6 bg-[#111827] rounded-b-3xl">
          <button
            onClick={toggleListening}
            className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-md transition font-semibold text-white text-lg
            ${listening ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"}`}
          >
            {listening ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Listening...
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                Start Talking
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
