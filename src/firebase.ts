import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDqVzS_ASX4X7O_hABaWqWs3_WICD9e98k',
  authDomain: 'movie-mania-ba966.firebaseapp.com',
  projectId: 'movie-mania-ba966',
  storageBucket: 'movie-mania-ba966.appspot.com',
  messagingSenderId: '152286010955',
  appId: '1:152286010955:web:ae432610af2dbe859977ce',
  measurementId: 'G-9103CDPFSE',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export { auth }
export default db
