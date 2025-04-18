# SendHelp Chat Application

## ถ้าฟิตฝากทำ
- Docker
- Config

## Overview

SendHelp is a real-time chat application built with modern web technologies. The project is structured as a monorepo using pnpm workspaces, with three main packages:

1. **@sendhelp/core** - Shared types and interfaces
2. **@sendhelp/server** - Backend server using Express.js and Socket.IO
3. **@sendhelp/web** - Frontend application built with Next.js and React

## Project Structure

```
2110471-project/
├── packages/
│   ├── core/               # Shared types and utilities
│   ├── server/             # Backend server
│   └── web/                # Frontend Next.js application
├── pnpm-workspace.yaml     # Workspace configuration
└── pnpm-lock.yaml          # Dependencies lock file
```

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js, Socket.IO, LowDB (for simple data persistence)
- **State Management**: Zustand
- **Build Tools**: TypeScript, pnpm

## Extra requirements

### Persistance message

Message does not disappear after the chat is closed or even when the server
is restarted.

## Getting Started

1. Make sure you have Node.js (>=18) and pnpm installed
2. Install dependencies:
   ```
   pnpm install
   ```

3. Start the development server:
   ```
   # In one terminal, start the backend
   cd packages/server
   pnpm start

   # In another terminal, start the frontend
   cd packages/web
   pnpm dev
   ```

4. Open your browser at http://localhost:3000

## Features

- Real-time messaging
- Create and join chat rooms
- Persistent message history
- Modern UI with Tailwind CSS

## Architecture

### Core

The core package contains shared TypeScript interfaces for messages, rooms, and other data structures used throughout the application.

### Server

The server is built with Express.js and uses Socket.IO for real-time communication. It stores data in a simple JSON database (LowDB). The server implements the following features:

- User authentication (basic implementation)
- Chat room creation and management
- Message broadcasting
- Persistent message storage

### Web

The web application is built with Next.js and React. It uses:

- Socket.IO Client for real-time communication
- Zustand for state management
- Tailwind CSS for styling
- shadcn/ui for UI components

## How to Contribute

1. Create a new branch for your feature:
   ```
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Test your changes:
   ```
   # Build and test server
   cd packages/server
   pnpm build
   pnpm start

   # Test web app
   cd packages/web
   pnpm dev
   ```

4. Commit your changes with a descriptive message

5. Push your branch and create a pull request

## Common Development Tasks

### Adding a New Feature to the Frontend

1. Update shared types in `packages/core/src/types.ts` if needed
2. Create new components in `packages/web/src/components`
3. Update state management in `packages/web/src/store.ts` if needed
4. Implement socket handlers in `packages/web/src/hooks/chat.ts` if needed

### Adding a New Backend Feature

1. Update shared types in `packages/core/src/types.ts` if needed
2. Create a new use case in `packages/server/src/usecases`
3. Implement socket handlers in `packages/server/src/index.ts`
4. Update database schema in `packages/server/src/db.ts` if needed

## Project Structure Details

### Core Package

- `src/types.ts`: Shared TypeScript interfaces

### Server Package

- `src/index.ts`: Main server entry point
- `src/db.ts`: Database configuration
- `src/usecases/`: Business logic separated by use case

### Web Package

- `src/app/`: Next.js app router and pages
- `src/components/`: React components
- `src/hooks/`: Custom React hooks
- `src/lib/`: Utility functions
- `src/store.ts`: Zustand store
- `src/socket.ts`: Socket.IO client configuration
