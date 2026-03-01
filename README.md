# Liftory 🏋️

**Track. Lift. Evolve.**

Liftory is a fitness tracker web application built with React + Vite, powered by the [wger REST API](https://wger.de/api/v2). This is my capstone project demonstrating frontend development skills including component architecture, routing, API integration, and responsive UI design.

## 🚀 Features

- **User Authentication** – Sign up and log in with secure local session management
- **Exercise Library** – Browse and search thousands of exercises via the wger API
- **Workout Dashboard** – View your stats, streaks, and weekly progress
- **Responsive Design** – Works on desktop and mobile
- **Protected Routes** – Dashboard is only accessible when logged in

## 🛠️ Tech Stack

- **React 18** – UI library
- **React Router v6** – Client-side routing
- **Vite** – Build tool and dev server
- **wger REST API** – Exercise and nutrition data

## 📁 Project Structure
```
liftory/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── ExerciseCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   └── Logout.jsx
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
└── README.md
```

## ⚙️ Getting Started
```bash
git clone https://github.com/maryblessing-tech/liftory.git
cd liftory
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🌐 API Integration

Liftory uses the [wger Workout Manager API](https://wger.de/api/v2):

| Endpoint | Usage |
|----------|-------|
| `GET /api/v2/exercise/` | Fetch exercise list |
| `GET /api/v2/exercise/search/` | Search exercises by name |

---
Built with ❤️ by Mary Blessing