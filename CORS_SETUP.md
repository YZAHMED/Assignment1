# CORS Setup Guide for A2-Backend

## Overview
To allow the A2-frontend to make HTTP requests to the A2-backend, you need to configure CORS (Cross-Origin Resource Sharing) on the backend server.

## Current Issue
The backend currently doesn't have CORS configured, which means browsers will block requests from the frontend due to the Same-Origin Policy.

## Solution: Add CORS Middleware

### Step 1: Install CORS Package
```bash
cd A2-backend
npm install cors
```

### Step 2: Update app.js
Add the following to your `app.js` file:

```javascript
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors'; // Add this import

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore';

// CORS Configuration - Add this before other middleware
app.use(cors({
  origin: [
    'http://localhost:3000',           // Frontend dev server
    'http://localhost:3001',           // Alternative frontend port
    'https://your-frontend-domain.com' // Your frontend production domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ... rest of your existing code
```

### Step 3: Alternative - Simple CORS Setup
If you want a simpler setup that allows all origins (not recommended for production):

```javascript
import cors from 'cors';

// Allow all origins
app.use(cors());
```

### Step 4: Restart the Backend Server
After making changes, restart your backend server:
```bash
npm start
# or
node app.js
```

## Testing CORS Configuration

### Option 1: Use the Test HTML File
1. Open `A2-frontend/test-api.html` in your browser
2. Check if the API calls succeed
3. Look for CORS errors in the browser console

### Option 2: Test with Browser Console
1. Open your frontend in the browser
2. Open Developer Tools (F12)
3. In the Console tab, run:
```javascript
fetch('https://assignment1-tc7d.onrender.com/api/authors')
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
```

### Option 3: Test with Postman/Insomnia
1. Send a GET request to `https://assignment1-tc7d.onrender.com/api/authors`
2. Check if you get a successful response

## Expected Results

### Before CORS Setup:
- Browser console shows CORS errors
- API calls fail with "Access to fetch at '...' from origin '...' has been blocked by CORS policy"

### After CORS Setup:
- API calls succeed
- Data is returned from the backend
- No CORS errors in the console

## Security Considerations

### Development Environment:
- Allow localhost origins for development
- Use specific origins rather than wildcards

### Production Environment:
- Restrict origins to only your frontend domain
- Consider using environment variables for origins
- Implement proper authentication and authorization

## Troubleshooting

### Common Issues:
1. **CORS still not working**: Ensure the cors middleware is added BEFORE other middleware
2. **Specific origin not allowed**: Check the origin array in cors configuration
3. **Credentials not working**: Ensure `credentials: true` is set if needed

### Debug Steps:
1. Check backend console for CORS-related logs
2. Verify the cors package is installed
3. Ensure the middleware order is correct
4. Test with different origins

## Example Complete app.js with CORS

```javascript
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore';

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://your-frontend-domain.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect(MONGODB_URI, {
  dbName: 'bookstore',
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

import adminRoutes from './routes/admin.js';
import apiRoutes from './routes/api.js';
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.redirect('/admin');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Next Steps
After setting up CORS:
1. Test the API endpoints
2. Verify frontend can fetch data
3. Check for any remaining errors
4. Deploy the updated backend
5. Test the integration in production
