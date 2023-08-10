// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzCxytO4Sf7PvrI3ClcAiRYwXqAUgxNrE",
  authDomain: "marketplace-301f4.firebaseapp.com",
  projectId: "marketplace-301f4",
  storageBucket: "marketplace-301f4.appspot.com",
  messagingSenderId: "1041964241127",
  appId: "1:1041964241127:web:d76d49e2e93a375a355242"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;