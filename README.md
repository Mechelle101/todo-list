# Todo List

A React todo application for creating, tracking, and completing tasks. Users log in, add todos, mark them complete, edit titles inline, and filter, search, and sort their list. Built as the final project for the Code the Dream React course.

## Live Demo

This project is not currently deployed. To run it locally, see [Getting Started](#getting-started).

## Screenshots

**Desktop**

![Todo list on desktop](./screenshots/desktop.png)

**Mobile**

![Todo list on mobile](./screenshots/mobile.png)

## Features

- Log in and log off with a protected todos view
- Add new todos with validation (required, 100-character limit)
- Mark todos complete with a checkbox
- Edit a todo title inline by clicking it
- Delete a todo by clicking the button, alert pops up to varify the action
- Filter by status: All, Active, or Completed (stored in the URL)
- Search todos by title with debounced input
- Sort by title or creation date, ascending or descending
- Profile page with completion statistics
- Loading, error, and empty states for every data operation
- Responsive, mobile-first layout with keyboard-accessible controls

## Technologies Used

- **React 19** — components, hooks, `useReducer` for todo state, Context API for auth
- **React Router 8** — client-side routing, protected routes, URL search params
- **Vite** — dev server, proxy, and production build
- **Plain CSS** — design tokens and component classes in two files
- **ESLint + Prettier** — linting and formatting
- **Code the Dream Task API** — backend for authentication and todo persistence

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm (comes with Node)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Mechelle101/todo-list.git
cd todo-list
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

The dev server proxies `/api/*` requests to the Code the Dream backend, so no environment variables are required to run locally.

## Available Scripts

| Script            | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server with hot reload   |
| `npm run build`   | Builds the production bundle into `dist/`            |
| `npm run preview` | Serves the production build locally for testing      |
| `npm run lint`    | Runs ESLint across the project                       |

## Design Decisions

I chose plain CSS in two files — `index.css` for design tokens (colors, spacing, type scale) and base element styles, and `App.css` for component classes — to keep the styling simple and easy to trace. Readability drove the choices: a warm, low-glare palette, a system font stack, generous spacing, and text/background pairs that meet WCAG AA contrast. The layout is mobile-first: the base styles are a single stacked column, and a `min-width` breakpoint introduces row layouts once there's room. All buttons and inputs have a 44px minimum height for touch, and keyboard users get a visible focus.

On the security side, all user text is validated on the client (required, trimmed, length-limited) before it is sent to the API, and error messages shown to users are fixed strings rather than raw server responses.

## Future Improvements

- Dark/light theme toggle using the existing design tokens
- Persist the last-used filter and sort preferences
- Deploy to a static host

## License

This project is licensed under the [MIT License](./LICENSE).

## Contact

Mechelle Presnell — [github.com/Mechelle101](https://github.com/Mechelle101)
