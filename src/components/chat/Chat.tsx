"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      // Add assistant message
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto">
      {/* <h1 className="text-2xl font-bold mb-4 text-blue-600">
        SwapitAI Assistant
      </h1> */}

      <div className="flex-1 overflow-auto mb-4 border border-blue-200 rounded-[8px] p-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 my-8">
            <p>
              Welcome to SwapitAI! Ask me about skill sharing, learning
              opportunities, or how to connect with peers.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-xl ${
              msg.role === "user"
                ? "bg-sky-1 ml-auto"
                : "bg-white border border-blue-100 mr-auto shadow-sm"
            } max-w-[80%]`}
          >
            {msg.role === "assistant" ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              msg.content
            )}
          </div>
        ))}

        {isLoading && (
          <div className="bg-white p-3 mr-auto max-w-[70px] rounded-xl border border-blue-100 shadow-sm flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-blue-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Ask about skill sharing, finding learning partners, or scheduling sessions..."
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="primary-btn px-4 py-2 disabled:bg-blue-300 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
