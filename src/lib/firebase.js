// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCeiK7ZWEP6L6x5NaMLcYvbL01MC-3D-JM',
  authDomain: 'edupox-fa864.firebaseapp.com',
  projectId: 'edupox-fa864',
  storageBucket: 'edupox-fa864.appspot.com',
  messagingSenderId: '442054608311',
  appId: '1:442054608311:web:12794a77fa9ef375585432',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
