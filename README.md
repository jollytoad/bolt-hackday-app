# TodoFlow

A beautiful, modern todo list application built with React, TypeScript, and Tailwind CSS.

## Features

- ✨ Beautiful, modern UI with glassmorphism effects
- 📱 Fully responsive design
- 🎯 Filter tasks by status (All, Active, Completed)
- ✏️ Inline editing of tasks
- 📊 Progress tracking with visual progress bar
- 💾 Local storage persistence
- 🎨 Smooth animations and micro-interactions
- ♿ Accessible design

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd todoflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
src/
├── components/          # React components
│   ├── EmptyState.tsx   # Empty state component
│   ├── TodoFilters.tsx  # Filter and stats component
│   ├── TodoForm.tsx     # Add todo form
│   └── TodoItem.tsx     # Individual todo item
├── hooks/               # Custom React hooks
│   └── useTodos.ts      # Todo management logic
├── types/               # TypeScript type definitions
│   └── todo.ts          # Todo-related types
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Features in Detail

### Task Management
- Add new tasks with the input field
- Mark tasks as complete/incomplete by clicking the checkbox
- Edit tasks by clicking on the task text
- Delete tasks using the trash icon

### Filtering
- **All Tasks**: View all tasks regardless of status
- **Active**: View only incomplete tasks
- **Completed**: View only completed tasks

### Bulk Actions
- **Check All**: Mark all tasks as complete
- **Uncheck All**: Mark all tasks as incomplete
- **Clear Completed**: Remove all completed tasks

### Data Persistence
All tasks are automatically saved to your browser's local storage, so your data persists between sessions.

## Deployment

The application is deployed and available at: [Your Deployment URL]

To deploy your own version:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your preferred hosting service (Netlify, Vercel, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)