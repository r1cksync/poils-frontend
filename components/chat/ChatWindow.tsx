'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Upload, Menu, FileText } from 'lucide-react';
import { Chat, chatService } from '@/lib/chat';
import { documentService } from '@/lib/document';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

interface ChatWindowProps {
  chat: Chat | null;
  onNewChat: (message: string) => Promise<Chat | undefined>;
  onUpdateChat: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function ChatWindow({
  chat,
  onNewChat,
  onUpdateChat,
  sidebarOpen,
  onToggleSidebar,
}: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    try {
      if (!chat) {
        // Create new chat
        await onNewChat(userMessage);
      } else {
        // Send message to existing chat
        await chatService.sendMessage(chat.id, { message: userMessage });
        onUpdateChat();
      }
    } catch (error) {
      toast.error('Failed to send message');
      setMessage(userMessage); // Restore message on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setUploadingFile(true);
    try {
      const response = await documentService.uploadDocument(file, chat?.id);
      if (response.success) {
        toast.success('Document uploaded successfully');
        // TODO: Trigger OCR processing notification
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to upload document';
      toast.error(errorMessage);
    } finally {
      setUploadingFile(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-4 py-3 flex items-center gap-3">
        {!sidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={20} />
          </button>
        )}
        <h1 className="text-lg font-semibold text-gray-900">
          {chat ? chat.title : 'New Chat'}
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!chat || chat.messages?.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <FileText size={32} className="text-primary-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Hindi OCR System
              </h2>
              <p className="text-gray-600 mb-4">
                Upload government documents for Hindi text extraction
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>• Supports handwritten and printed Hindi text</p>
                <p>• Process FIRs, witness statements, court orders</p>
                <p>• AI-powered document analysis</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {chat.messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-3xl px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <ReactMarkdown className="prose prose-sm max-w-none">
                    {msg.content}
                  </ReactMarkdown>
                  <p
                    className={`text-xs mt-2 ${
                      msg.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingFile}
            className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            title="Upload document"
          >
            {uploadingFile ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
            ) : (
              <Upload size={20} />
            )}
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message or upload a document..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Upload images or PDFs of Hindi documents for text extraction
        </p>
      </div>
    </div>
  );
}
