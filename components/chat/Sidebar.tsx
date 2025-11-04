'use client';

import { LogOut, MessageSquarePlus, Trash2, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Chat } from '@/lib/chat';

interface SidebarProps {
  chats: Chat[];
  currentChatId?: string;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  chats,
  currentChatId,
  onSelectChat,
  onDeleteChat,
  onNewChat,
  isOpen,
  onToggle,
}: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Hindi OCR</h2>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg"
            >
              <Menu size={20} />
            </button>
          </div>
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
          >
            <MessageSquarePlus size={20} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto p-2">
          {chats.length === 0 ? (
            <div className="text-center text-gray-400 mt-4 px-2">
              <p className="text-sm">No chats yet</p>
              <p className="text-xs mt-1">Start a new conversation</p>
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={`group relative mb-2 p-3 rounded-lg cursor-pointer transition-colors ${
                  currentChatId === chat.id
                    ? 'bg-gray-800'
                    : 'hover:bg-gray-800'
                }`}
                onClick={() => onSelectChat(chat.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{chat.title}</p>
                    {chat.lastMessage && (
                      <p className="text-xs text-gray-400 truncate mt-1">
                        {chat.lastMessage}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {chat.messageCount || 0} messages
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-opacity"
                    title="Delete chat"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
