# Mono Todo

A minimalist, monochrome task management application.

## Features

- **Multiple Lists**: Organize tasks into separate lists
- **Task Management**: Add, edit, complete, and delete tasks
- **Star Important Tasks**: Mark tasks as important for quick reference
- **Due Dates**: Set deadlines for your tasks
- **Notes**: Add detailed notes to any task
- **Hide Completed**: Toggle visibility of completed tasks

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build

```bash
npm run build
```

## Usage

### Managing Lists

- Click the **+** button in the sidebar to create a new list
- Click a list name to switch to it
- Hover over a list and click the trash icon to delete it

### Managing Tasks

- Type in the input field and press Enter to add a task
- Click the checkbox to mark a task as complete
- Click the star icon to mark a task as important
- Click the chevron icon to expand task details (due date, notes)
- Hover over a task to reveal edit and delete options
- Double-click task text to edit inline

### Filtering

- Click the eye icon in the header to hide or show completed tasks

## Data Persistence

All data is stored in your browser's local storage. Your tasks will persist across sessions.

## Technology

Built with React and Vite.
