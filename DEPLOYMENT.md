# Deployment Guide for MERN Application

This guide will walk you through deploying your MERN (MongoDB, Express, React, Node.js) application with:
- Frontend on Netlify
- Backend on Render or Railway
- MongoDB on Atlas
- Secure environment variables

## Prerequisites

- Git repository with your MERN application
- Accounts on:
  - [Netlify](https://www.netlify.com/)
  - [Render](https://render.com/) or [Railway](https://railway.app/)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - [Firebase](https://firebase.google.com/) (for authentication)

## Step 1: Set Up MongoDB Atlas

1. Create a MongoDB Atlas account if you don't have one
2. Create a new cluster (free tier is sufficient for development)
3. Set up database access:
   - Create a database user with read/write permissions
   - Add your IP address to the IP whitelist (or use 0.0.0.0/0 for all IPs)
4. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string and replace `<username>`, `<password>`, and `<dbname>` with your values

## Step 2: Deploy Backend to Render/Railway

### Option A: Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - Name: `your-app-name-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Plan: Free

4. Add environment variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `FIREBASE_PRIVATE_KEY`: Your Firebase private key (replace newlines with \n)
   - `FIREBASE_CLIENT_EMAIL`: Your Firebase client email
   - `CORS_ORIGIN`: Your frontend URL (will be added after frontend deployment)

5. Deploy the service

### Option B: Deploy to Railway

1. Create a new project on Railway
2. Connect your GitHub repository
3. Add environment variables (same as Render)
4. Deploy the service

## Step 3: Deploy Frontend to Netlify

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`

4. Add environment variables:
   - `REACT_APP_API_URL`: Your backend URL (from Render/Railway)
   - `REACT_APP_FIREBASE_API_KEY`: Your Firebase API key
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
   - `REACT_APP_FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
   - `REACT_APP_FIREBASE_APP_ID`: Your Firebase app ID

5. Deploy the site

## Step 4: Update CORS Settings

After deploying both frontend and backend:

1. Go to your backend service on Render/Railway
2. Update the `CORS_ORIGIN` environment variable with your Netlify URL
3. Redeploy the backend service

## Step 5: Test Your Deployment

1. Visit your Netlify URL
2. Test the authentication flow
3. Test the protected routes
4. Check that API calls are working correctly

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure `CORS_ORIGIN` is set correctly in the backend
   - Check that the frontend is using the correct API URL

2. **Authentication Issues**:
   - Verify Firebase configuration in the frontend
   - Check that JWT tokens are being sent correctly

3. **Database Connection Issues**:
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas

4. **Environment Variables**:
   - Ensure all required environment variables are set
   - Check for typos in variable names

## Security Best Practices

1. **Environment Variables**:
   - Never commit `.env` files to your repository
   - Use different values for development and production
   - Regularly rotate secrets and API keys

2. **API Security**:
   - Implement rate limiting on your API
   - Use HTTPS for all communications
   - Validate all user inputs

3. **Database Security**:
   - Use strong passwords for database users
   - Restrict IP access to your database
   - Regularly backup your database

4. **Authentication**:
   - Implement proper token expiration
   - Use secure session management
   - Implement proper logout functionality 