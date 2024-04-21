// Your web app's Firebase configuration
import firebase from "firebase/compat/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, browserPopupRedirectResolver, browserSessionPersistence, getAuth, initializeAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyB12kt3yDIDinw265Av8w2P8v8IwIlJneE",
    authDomain: "schneider-tempo.firebaseapp.com",
    projectId: "schneider-tempo",
    storageBucket: "schneider-tempo.appspot.com",
    messagingSenderId: "676575892424",
    appId: "1:676575892424:web:1dfd689eb4120a6f7126fd",
    measurementId: "G-L7QZSJEW0T"
  };
  
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);;
  // export const auth = initializeAuth(app, {persistence: browserLocalPersistence, popupRedirectResolver: browserPopupRedirectResolver});

  export const auth = getAuth(app);

  export const db = getFirestore(app)
  