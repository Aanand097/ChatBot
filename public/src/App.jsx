// App.jsx

import { useState, useRef, useEffect } from "react";
import {
  FiSend,
  FiMenu,
  FiPlus,
  FiMoon,
  FiSun,
} from "react-icons/fi";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello 👋 How can I help you today?",
    },
  ]);

  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "This is AI response demo 🤖",
        },
      ]);
    }, 1000);

    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div
      className={`h-screen flex ${
        darkMode ? "bg-[#0f172a]" : "bg-gray-100"
      }`}
    >
      {/* SIDEBAR */}
      <div
        className={`w-[280px] hidden md:flex flex-col border-r ${
          darkMode
            ? "bg-[#111827] border-gray-800"
            : "bg-white border-gray-300"
        }`}
      >
        {/* Top */}
        <div className="p-4">
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              darkMode
                ? "bg-[#1e293b] hover:bg-[#334155] text-white"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            }`}
          >
            <FiPlus />
            New Chat
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          {["React Help", "JavaScript", "AI Project"].map(
            (chat, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl cursor-pointer transition ${
                  darkMode
                    ? "hover:bg-[#1e293b] text-gray-300"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {chat}
              </div>
            )
          )}
        </div>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl ${
              darkMode
                ? "bg-[#1e293b] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <div
          className={`h-[70px] border-b flex items-center justify-between px-5 ${
            darkMode
              ? "bg-[#111827] border-gray-800"
              : "bg-white border-gray-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              className={`md:hidden text-2xl ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              <FiMenu />
            </button>

            <h1
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              AI Chatbot
            </h1>
          </div>

          <select
            className={`px-4 py-2 rounded-lg outline-none ${
              darkMode
                ? "bg-[#1e293b] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <option>GPT-4</option>
            <option>DeepSeek</option>
            <option>Llama 3</option>
          </select>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-5 py-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "bg-[#1e293b] text-gray-200"
                    : "bg-white text-black"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div
          className={`p-4 border-t ${
            darkMode
              ? "bg-[#111827] border-gray-800"
              : "bg-white border-gray-300"
          }`}
        >
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              className={`flex-1 px-5 py-4 rounded-2xl outline-none ${
                darkMode
                  ? "bg-[#1e293b] text-white placeholder-gray-400"
                  : "bg-gray-100 text-black"
              }`}
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl transition"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}