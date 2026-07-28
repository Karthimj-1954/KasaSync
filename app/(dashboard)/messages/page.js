'use client';

import React, { useState, useEffect } from 'react';
import ChatWindow from '@/components/chat/ChatWindow';
import { authService } from '@/services/authService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { MessageSquare, Users } from 'lucide-react';

export default function MessagesPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getUsers().then((data) => {
      const userList = data.users || [];
      setUsers(userList);
      if (userList.length > 0) {
        setSelectedUser(userList[0]);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white">Real-Time Messaging Hub</h2>
        <p className="text-xs text-slate-400">Direct communication between Tenants, Owners, and Maintenance Staff</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Contact List */}
        <Card className="md:col-span-1 p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" /> Contacts & Channels
          </h4>
          <div className="space-y-2">
            {loading ? (
              <p className="text-xs text-slate-400 text-center py-4">Loading contacts...</p>
            ) : (
              users.map((u) => (
                <button
                  key={u._id}
                  onClick={() => setSelectedUser(u)}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition text-left ${
                    selectedUser?._id === u._id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-900/50 hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover border border-white/20" />
                  <div className="overflow-hidden">
                    <h5 className="text-xs font-bold truncate">{u.name}</h5>
                    <p className="text-[10px] opacity-80">{u.role}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>

        {/* Chat Window */}
        <div className="md:col-span-2">
          {selectedUser ? (
            <ChatWindow recipient={selectedUser} />
          ) : (
            <Card className="text-center py-20">
              <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-xs text-slate-400">Select a contact to start messaging.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
