## PixiJS v5. Facebook Instant Game

Quick way to correctly set up a Facebook Instant game with PixiJS

Install dependencies:
```
npm i
```

Run on https://localhost:3000:
```
npm start
```

Head to https://localhost:3000 and confirm that you are OK with the unsafe connection (if it asks you about it).

Head to https://www.facebook.com/embed/instantgames/YOUR_APP_ID/player?game_url=https://localhost:3000 replacing YOUR_APP_ID with your app id.

#### Building

Development build:
```
npm run build
```

Production build:
```
npm run production
```