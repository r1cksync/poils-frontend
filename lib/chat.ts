import api from './api';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  messageCount?: number;
  lastMessage?: string;
  messages?: Message[];
  createdAt: string;
  updatedAt: string;
}

export const chatService = {
  async getChats(): Promise<{ success: boolean; data: { chats: Chat[] } }> {
    const response = await api.get('/api/chats');
    return response.data;
  },

  async getChat(id: string): Promise<{ success: boolean; data: { chat: Chat } }> {
    const response = await api.get(`/api/chats/${id}`);
    return response.data;
  },

  async createChat(data: {
    message: string;
    title?: string;
  }): Promise<{ success: boolean; data: { chat: Chat } }> {
    const response = await api.post('/api/chats', data);
    return response.data;
  },

  async updateChat(
    id: string,
    data: { message?: string; title?: string; role?: string }
  ): Promise<{ success: boolean; data: { chat: Chat } }> {
    const response = await api.put(`/api/chats/${id}`, data);
    return response.data;
  },

  async sendMessage(
    id: string,
    data: { message: string; documentId?: string }
  ): Promise<{ success: boolean; data: { message: string; chat: Chat } }> {
    const response = await api.post(`/api/chats/${id}/message`, data);
    return response.data;
  },

  async deleteChat(id: string): Promise<{ success: boolean }> {
    const response = await api.delete(`/api/chats/${id}`);
    return response.data;
  },
};
