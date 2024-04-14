import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "./firebase";

export default function LoginButton(){




    function handleLogin() {
        signInWithPopup(auth, new GoogleAuthProvider).then(() => {
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    console.log(user);
                }
        
            })
        })
    }


    return(
        <button onClick={() => {handleLogin()}}>Sign in with Google</button>

    )

}