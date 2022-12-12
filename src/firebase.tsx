// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6rBQRQ8GRFfR9YNyUvgFQ4PouIUR7eqI",
  authDomain: "commenter-2bea3.firebaseapp.com",
  projectId: "commenter-2bea3",
  storageBucket: "commenter-2bea3.appspot.com",
  messagingSenderId: "1000855228914",
  appId: "1:1000855228914:web:7cab6ab91d052238d05b6b",
  measurementId: "G-97LLS23E0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}