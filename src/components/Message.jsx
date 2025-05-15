import React, { useState } from "react";
import "../styles/Message.css"; 

const MessagesPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Alice", text: "Hey there!" },
    { id: 2, sender: "You", text: "Hi! How are you?" },
    { id: 3, sender: "Alice", text: "Doing good. Let's catch up!" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: Date.now(), sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="messages-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Chats</h2>
        <div className="chat-list">
          <div className="chat-item">
            <div className="chat-avatar"></div>
            <div>
              <p className="chat-name">Alice</p>
              <p className="chat-last-message">Last message...</p>
            </div>
          </div>
          <div className="chat-item">
            <div className="chat-avatar"></div>
            <div>
              <p className="chat-name">Bob</p>
              <p className="chat-last-message">Hey, are you there?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-avatar"></div>
          <div>
            <h3>Alice</h3>
            <p className="chat-status">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender === "You" ? "sent" : "received"}`}>
              <div className="message-text">{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
