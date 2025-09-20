// ChatBox.jsx
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // your backend URL

const ChatBox = ({ userEmail, posterEmail }) => {
  const roomId = [userEmail, posterEmail].sort().join("-");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [roomId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    socket.emit("sendMessage", { roomId, sender: userEmail, message: newMessage });
    setNewMessage("");
  };

  return (
    <div className="border rounded p-3 w-full max-w-md flex flex-col">
      <div className="flex-1 overflow-y-auto mb-2 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${msg.sender === userEmail ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}
          >
            <strong>{msg.sender === userEmail ? "You" : "Seller"}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-3 py-1 rounded">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
