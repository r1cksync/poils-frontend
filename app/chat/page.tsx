'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/chat/Sidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import { chatService, Chat } from '@/lib/chat';
import toast from 'react-hot-toast';

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [loadingChats, setLoadingChats] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      loadChats();
    }
  }, [user, loading, router]);

  const loadChats = async () => {
    try {
      const response = await chatService.getChats();
      if (response.success) {
        setChats(response.data.chats);
      }
    } catch (error) {
      toast.error('Failed to load chats');
    } finally {
      setLoadingChats(false);
    }
  };

  const handleNewChat = async (message: string) => {
    try {
      const response = await chatService.createChat({ message });
      if (response.success) {
        const newChat = response.data.chat;
        setChats([newChat, ...chats]);
        setCurrentChat(newChat);
        return newChat;
      }
    } catch (error) {
      toast.error('Failed to create chat');
    }
  };

  const handleSelectChat = async (chatId: string) => {
    try {
      const response = await chatService.getChat(chatId);
      if (response.success) {
        setCurrentChat(response.data.chat);
      }
    } catch (error) {
      toast.error('Failed to load chat');
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      await chatService.deleteChat(chatId);
      setChats(chats.filter((chat) => chat.id !== chatId));
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
      }
      toast.success('Chat deleted');
    } catch (error) {
      toast.error('Failed to delete chat');
    }
  };

  if (loading || loadingChats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        chats={chats}
        currentChatId={currentChat?.id}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onNewChat={() => setCurrentChat(null)}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <ChatWindow
        chat={currentChat}
        onNewChat={handleNewChat}
        onUpdateChat={() => loadChats()}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  );
}
