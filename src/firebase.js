// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAiL3gZVIQ7y2nlCOI19rAOSS0M2aAQStw',
    authDomain: 'tfg-cb-0.firebaseapp.com',
    projectId: 'tfg-cb-0',
    storageBucket: 'tfg-cb-0.appspot.com',
    messagingSenderId: '980400442496',
    appId: '1:980400442496:web:f616287de6b4ae76a2aa65'
};


export let app = undefined;
export let db = undefined;
export let auth = undefined;
export let storage = undefined;

/**
 * Inicializa Firebase.
 * @returns {undefined}
 */
export function initializeFirebase(){
    app = initializeApp(firebaseConfig);
    db = getFirestore();
    auth = getAuth(app);
    storage = getStorage(app);
}
