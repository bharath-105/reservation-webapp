import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD6M55ECm8K_nXw3mgY6wXNIbF4hNS5SJE",
  authDomain: "restaurant-b3c82.firebaseapp.com",
  projectId: "restaurant-b3c82",
  storageBucket: "restaurant-b3c82.firebasestorage.app",
  messagingSenderId: "174728097660",
  appId: "1:174728097660:web:554611cc86973be10b3ef9"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
