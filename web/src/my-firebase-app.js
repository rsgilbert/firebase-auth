import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD5b-WPziuoC1zB0uS7VgnYnAFPoWy9yGU",
    authDomain: "rsgilbert-learn-firebase-1.firebaseapp.com",
    projectId: "rsgilbert-learn-firebase-1",
    storageBucket: "rsgilbert-learn-firebase-1.appspot.com",
    messagingSenderId: "422948433513",
    appId: "1:422948433513:web:ac322990a8c5c30c0efcf8"
};

export const myFirebaseApp = initializeApp(firebaseConfig)