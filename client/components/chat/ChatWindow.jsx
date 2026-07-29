'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { messageService } from '../../services/messageService';
import { Send, Check, CheckCheck } from 'lucide-react';
import Button from '../ui/Button';

export default function ChatWindow({ recipient }) {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (recipient?._id) {
      messageService.getMessages(recipient._id).then((data) => {
        setMessages(data.messages || []);
      });
    }
  }, [recipient]);

  useEffect(() => {
    if (!socket) return;

    socket.on('message:receive', (newMessage) => {
      if (newMessage.senderId?._id === recipient?._id || newMessage.senderId === recipient?._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    socket.on('chat:typing', ({ senderId, isTyping: typing }) => {
      if (senderId === recipient?._id) {
        setIsTyping(typing);
      }
    });

    return () => {
      socket.off('message:receive');
      socket.off('chat:typing');
    };
  }, [socket, recipient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !recipient?._id) return;

    const content = inputText;
    setInputText('');

    try {
      const res = await messageService.sendMessage({
        receiverId: recipient._id,
        content,
      });
      setMessages((prev) => [...prev, res.message]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (socket && recipient?._id) {
      socket.emit('chat:typing', { receiverId: recipient._id, isTyping: e.target.value.length > 0 });
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-[20px] border border-[#EAF3FA] shadow-sm overflow-hidden">
      <div className="p-4 border-b border-[#EAF3FA] bg-[#F7FAFC] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={recipient?.avatar} alt={recipient?.name} className="w-10 h-10 rounded-full object-cover border border-[#C7D7EA]" />
          <div>
            <h4 className="text-sm font-bold text-[#183153] font-poppins">{recipient?.name}</h4>
            <p className="text-xs text-[#3E7CB1] font-semibold">{recipient?.role}</p>
          </div>
        </div>
        {isTyping && <span className="text-xs text-[#2E8B57] font-semibold animate-pulse">Typing...</span>}
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
        {messages.length === 0 ? (
          <p className="text-xs text-[#6B7A90] text-center py-12">No messages yet. Send a message to start conversing.</p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId?._id === user?.id || msg.senderId === user?.id;
            return (
              <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs shadow-sm ${
                    isMe
                      ? 'bg-[#5E8FBF] text-white rounded-br-none font-medium'
                      : 'bg-[#EAF3FA] text-[#183153] border border-[#C7D7EA] rounded-bl-none font-medium'
                  }`}
                >
                  <p>{msg.content}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] opacity-80">
                    <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {isMe && (msg.isRead ? <CheckCheck className="w-3 h-3 text-white" /> : <Check className="w-3 h-3" />)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-[#EAF3FA] bg-white flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 bg-white border-1.5 border-[#C7D7EA] text-[#1F2937] placeholder-[#94A3B8] rounded-[12px] px-4 py-2.5 text-xs focus:outline-none focus:border-[#7AA7D9] focus:ring-4 focus:ring-[#7AA7D9]/20"
        />
        <Button type="submit" variant="primary" size="sm">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
