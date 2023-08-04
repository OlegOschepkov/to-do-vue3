// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDRCJKhjZxtOXAE9nEjl3DCInvP_vkr5Es',
  authDomain: 'todovue3project.firebaseapp.com',
  projectId: 'todovue3project',
  storageBucket: 'todovue3project.appspot.com',
  messagingSenderId: '736061590440',
  appId: '1:736061590440:web:3563e5634dd587653cab9d',
  measurementId: 'G-YW74KFR5QS'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;