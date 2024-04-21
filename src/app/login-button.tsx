import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, db } from "./firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export default function LoginButton(){




    function handleLogin() {
        signInWithPopup(auth, new GoogleAuthProvider).then(() => {
            onAuthStateChanged(auth, async (user) => {
                if(user) {
                    try{
                        const docRef = await setDoc(doc(db, "users", user.uid), {
                            name: user.displayName
                        })

                    }

                    catch (err)
                    {
                        console.log(err);
                    }


                }
        
            })
        })
    }


    return(
        <button onClick={() => {handleLogin()}}>Sign in with Google</button>

    )

}