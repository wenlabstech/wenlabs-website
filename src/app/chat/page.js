"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const walletInfo = {
    address: "I am not live",
    balance: "I will be here for you.",
  };

  useEffect(() => {
    setMessages([
      {
        role: "bot",
        content: `Hi! 👋 I am Wen AI. \n\nCurrently ${walletInfo.address}\nSoon ${walletInfo.balance}`,
      },
    ]);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const reply = {
        role: "AI",
        content: "Wen AI is not live yet, but soon you will have an AI assistant at your fingertips.",
      };
      setMessages((prev) => [...prev, reply]);
    }, 600);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="fixed inset-0 bg-black text-white overflow-y-auto pt-24 pb-40 z-40"
      style={{
        scrollbarColor: "#1E1E1E transparent",
        scrollbarWidth: "thin",
      }}
    >
      <div className="flex flex-col items-center px-4">
        <div className="w-full max-w-3xl flex flex-col gap-4">
          {messages.map((msg, idx) =>
            msg.role === "user" ? (
              <div
                key={idx}
                className="self-end bg-white/10 text-white p-3 rounded-2xl max-w-sm whitespace-pre-wrap break-words"
              >
                {msg.content}
              </div>
            ) : (
              <motion.div
                key={idx}
                className="self-start text-white bg-transparent max-w-sm whitespace-pre-wrap break-words overflow-hidden rounded-2xl.001"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {msg.content}
              </motion.div>
            )
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-10 w-full flex justify-center px-4 z-50">
        <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-3xl w-full max-w-3xl">
          {/* Input Row */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-base"
              placeholder="Ask Wen AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <motion.button
              className="text-blue-500 hover:text-blue-600"
              whileTap={{ scale: 0.93, x: 3, y: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={handleSend}
            >
              <Send size={22} />
            </motion.button>
          </div>

          {/* Quick Prompts */}
          <div className="flex gap-2 flex-wrap justify-start mt-3">
            {["Where is Wen AI?", "Do a swap for me?", "Do a bridge for me?"].map(
              (prompt, i) => (
                <button
                  key={i}
                  className="border border-white/30 text-white px-4 py-1.5 rounded-full text-sm hover:bg-white/10 transition"
                  onClick={() => {
                    setInput(prompt);
                    handleSend();
                  }}
                >
                  {prompt}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Subtle Footer */}
      <div className="fixed bottom-2 w-full flex justify-center text-xs text-white/40 z-40">
        Wen AI v1.0 is on the way.
      </div>
    </div>
  );
}
