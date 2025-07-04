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

## Running the Project

This project supports **two implementations**:

- `main` – using **HTTP (REST)** communication
- `websocket` – using **WebSocket** communication

You can easily switch between them using provided scripts.

---

## First-Time Setup

Clone the repo:

```bash
git clone https://github.com/dominik-domanski/iss-tracker.git
cd iss-tracker
yarn install
```

---

## Run with REST (`main` branch)

This will:

- Discard any local changes
- Switch to the `main` branch
- Clean dependencies
- Install everything
- Start the dev servers

```bash
yarn run:main
```

---

## Run with WebSocket (`websocket` branch)

Same flow, but using the WebSocket implementation:

```bash
yarn run:ws
```

---

## Scripts Overview

Under the hood, these scripts run:

- `scripts/run-main.sh` → switches to `main`, cleans, installs, runs
- `scripts/run-ws.sh` → switches to `websocket`, cleans, installs, runs

You can also run them manually:

```bash
./scripts/run-main.sh
./scripts/run-ws.sh
```

Make them executable if needed:

```bash
chmod +x scripts/*.sh
```

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

## License

MIT
