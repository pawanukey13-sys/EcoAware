import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";
 import Toggletheme from "../../Component/Toggeltheme/Themetoggle";

const API_URL = `${import.meta.env.VITE_API_URL}/api/chat`;
const suggestions = [
  "What is climate change",
  "Why forests are important",
  "How plastic is affecting oceans",
  "What is biodiversity loss",
  "How i can help for conserving environment",
];
function getSessionId() {
  let sessionId = localStorage.getItem("ecobot_session");
  if (!sessionId) {
    sessionId =
      "session_" + Date.now() + "_" + Math.random().toString().slice(2);

    localStorage.setItem("ecobot_session", sessionId);
  }
  return sessionId;
}

export default function Chatbot() {
  const [messages, setMessage] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm EcoBot 🌿 Your environmental awareness assistant. Ask me anything about climate change, deforestation, plastic pollution, or how you can help the planet!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [sessionId] = useState(getSessionId);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) =>
        prev == suggestions.length - 1 ? 0 : prev + 1,
      );
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  const sendMessage = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage || loading) return;
    setMessage((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Server error");
      }
      setMessage((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error("Ecobot Error:", err);
      setMessage((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry i couldn't connect right now",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };
  // console.log(messages);
  // console.log(Array.isArray(messages));
  const handlekeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const clearChat = () => {
    localStorage.removeItem("ecobot_session");
    window.location.reload();
  };
  // console.log("Rendering Chatbot"); console.log(messages);
  // console.log("messages:", messages);
  // console.log("length:", messages?.length);
  return (
    <div className="chatbot-page">
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="bot-avatar">🌿</div>
          <div>
            <h1 className="chat-title">
              Eco <span>Bot</span>
            </h1>
            <p className="chat-status">Online Environmental AI Assistant</p>
          </div>
        </div>
        <div className="header-action">
          
          <Toggletheme />
          <button
            className="clear-btn"
            onClick={clearChat}
            title="Start New Converstation"
          >
            New Chat
          </button>
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-message">
          {messages?.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.role}`}>
              {msg.role === "assistant" && <div className="msg-avatar">🤖</div>}
              <div className={`msg-bubble ${msg.role}`}>{msg.content}</div>
            </div>
          ))}
          {/* Typing indicator  */}
          {loading && (
            <div className="message-row-assistant">
              <div className="msg-avatar">🤖</div>
              <div className="message-bubble-typing">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        {/* txt area */}
        <div className="input-wraper">
          <div className="chat-area">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={handlekeyDown}
              placeholder={suggestions[placeholderIndex]}
              rows={1}
              className="chat-input"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="send-btn"
            >
              {loading ? "..." : "⬆️"}
            </button>
          </div>
        </div>

        <p className="input-hint">Enter to send. shift+Enter for new line</p>
      </div>
    </div>
  );
}
