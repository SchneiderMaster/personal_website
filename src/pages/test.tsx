import Navbar from "@/app/navbar";
import React from "react";
import "@/styles/globals.css";
import Script from "next/script";

export default function test(){


    return(
        <main>


    
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
      <Script defer src="/__/firebase/init.js?useEmulator=true"></Script>


      <Script src="https://apis.google.com/js/platform.js" async defer></Script>
      <meta name="google-signin-client_id" content="911079370304-2u99bp5ef59s8dl16a97gslt5dp7fgpm.apps.googleusercontent.com.apps.googleusercontent.com"></meta>



            
            <Navbar></Navbar>
            <h1>Hello World!</h1>
        </main>

    )


} 