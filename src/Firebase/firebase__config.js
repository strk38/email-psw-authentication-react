// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBckT82Gfmi6LY2BDikiomii9UdnajdT0k",
    authDomain: "react-user-email-auth.firebaseapp.com",
    projectId: "react-user-email-auth",
    storageBucket: "react-user-email-auth.appspot.com",
    messagingSenderId: "470411136057",
    appId: "1:470411136057:web:286a5615f5d6909df091e8",
    measurementId: "G-95Y01K61NN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
// sxport default app;
export default auth;