# Karabo Mphafudi: MERN portfolio

React (Vite) frontend + Express/MongoDB API. Contact messages are saved to MongoDB and optionally emailed to you.

## Run locally
1. Server: `cd server`, `cp .env.example .env`, fill in `MONGODB_URI`, then `npm install` and `npm run dev`.
2. Client: `cd client`, `cp .env.example .env`, then `npm install` and `npm run dev`.

## Deploy for free
1. **Database:** create a free MongoDB Atlas M0 cluster, add a database user, allow network access from anywhere, copy the connection string.
2. **API on Render:** New Web Service from this repo. Root directory `server`, build `npm install`, start `npm start`. Add env vars from `server/.env.example` (set `CLIENT_ORIGIN` to your site address). Note: the free tier sleeps when idle, so the first message can take about a minute.
3. **Site on GitHub Pages:** name the repo `KaraboMphafudi.github.io`, push to `main`, then in Settings > Pages set Source to GitHub Actions. In Settings > Variables add `VITE_API_URL` = your Render URL. Your site goes live at https://karabomphafudi.github.io.

Content lives in `client/src/data.js`. Update the GiftLink link there.
