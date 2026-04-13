# Inventory App

Test assignment app built with `Next.js` + `Redux Toolkit` + `Socket.io`.

## Implemented Features

- `Orders` and `Products` pages with Next.js route-based navigation.
- `Map` page with order geolocation markers (`react-leaflet` + OpenStreetMap).
- Component architecture: `NavigationMenu`, `TopMenu`, `Orders`, `Products`.
- Global state management with `Redux`.
- SSR-ready app structure with Next.js App Router.
- Real-time date and clock in `TopMenu`.
- Active browser tabs counter via `WebSocket (Socket.io)`.
- REST API (Express) for orders and products (`GET`, `DELETE`).
- Product filtering by type.
- Route/component transitions with `animate.css`.
- BEM-style CSS class architecture + Bootstrap components.

## Stack

- React
- Next.js
- Redux Toolkit / React Redux
- Axios
- Socket.io / Socket.io-client
- Leaflet / React Leaflet
- Bootstrap
- animate.css
- Express + CORS
- Docker / Docker Compose

## Requirements

- Node.js `>= 20`
- npm `>= 10`

## Installation

```bash
npm install
```

## Environment Variables

Create `.env.local` in the project root (optional, defaults are already set in code):

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

## Run with Docker (Recommended)

```bash
docker compose up --build
```

Runs:
- frontend: `http://localhost:3000`
- server and websocket: `http://localhost:4000`

## Run Locally (Optional)

```bash
npm install
npm run dev
```

## Build (Local)

```bash
npm run build
```

## API Endpoints

- `GET /api/orders`
- `GET /api/products`
- `DELETE /api/orders/:id`
- `POST /api/auth/login`

## Project Structure

```text
src/
  components/
  providers/
  views/
  services/
  store/
  utils/
app/
  layout.jsx
  page.jsx
  map/page.jsx
  orders/page.jsx
  products/page.jsx
src/
  components/maps/
server/
  index.js
  data.js
```

## Main Scripts

- `npm run dev` — run client and server together.
- `npm run dev:client` — run only Next.js client.
- `npm run dev:server` — run only REST/WS server.
- `npm run build` — Next.js production build.

## Troubleshooting

- If orders/products are empty, make sure backend is running on `http://localhost:4000`.
- If active tabs counter is not updating, verify websocket URL and open app in two browser tabs.
- If API data looks outdated, check whether port `4000` is occupied by an old Docker container.
