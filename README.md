Search GitHub Users – GraphQL Web App

This project is a modern GitHub user-search interface built with React, TypeScript, Vite, and the GitHub GraphQL API. It provides fast user lookup, rich developer insights, repository analytics, and interactive UI components. The project structure emphasizes modularity, reusable components, and clean data-fetching patterns—ideal for learning GraphQL or building your own GitHub-based dashboards.

✨ Features

🔍 Search GitHub users with instant response using GraphQL

👤 User profiles with bio, avatar, followers, following

📦 Repository summaries with stars, forks, languages

📊 Charts & analytics for repo activity and language usage

♻️ Reusable UI components for charts, layouts, and cards

⚡ Vite + TypeScript for fast development and type-safe code

📁 Project Structure

```
src/
├── components/ # UI components, charts, cards
├── hooks/ # Custom hooks for data fetching
├── lib/ # GraphQL queries, API utilities
├── pages/ # Main views & routing logic
├── styles/ # Global styles, Tailwind config (if any)
└── types/ # Shared TypeScript types
```

🛠️ Tech Stack

React 18 + TypeScript

Vite

GitHub GraphQL API

Recharts / Chart.js (depending on your setup)

Tailwind / Shadcn (if included in your version)

🚀 Getting Started

```bash
#1. Install dependencies
   npm install

#2. Add your GitHub token

Create a .env file:

VITE_GITHUB_TOKEN=your_access_token_here

#3. Start development server
   npm run dev

#🔧 Build for Production
npm run build
npm run preview
```

📜 License

MIT License. You are free to use, modify, and distribute this project.

🤝 Collaboration

Pull requests and feature suggestions are welcome.
If you extend this project with new charts or API integrations, feel free to contribute back!
