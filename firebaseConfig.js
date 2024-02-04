import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { initializeAuth,getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
    apiKey: "AIzaSyAEhh1C1NDd5GF9qhJqA3aelzUMSC0jOkg",
    authDomain: "first-app-1ac85.firebaseapp.com",
    projectId: "first-app-1ac85",
    storageBucket: "first-app-1ac85.appspot.com",
    messagingSenderId: "700860084216",
    appId: "1:700860084216:web:f821b875e8f04dc17f300d",
    measurementId: "G-H4E87PXBCY"
  }

const FIREBASE_APP = initializeApp(firebaseConfig)
const FIREBASE_DB = getFirestore(FIREBASE_APP)

const auth = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })

export {FIREBASE_APP, FIREBASE_DB}
