// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCxeLKpJwvWGGeJe1NDCp0_1c-zUVo37GE",
    authDomain: "library-e4091.firebaseapp.com",
    projectId: "library-e4091",
    storageBucket: "library-e4091.appspot.com",
    messagingSenderId: "814874822041",
    appId: "1:814874822041:web:03d5d21160bfb88707bf08",
    measurementId: "G-Y0D4VJKTBR"
  };

  const app = initializeApp(firebaseConfig);
  let db = getFirestore(app);
  let auth = getAuth(app);
  let storage = getStorage(app);

  export {db, auth, storage}