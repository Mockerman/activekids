// src/components/Communication/Chat.js
import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await API.get('/message');
      setMessages(res.data);
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    try {
      const res = await API.post('/message', { content: newMessage });
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg._id}>
            <strong>{msg.sender}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nachricht eingeben..."
        />
        <button onClick={handleSendMessage}>Senden</button>
      </div>
    </div>
  );
};

export default Chat;
