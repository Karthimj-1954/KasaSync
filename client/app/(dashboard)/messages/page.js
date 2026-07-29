'use client';

import React, { useState, useEffect } from 'react';
import ChatWindow from '../../../components/chat/ChatWindow';
import { authService } from '../../../services/authService';
import { Card } from '../../../components/ui/Card';
import { Users } from 'lucide-react';

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
        <h2 className="text-2xl font-bold text-[#1F3A5F] font-poppins">Real-Time Messaging Hub</h2>
        <p className="text-xs text-[#6B7A90]">Direct communication between Tenants, Owners, and Maintenance Staff</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#34495E] mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#5E8FBF]" /> Contacts & Channels
          </h4>
          <div className="space-y-2">
            {loading ? (
              <p className="text-xs text-[#6B7A90] text-center py-4">Loading contacts...</p>
            ) : (
              users.map((u) => (
                <button
                  key={u._id}
                  onClick={() => setSelectedUser(u)}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition text-left cursor-pointer ${
                    selectedUser?._id === u._id ? 'bg-[#5E8FBF] text-white shadow-md' : 'bg-[#EAF3FA]/60 hover:bg-[#EAF3FA] text-[#183153]'
                  }`}
                >
                  <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover border border-[#C7D7EA]" />
                  <div className="overflow-hidden">
                    <h5 className="text-xs font-bold truncate font-poppins">{u.name}</h5>
                    <p className="text-[10px] opacity-80">{u.role}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>

        <div className="md:col-span-2">
          {selectedUser ? (
            <ChatWindow recipient={selectedUser} />
          ) : (
            <Card className="h-96 flex items-center justify-center text-[#6B7A90] text-xs font-semibold">
              Select a contact to begin messaging
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
