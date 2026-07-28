'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { messageService } from '../../services/messageService';
import { Send, Check, CheckCheck, Paperclip, Smile } from 'lucide-react';
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
    <div className="flex flex-col h-[600px] glass-panel rounded-2xl border border-slate-800/80 overflow-hidden">
      {/* Recipient Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={recipient?.avatar} alt={recipient?.name} className="w-10 h-10 rounded-full object-cover border border-blue-500/40" />
          <div>
            <h4 className="text-sm font-bold text-white">{recipient?.name}</h4>
            <p className="text-xs text-blue-400 font-medium">{recipient?.role}</p>
          </div>
        </div>
        {isTyping && <span className="text-xs text-emerald-400 font-semibold animate-pulse">Typing...</span>}
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-12">No messages yet. Send a message to start conversing.</p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId?._id === user?.id || msg.senderId === user?.id;
            return (
              <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs shadow-md ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-bl-none'
                  }`}
                >
                  <p>{msg.content}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] opacity-75">
                    <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {isMe && (msg.isRead ? <CheckCheck className="w-3 h-3 text-emerald-300" /> : <Check className="w-3 h-3" />)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Box */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-900/60 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 glass-input rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-blue-500/50"
        />
        <Button type="submit" variant="primary" size="sm">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
