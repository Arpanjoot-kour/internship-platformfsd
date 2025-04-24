const admin = require('firebase-admin');

// Initialize Firebase Admin with service account
// You'll need to download your service account key from Firebase Console
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin; 