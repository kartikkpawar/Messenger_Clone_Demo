const firebase = require("firebase");

const firebaseApp = firebase.initializeApp({
  apiKey: "<your-api-key>",
  authDomain: "<your-auth-domain>",
  databaseURL: "<your-database-url>",
  storageBucket: "<your-storage-bucket-url>",
});

const db = firebaseApp.firestore();

export default db;
