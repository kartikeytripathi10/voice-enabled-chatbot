"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // ✅ Initialize Speech Recognition once
  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setMessages((prev) => [...prev, `🗣️ ${transcript}`]);
      await handleSendMessage(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  // ✅ Toggle microphone listening
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
      setMessages((prev) => [...prev, "🛑 Stopped listening."]);
    } else {
      recognitionRef.current.start();
      setMessages((prev) => [...prev, "🎤 Listening..."]);
    }

    setListening((prev) => !prev);
  };

  // ✅ Send message to backend
  const handleSendMessage = async (text: string) => {
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      if (data?.response) {
        setMessages((prev) => [...prev, `🤖 ${data.response}`]);
      } else {
        setMessages((prev) => [...prev, "⚠️ Error getting response"]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, "❌ Server error"]);
    }
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
                  msg.startsWith("🗣️") || msg.startsWith("🎤") || msg.startsWith("🛑")
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl shadow max-w-xs text-sm ${
                    msg.startsWith("🤖")
                      ? "bg-gray-800 border border-gray-700 text-gray-100"
                      : "bg-indigo-600 text-white"
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
