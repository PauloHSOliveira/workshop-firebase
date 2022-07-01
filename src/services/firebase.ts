import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()
const firestore = firebase.firestore()
const functions = firebase.functions()

const EMULATORS_STARTED = 'EMULATORS_STARTED'

if (process.env.NODE_ENV === 'development' && !(global as any)[EMULATORS_STARTED]) {
  console.log('testing locally -- hitting local auth and firestore emulators');
  (global as any)[EMULATORS_STARTED] = true
  auth.useEmulator('http://localhost:9099/')
  firestore.useEmulator('localhost', 8080)
  functions.useEmulator('localhost', 5001)
}

export {
  firebase,
  auth,
  firestore,
  functions,
}
