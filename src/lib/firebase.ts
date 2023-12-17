import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC5R3hEerZc_TKRvHNByO5ZHhWd2teWtzo",
    authDomain: "setsnreps-e7d68.firebaseapp.com",
    projectId: "setsnreps-e7d68",
    storageBucket: "setsnreps-e7d68.appspot.com",
    messagingSenderId: "429203041903",
    appId: "1:429203041903:web:9f3b7b55d12ea2caae279a"
  };
  

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);