import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY ||
      'AIzaSyBJKuF5Zi0QgmQ-sxMGkfbtORXsP7VKUVI',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN ||
      'expensify-app-e634b.firebaseapp.com',
  databaseURL: process.env.FIREBASE_DATABASE_RUL ||
      'https://expensify-app-e634b.firebaseio.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'expensify-app-e634b',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET ||
      'expensify-app-e634b.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '353366598979',
};

firebase.initializeApp(config);

const fs = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, fs, googleAuthProvider};
