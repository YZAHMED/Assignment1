# CORS Setup

## Install CORS
```bash
cd A2-backend
npm install cors
```

## Update app.js
Add this to your app.js file:

```javascript
import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
});
```

## Restart Server
```bash
npm start
```

## Test
Open test-api.html in browser to test endpoints
