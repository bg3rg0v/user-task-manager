Tech stack:
React 18+ with TypeScript
Redux and Redux Toolkit for state management
React Context API for posts management
Ant Design for UI components
React Router for navigation
JSONPlaceholder API for backend data

Installation:
# Clone the repository
git clone https://github.com/yourusername/user-task-manager.git

# Navigate to the project directory
cd user-task-manager

# Install dependencies
npm install

# Start the development server
npm run dev

Project Structure:
src/
├── components/
│   ├── features/      # Feature-specific components
│   │   ├── Posts/     # Post-related components
│   │   ├── Tasks/     # Task-related components
│   │   └── Users/     # User-related components
│   └── ui/            # Shared UI components
├── context/           # React Context providers
├── hooks/             # Custom React hooks
├── lib/               # Utilities and interfaces
├── pages/             # Page components
├── store/             # Redux store configuration
│   ├── features/      # Redux slices
│   └── hooks.ts       # Redux hooks
├── constants.ts       # Application constants
└── main.tsx           # Application entry point