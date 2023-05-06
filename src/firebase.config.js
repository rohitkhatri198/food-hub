import {getApp, getApps, initializeApp} from "firebase/app"
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import App from "./App";

const firebaseConfig = {
    apiKey: "AIzaSyBNpuBX9EEPoEsEUQal5PsoWlPib0oL6_o",
    authDomain: "food-hub-ce044.firebaseapp.com",
    databaseURL: "https://food-hub-ce044-default-rtdb.firebaseio.com",
    projectId: "food-hub-ce044",
    storageBucket: "food-hub-ce044.appspot.com",
    messagingSenderId: "14140910742",
    appId: "1:14140910742:web:ee6b1f945f38a4c574e6b7"
  };

  const app = getApps.length>0 ? getApp() :initializeApp(firebaseConfig)
  const firestore = getFirestore(app)
  const storage = getStorage(app)

  export {app, firestore, storage};