import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAEhh1C1NDd5GF9qhJqA3aelzUMSC0jOkg",
    authDomain: "first-app-1ac85.firebaseapp.com",
    projectId: "first-app-1ac85",
    storageBucket: "first-app-1ac85.appspot.com",
    messagingSenderId: "700860084216",
    appId: "1:700860084216:web:f821b875e8f04dc17f300d",
    measurementId: "G-H4E87PXBCY"
  }

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {app, db}
