"use client";

import { Check, Copy } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SuggestedPrompt {
  text: string;
  description: string;
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts: SuggestedPrompt[] = [
    {
      text: "What are the most popular skills being shared on Swapit?",
      description: "Explore trending skills",
    },
    {
      text: "How do I schedule a skill exchange session?",
      description: "Session scheduling",
    },
    {
      text: "How do I create an effective skill listing as an instructor?",
      description: "Create listing",
    },
    {
      text: "What happens during and after a learning session?",
      description: "Session flow",
    },
    {
      text: "How do I find and request sessions for skills I want to learn?",
      description: "Find sessions",
    },
    {
      text: "What should I include in my session request note?",
      description: "Request tips",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

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

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset copied state after 2 seconds
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto">
      <div className="flex-1 overflow-auto mb-4 border border-blue-200 rounded-[8px] p-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 my-8">
            <p className="mb-4">
              Welcome to SwapitAI! I can help you with learning, teaching, and
              managing your skill exchange sessions.
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt.text)}
                  className="text-left p-3 rounded-[8px] border border-blue-100 bg-white hover:bg-blue-50 transition-colors"
                >
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    {prompt.description}
                  </p>
                  <p className="text-sm text-gray-600">{prompt.text}</p>
                </button>
              ))}
            </div>
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
              <>
                <ReactMarkdown
                  components={{
                    // Style headers
                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold mb-2">{children}</h3>
                    ),
                    // Style bold text
                    strong: ({ children }) => (
                      <strong className="font-semibold">{children}</strong>
                    ),
                    // Style lists
                    ul: ({ children }) => (
                      <ul className="list-disc pl-4 my-2 space-y-1">
                        {children}
                      </ul>
                    ),
                    // Style list items
                    li: ({ children }) => (
                      <li className="text-gray-700">{children}</li>
                    ),
                    // Style horizontal rules
                    hr: () => <hr className="my-3 border-blue-100" />,
                    // Style paragraphs
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">{children}</p>
                    ),
                    // Style code blocks
                    code: ({ children }) => (
                      <code className="px-1 py-0.5 bg-gray-100 rounded text-sm">
                        {children}
                      </code>
                    ),
                    // Style emojis to prevent them from being too large
                    em: ({ children }) => (
                      <span className="text-base">{children}</span>
                    ),
                  }}
                  className="prose prose-blue max-w-none"
                >
                  {msg.content}
                </ReactMarkdown>
                <div className="flex justify-end mb-1">
                  <button
                    onClick={() => copyToClipboard(msg.content, index)}
                    className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                    aria-label="Copy message"
                  >
                    {copiedIndex === index ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4 text-green-500" />
                        Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="w-4 h-4" />
                        Copy
                      </span>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-700">{msg.content}</p>
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
          placeholder="Ask about learning, teaching, or managing your sessions..."
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
