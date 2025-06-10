// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-9mS5ovPBKJ8Gh69V7Pdn7-1ClfOhcTM",
  authDomain: "careershare-fc3b6.firebaseapp.com",
  databaseURL: "https://careershare-fc3b6-default-rtdb.firebaseio.com",
  projectId: "careershare-fc3b6",
  storageBucket: "careershare-fc3b6.firebasestorage.app",
  messagingSenderId: "40972320419",
  appId: "1:40972320419:web:5f4b8c0ea365b8ed1f8916",
  measurementId: "G-99E4TY3DBP"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Realtime Database and export
export const db = getFirestore(app);

// Initialize Firebase Auth and export
export const auth = getAuth(app);
