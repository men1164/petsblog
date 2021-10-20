import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDyc6jnEUi_Cg4nibUeJYEV_-2zUQBWS3k",
    authDomain: "cpe-petsblog.firebaseapp.com",
    projectId: "cpe-petsblog",
    storageBucket: "cpe-petsblog.appspot.com",
    messagingSenderId: "60111986825",
    appId: "1:60111986825:web:66e99423169aa73d582658"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }