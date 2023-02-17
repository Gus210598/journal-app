// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

import { getEnvironments } from '../helpers/getEnvironments';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//console.log(process.env);

const {
  VITE_apiKey,
  VITE_authDomain,
  VITE_projectId,
  VITE_storageBucket,
  VITE_messagingSenderId,
  VITE_appId,
} = getEnvironments();

// Your web app's Firebase configuration

// Production
// const firebaseConfig = {
// apiKey: "AIzaSyAv8bEbQ3NHy7FXW5WoyshWJEpVd42DieM",
// authDomain: "react-cursos-7e355.firebaseapp.com",
// projectId: "react-cursos-7e355",
// storageBucket: "react-cursos-7e355.appspot.com",
// messagingSenderId: "838533901474",
// appId: "1:838533901474:web:5bd607af1effe67aa2fbfb"
// };

// Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyDBQNYdOGQWwDXM_W8wS1Cq6UkXhGtF_R4",
//   authDomain: "react-test-journal.firebaseapp.com",
//   projectId: "react-test-journal",
//   storageBucket: "react-test-journal.appspot.com",
//   messagingSenderId: "1019040686814",
//   appId: "1:1019040686814:web:191f3b30fda1eb93fc184f"
// };


const firebaseConfig = {
  apiKey: VITE_apiKey,
  authDomain:   VITE_authDomain,
  projectId:   VITE_projectId,
  storageBucket:   VITE_storageBucket,
  messagingSenderId:   VITE_messagingSenderId,
  appId:   VITE_appId,
};

//console.log(firebaseConfig);




// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );

