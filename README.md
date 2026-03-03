# Social Media Content Alchemist 🧙‍♂️✨

**Transform your ideas into viral social media magic.** Content Alchemist uses the power of Google Gemini AI to transmute simple topics into platform-optimized, high-engagement posts for all major social networks.

## ✨ Key Features

- **7-in-1 Platform Support**: Tailored content for LinkedIn, Twitter (X), Instagram, Facebook, TikTok, YouTube, and Threads.
- **AI-Powered Transmutation**: Powered by `gemini-2.5-flash` for rapid, high-quality content generation.
- **Premium Glassmorphic UI**: A stunning, modern interface with a dynamic WebGL shader background.
- **Tone & Context Control**: Fine-tune your output by providing specific tone or context (e.g., "Funny", "Professional", "Controversial").
- **One-Click Magic**: Easily copy generated content to your clipboard with a single click.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Modern & Fast)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visuals**: WebGL Shader Background

### Backend
- **Server**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **AI Engine**: [Google Generative AI SDK](https://ai.google.dev/)
- **Environment**: [Dotenv](https://www.npmjs.com/package/dotenv) for secure configuration

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- A Google Gemini API Key. Get one for free at [Google AI Studio](https://aistudio.google.com/app/apikey).

### 2. Configuration
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
```

### 3. Installation
Install dependencies for both the root (backend) and the client (frontend):
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

### 4. Running the Alchemist
Launch both the server and the frontend simultaneously from the root directory:
```bash
npm run full-dev
```
- **Dashboard**: `http://localhost:5173`
- **API (Local)**: `http://localhost:5000`

---

## 🪄 How to Use

1. **Enter your Topic**: Type what you want your post to be about.
2. **Select Platform**: Choose the target social network (e.g., LinkedIn for professional outreach, Twitter for viral hooks).
3. **Add Context**: Specify the vibe—funny, professional, concise, etc.
4. **Alchemize**: Hit **GENERATE CONTENT** and watch the magic happen.
