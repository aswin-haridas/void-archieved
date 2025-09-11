# Void - Serverless Search Interface

A modern, serverless search interface built with Next.js that provides intelligent search suggestions and seamless navigation.

## ✨ Features

- **🔍 Smart Search**: Real-time search suggestions with intelligent autocomplete
- **⌨️ Keyboard Navigation**: Full keyboard support for power users
- **💾 Local Storage**: Search history persisted in browser localStorage
- **🎨 Modern UI**: Clean, responsive design with Tailwind CSS
- **⚡ Serverless**: No external server dependencies - runs entirely in the browser
- **🚀 Fast**: Optimized bundle size and performance

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **localStorage** - Client-side data persistence

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd void
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build & Deploy

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/void)

## 🎯 Usage

1. **Search**: Type your query in the search box
2. **Navigate**: Use arrow keys to navigate through suggestions
3. **Select**: Press Enter or click to select a suggestion
4. **History**: Your search history is automatically saved and used for autocomplete

### Search Prefixes

- `!` - Direct site navigation (e.g., `!github.com`)
- `@images` - Google Images search
- `@youtube` or `@yt` - YouTube search

## 🏗️ Architecture

This application is built to be completely serverless:

- **No Backend**: All functionality runs in the browser
- **Mock Data**: Intelligent search suggestions using predefined data
- **localStorage**: Search history persisted locally
- **Static Generation**: Fully static build for optimal performance

## 📁 Project Structure

```
void/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── Background.tsx     # Background component
│   ├── SearchForm.jsx     # Search form
│   ├── SearchInput.jsx    # Search input with autocomplete
│   └── ThoughtList.jsx    # Suggestions list
├── hooks/                 # Custom React hooks
│   ├── useAutocomplete.js # Autocomplete logic
│   ├── useHistory.js      # Search history management
│   ├── useKeyboardNavigation.js # Keyboard navigation
│   ├── useThoughts.js     # Search suggestions
│   ├── useUrlFetcher.js   # URL management
│   └── useWebsocket.js    # Mock WebSocket (serverless)
├── utils/                 # Utility functions
│   ├── axios.js          # Fetch API wrapper
│   └── search.js         # Search logic
└── constants/            # App constants
    └── index.js          # Search prefixes and placeholders
```

## 🔧 Customization

### Adding New Search Suggestions

Edit `hooks/useWebsocket.js` to add new search terms and their suggestions:

```javascript
const MOCK_THOUGHTS = {
  "your-term": "suggestion1, suggestion2, suggestion3",
  // ... more terms
};
```

### Styling

The app uses Tailwind CSS. Modify `app/globals.css` for global styles or add Tailwind classes to components.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
