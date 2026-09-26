import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAmKmVDHWEGdiwmidGoTaFJZNVs3nUFCi8",
  authDomain: "desarrollopamoviles.firebaseapp.com",
  projectId: "desarrollopamoviles",
  storageBucket: "desarrollopamoviles.firebasestorage.app",
  messagingSenderId: "919169399736",
  appId: "1:919169399736:web:b61f0ab0cf4413e723ed4d",
  measurementId: "G-8YPM30MCYB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };