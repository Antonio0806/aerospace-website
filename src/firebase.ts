// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBhKZHiQSGVNnhYJl0XtpuhIvwJj99CNVY',
  authDomain: 'aerospace-1e5f5.firebaseapp.com',
  projectId: 'aerospace-1e5f5',
  storageBucket: 'aerospace-1e5f5.appspot.com',
  messagingSenderId: '805114519895',
  appId: '1:805114519895:web:175c4aeb06e8aa2ce81e12',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const sendThePassResetEmail = (email: string) => sendPasswordResetEmail(auth, email);
export default app;
