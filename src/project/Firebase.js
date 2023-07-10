
// Firebase.js

// Import the necessary Firebase SDK modules
import {initializeApp} from 'firebase/app';

import {getFirestore} from 'firebase/firestore';
import {getFunctions} from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyCweE-EkBalWHLtqkisHZsexF1NkWyH65M',
  authDomain: 'harlyy-51e17.firebaseapp.com',
  projectId: 'harlyy-51e17',
  storageBucket: 'harlyy-51e17.appspot.com',
  messagingSenderId: '440095668989',
  appId: '1:440095668989:web:2a875549c37ca86ceedc94',
  measurementId: 'G-G5MXZW11KF',
};

const app = initializeApp(firebaseConfig);

// Export the Firebase project's functionality
export const firestore = getFirestore(app);
export const functions = getFunctions(app);

export default app;
