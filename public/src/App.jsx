// App.jsx

import { useState, useEffect, useRef } from "react";
import {
  FiSend,
  FiPlus,
  FiMenu,
  FiMoon,
  FiSun,
  FiTrash2,
  FiCopy,
  FiUser,
} from "react-icons/fi";
import {
  RiRobot2Line,
  RiMessage3Line,
} from "react-icons/ri";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hello Aanand! Welcome to your AI chatbot frontend.",
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

    setMessage("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "🤖 This is demo AI response. Backend API connect garepaxi real response aauxa.",
        },
      ]);

      setTyping(false);
    }, 1500);
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  return (
    <div
      className={`h-screen flex overflow-hidden ${
        darkMode
          ? "bg-[#0f172a]"
          : "bg-gray-100"
      }`}
    >
      {/* SIDEBAR */}

      <div
        className={`w-[300px] hidden md:flex flex-col border-r ${
          darkMode
            ? "bg-[#111827] border-gray-800"
            : "bg-white border-gray-300"
        }`}
      >
        {/* LOGO */}

        <div className="p-5 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-blue-500">
            Omni AI
          </h1>

          <p
            className={`text-sm mt-1 ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Smart AI Assistant
          </p>
        </div>

        {/* NEW CHAT */}

        <div className="p-4">
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <FiPlus />
            New Chat
          </button>
        </div>

        {/* HISTORY */}

        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          {[
            "React frontend help",
            "JavaScript error",
            "Create AI chatbot",
            "Tailwind CSS",
            "Portfolio website",
          ].map((chat, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                darkMode
                  ? "hover:bg-[#1e293b] text-gray-300"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              <RiMessage3Line />
              <span className="truncate">
                {chat}
              </span>
            </div>
          ))}
        </div>

        {/* BOTTOM */}

        <div className="p-4 border-t border-gray-800 space-y-3">
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl ${
              darkMode
                ? "bg-[#1e293b] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {darkMode ? (
              <FiSun />
            ) : (
              <FiMoon />
            )}

            {darkMode
              ? "Light Mode"
              : "Dark Mode"}
          </button>

          <button
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl ${
              darkMode
                ? "bg-red-500/20 text-red-400"
                : "bg-red-100 text-red-600"
            }`}
          >
            <FiTrash2 />
            Clear Chats
          </button>
        </div>
      </div>

      {/* MAIN CHAT */}

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
                darkMode
                  ? "text-white"
                  : "text-black"
              }`}
            >
              <FiMenu />
            </button>

            <div>
              <h2
                className={`font-bold text-lg ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }`}
              >
                AI Chatbot
              </h2>

              <p className="text-sm text-green-500">
                ● Online
              </p>
            </div>
          </div>

          {/* MODEL SELECT */}

          <select
            className={`px-4 py-2 rounded-xl outline-none ${
              darkMode
                ? "bg-[#1e293b] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <option>DeepSeek</option>
            <option>GPT-4</option>
            <option>Llama 3</option>
            <option>Gemini</option>
          </select>
        </div>

        {/* CHAT AREA */}

        <div className="flex-1 overflow-y-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
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
                  className={`flex gap-3 max-w-[85%] ${
                    msg.role === "user"
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >
                  {/* AVATAR */}

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : darkMode
                        ? "bg-[#1e293b] text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <FiUser />
                    ) : (
                      <RiRobot2Line />
                    )}
                  </div>

                  {/* MESSAGE */}

                  <div
                    className={`p-4 rounded-2xl shadow-lg relative group ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : darkMode
                        ? "bg-[#1e293b] text-gray-200"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="leading-relaxed text-sm whitespace-pre-wrap">
                      {msg.content}
                    </p>

                    {/* COPY BUTTON */}

                    <button
                      onClick={() =>
                        copyMessage(
                          msg.content
                        )
                      }
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                    >
                      <FiCopy size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* TYPING */}

            {typing && (
              <div className="flex gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode
                      ? "bg-[#1e293b] text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  <RiRobot2Line />
                </div>

                <div
                  className={`px-5 py-4 rounded-2xl ${
                    darkMode
                      ? "bg-[#1e293b]"
                      : "bg-white"
                  }`}
                >
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>

                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>

                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>
        </div>

        {/* INPUT */}

        <div
          className={`border-t p-4 ${
            darkMode
              ? "bg-[#111827] border-gray-800"
              : "bg-white border-gray-300"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div
              className={`flex items-center gap-3 p-3 rounded-2xl ${
                darkMode
                  ? "bg-[#1e293b]"
                  : "bg-gray-100"
              }`}
            >
              <textarea
                rows="1"
                placeholder="Message AI..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className={`flex-1 resize-none bg-transparent outline-none ${
                  darkMode
                    ? "text-white placeholder-gray-400"
                    : "text-black"
                }`}
              />

              <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl text-white"
              >
                <FiSend size={20} />
              </button>
            </div>

            <p
              className={`text-center text-xs mt-3 ${
                darkMode
                  ? "text-gray-500"
                  : "text-gray-500"
              }`}
            >
              AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}