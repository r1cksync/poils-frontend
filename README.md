# Hindi OCR System - Next.js Frontend

Modern, responsive frontend for the Hindi OCR system built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🔐 **Authentication** - Login/Signup with JWT tokens
- 💬 **ChatGPT-like Interface** - Familiar chat experience
- 📜 **Chat History** - Sidebar with all past conversations
- 📤 **Document Upload** - Drag-and-drop file upload
- 🔒 **Protected Routes** - Automatic authentication checks
- 📱 **Mobile Responsive** - Works on all devices
- 🎯 **Real-time Updates** - Instant message display

## Prerequisites

- Node.js 18+ and npm
- Backend API running on port 3001

## Installation

1. **Install dependencies:**
   ```powershell
   npm install
   ```

2. **Create environment file:**
   ```powershell
   Copy-Item .env.example .env.local
   ```

3. **Configure environment variables in `.env.local`:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_ENV=development
   ```

## Running the Application

**Development mode:**
```powershell
npm run dev
```

The app will start on `http://localhost:3000`

**Production build:**
```powershell
npm run build
npm start
```

## Pages

### Public Routes
- `/` - Home (redirects to /chat or /login)
- `/login` - User login
- `/signup` - User registration

### Protected Routes
- `/chat` - Main chat interface (requires authentication)

## Features

### Authentication
- Email/password registration
- Secure login with JWT
- Automatic token management
- Protected route handling
- Session persistence

### Chat Interface
- Create new conversations
- View chat history in sidebar
- Send and receive messages
- Delete old conversations
- Real-time message updates
- Markdown support for responses

### Document Upload
- Upload images (JPEG, PNG, WebP)
- Upload PDF files
- File size validation (max 10MB)
- Progress indication
- Integration with OCR backend

## Components

### Layout Components
- `AuthContext` - Global authentication state
- `Sidebar` - Navigation and chat history
- `ChatWindow` - Main chat interface

### Features
- Responsive sidebar with mobile support
- Message bubbles with timestamps
- File upload with preview
- Loading states and error handling
- Toast notifications

## API Integration

The frontend communicates with the Next.js backend:

```typescript
// Authentication
- POST /api/auth/login
- POST /api/auth/signup
- POST /api/auth/logout
- GET /api/auth/me

// Chats
- GET /api/chats
- POST /api/chats
- GET /api/chats/[id]
- PUT /api/chats/[id]
- DELETE /api/chats/[id]
- POST /api/chats/[id]/message

// Documents
- GET /api/documents
- POST /api/documents
- GET /api/documents/[id]
- DELETE /api/documents/[id]
```

## Styling

Built with Tailwind CSS for:
- Responsive design
- Dark/light theme support
- Custom color palette
- Animation utilities
- Typography plugin for markdown

## State Management

- React Context for authentication
- Local state with hooks
- JWT token in cookies
- Automatic token refresh

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/
│   │   └── page.tsx       # Login page
│   ├── signup/
│   │   └── page.tsx       # Signup page
│   └── chat/
│       └── page.tsx       # Chat page
├── components/
│   └── chat/
│       ├── Sidebar.tsx    # Chat sidebar
│       └── ChatWindow.tsx # Chat window
├── context/
│   └── AuthContext.tsx    # Auth context
├── lib/
│   ├── api.ts             # Axios configuration
│   ├── auth.ts            # Auth service
│   ├── chat.ts            # Chat service
│   └── document.ts        # Document service
└── package.json
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3001)
- `NEXT_PUBLIC_ENV` - Environment (development/production)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Development

**Key technologies:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls
- React Hot Toast for notifications
- Lucide React for icons
- React Markdown for message rendering

## Future Enhancements

- File preview before upload
- Document status tracking
- OCR result visualization
- Search in chat history
- Export conversations
- Dark mode toggle
- Multi-language support

## License

MIT
