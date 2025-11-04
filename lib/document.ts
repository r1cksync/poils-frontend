import api from './api';

export interface Document {
  _id: string;
  userId: string;
  chatId?: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  s3Key: string;
  s3Url: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  extractedText?: string;
  processedData?: any;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
  signedUrl?: string;
}

export const documentService = {
  async getDocuments(): Promise<{ success: boolean; data: { documents: Document[] } }> {
    const response = await api.get('/api/documents');
    return response.data;
  },

  async getDocument(id: string): Promise<{ success: boolean; data: { document: Document } }> {
    const response = await api.get(`/api/documents/${id}`);
    return response.data;
  },

  async uploadDocument(
    file: File,
    chatId?: string
  ): Promise<{ success: boolean; data: { document: Document } }> {
    const formData = new FormData();
    formData.append('file', file);
    if (chatId) {
      formData.append('chatId', chatId);
    }

    const response = await api.post('/api/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteDocument(id: string): Promise<{ success: boolean }> {
    const response = await api.delete(`/api/documents/${id}`);
    return response.data;
  },
};
