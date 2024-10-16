import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCW9iFIZ8o7a3ZAlQDwrVocaUKhetC6FaM",
  authDomain: "forum-app-7fd8f.firebaseapp.com",
  projectId: "forum-app-7fd8f",
  storageBucket: "forum-app-7fd8f.appspot.com",
  messagingSenderId: "513217287885",
  appId: "1:513217287885:web:9046c611e559de2d8e3b84",
  measurementId: "G-NC9M2FR2L7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
