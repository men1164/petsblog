import { initializeApp } from "firebase/app"
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDyc6jnEUi_Cg4nibUeJYEV_-2zUQBWS3k",
    authDomain: "cpe-petsblog.firebaseapp.com",
    projectId: "cpe-petsblog",
    storageBucket: "cpe-petsblog.appspot.com",
    messagingSenderId: "60111986825",
    appId: "1:60111986825:web:66e99423169aa73d582658"
};

// init firebase app
const firebase = initializeApp(firebaseConfig)

// init services
const projectFirestore = getFirestore(firebase)
const projectAuth = getAuth(firebase)
const projectStorage = getStorage(firebase)

const timestamp = serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }