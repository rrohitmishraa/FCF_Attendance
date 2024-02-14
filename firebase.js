import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCrG5ghvaVkuu3EA2wRG53MOZpQCZyxOeE",
    authDomain: "fcf-mma.firebaseapp.com",
    projectId: "fcf-mma",
    storageBucket: "fcf-mma.appspot.com",
    messagingSenderId: "178186610580",
    appId: "1:178186610580:web:6877224585fb4db4a25181"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore();

export { auth, db }