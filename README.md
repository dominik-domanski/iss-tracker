# ISS Tracker

A full-stack web application for tracking the real-time location of the International Space Station (ISS), visualizing its movement on a map, and rendering the Earth's day-night shadow overlay.

## Project Structure

```
iss-tracker/
├── client/       # Frontend (Vite + React + Leaflet)
├── server/       # Backend (Node.js + Express)
├── package.json  # Project-level scripts
├── .nvmrc        # Node.js version used
└── README.md     # You're here!
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js v20.10.0 (automatically used via `.nvmrc` if you're using [nvm](https://github.com/nvm-sh/nvm))
- Yarn v1.22 or later

---

### 🔧 Install dependencies

From the project root:

```bash
yarn bootstrap
```

This will:

- Install dev dependencies in the root
- Install frontend dependencies: `client/`
- Install backend dependencies: `server/`

---

### Start development servers

```bash
yarn dev
```

This runs both:

- **Frontend** at: `http://localhost:5173`
- **Backend** at: `http://localhost:3000`

---

## Scripts

Run from the root directory:

| Script               | Description                     |
| -------------------- | ------------------------------- |
| `yarn dev`           | Start both frontend and backend |
| `yarn server`        | Start backend only (dev mode)   |
| `yarn client`        | Start frontend only             |
| `yarn client:build`  | Build frontend assets           |
| `yarn server:build`  | Build backend for production    |
| `yarn format`        | Format all code using Prettier  |
| `yarn find:deadcode` | Run `ts-prune` on client/server |

---

## API Documentation

### Base URL

```
http://localhost:3000/api
```

---

### **GET** `/iss-location`

**Description**:  
Fetches the current ISS position from [wheretheiss.at](https://wheretheiss.at).

#### Example Request

```bash
curl http://localhost:3000/api/iss-location
```

#### Response Format

```json
{
  "latitude": number,
  "longitude": number,
  "altitude": number,
  "velocity": number,
  "timestamp": number
}
```

---

## 📦 License

MIT
