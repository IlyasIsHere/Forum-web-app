import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Add Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUE9yQSKkeV-y1ArBuCPs52jV06A1DUsY",
  authDomain: "um6p-vote.firebaseapp.com",
  projectId: "um6p-vote",
  storageBucket: "um6p-vote.appspot.com",
  messagingSenderId: "36805119258",
  appId: "1:36805119258:web:6c078d41933e9485f130a3"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence: ", error);
  });
const storage = getStorage(app);
export { db, auth, storage };
