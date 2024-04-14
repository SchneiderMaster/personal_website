import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { isSupported } from "firebase/analytics";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Script from "next/script";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB12kt3yDIDinw265Av8w2P8v8IwIlJneE",
  authDomain: "schneider-tempo.firebaseapp.com",
  projectId: "schneider-tempo",
  storageBucket: "schneider-tempo.appspot.com",
  messagingSenderId: "676575892424",
  appId: "1:676575892424:web:1dfd689eb4120a6f7126fd",
  measurementId: "G-L7QZSJEW0T"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);;




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    
    <Script defer src="/__/firebase/10.11.0/firebase-app-compat.js"></Script>
    <Script defer src="/__/firebase/10.11.0/firebase-auth-compat.js"></Script>
    <Script defer src="/__/firebase/10.11.0/firebase-database-compat.js"></Script>
    <Script defer src="/__/firebase/10.11.0/firebase-firestore-compat.js"></Script>
    <Script defer src="/__/firebase/10.11.0/firebase-functions-compat.js"></Script>
    <Script defer src="/__/firebase/10.11.0/firebase-messaging-compat.js"></Script>
    <Script defer src="/__/firebase/10.11.0/firebase-storage-compat.js"></Script>
    <Script defer src="/__/firebase/10.11.0/firebase-analytics-compat.js"></Script>
    <Script defer src="/__/firebase/10.11.0/firebase-remote-config-compat.js"></Script>
    <Script defer src="/__/firebase/10.11.0/firebase-performance-compat.js"></Script>
    <Script defer src="/__/firebase/init.js"></Script>


      <Script src="https://apis.google.com/js/platform.js" async defer></Script>
      <meta name="google-signin-client_id" content="911079370304-2u99bp5ef59s8dl16a97gslt5dp7fgpm.apps.googleusercontent.com.apps.googleusercontent.com"></meta>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
