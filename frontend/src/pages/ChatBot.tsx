import React, { useState } from "react";
import "boxicons";
export function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "This is a bot response.", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion); // Populate the input field with the suggestion
  };

  return (
    <div className="flex h-screen bg-[#e6e2ce]">
      {/* Left Panel (Optional for Desktop) */}
      <div className="hidden md:block w-1/4 bg-[#e6e2ce] p-4 border-r border-gray-200">
        <h2 className="text-lg font-bold mb-4" style={{ color: "#537f49" }}>
          Quick Actions
        </h2>
        <ul>
          <li className="mb-2" style={{ color: "#537f49" }}>
            Recent Queries
          </li>
          <li style={{ color: "#537f49" }}>Settings</li>
        </ul>
      </div>

      {/* Right Panel (Main Chat Interface) */}
      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <header className="p-4 bg-white border-b border-gray-200 bg-[#f7efe0]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold" style={{ color: "#537f49" }}>
                AyurBot – Your Ayurvedic Guide
              </h1>
            </div>
          </div>
        </header>

        {/* Chat Window */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                style={{
                  backgroundColor:
                    msg.sender === "user" ? "#4f7942" : "#f7efe1",
                  color: msg.sender === "user" ? "white" : "#537f49",
                }}
                className="p-3 rounded-lg max-w-[70%]"
              >
                <p>{msg.text}</p>
                <span
                  className={`text-xs ${
                    msg.sender === "user" ? "text-gray-200" : "text-gray-500"
                  }`}
                >
                  10:00 AM
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200 bg-[#f7efe0]">
          <div className="flex space-x-2 overflow-x-auto mb-2">
            {[
              "Find Ayurvedic remedies for headaches",
              "Suggest a diet for Pitta Dosha",
              "Explain the benefits of Ashwagandha",
            ].map((prompt, index) => (
              <button
                key={index}
                className="whitespace-nowrap p-2 bg-gray-100 rounded-lg text-sm"
                style={{ color: "#537f49" }}
                onClick={() => handleSuggestionClick(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask anything about Ayurveda…"
              className="flex-1 p-2 border border-gray-300 rounded-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="p-2 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center"
              style={{ backgroundColor: "#59804c" }}
              onClick={handleSend}
            >
              <box-icon name="send"></box-icon>
            </button>
          </div>
          <div className="flex space-x-4 mt-2">
            <button style={{ color: "#537f49" }}>
              <box-icon name="microphone"></box-icon>
            </button>
            <button style={{ color: "#537f49" }}>
              <box-icon name="paperclip"></box-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}