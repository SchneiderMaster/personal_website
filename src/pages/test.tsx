import Navbar from "@/app/navbar";
import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import Script from "next/script";
import { createIssue, getAllIssues } from "@/app/firestore";
import styles from "@/styles/test.module.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";

export default function Test(){

    const [issues, setIssues] = useState<QueryDocumentSnapshot[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getAllIssues();
            if (snapshot) {
                setIssues(snapshot);
            }
        };
        onAuthStateChanged(auth, (user: any) => {fetchData()});
    }, []);


    const [inputValues, setInputValues] = useState(["", ""])

    return (
        <main className={styles.main}>
            <Navbar></Navbar>
            <h1>Hello World!</h1>

            <input type="text" value={inputValues[0]} onChange={(e) => {setInputValues([e.currentTarget.value, inputValues[1]])}}></input>
            <input type="text" value={inputValues[1]} onChange={(e) => {setInputValues([inputValues[0], e.currentTarget.value])}}></input>

            <button onClick={() => {createIssue(inputValues[0], inputValues[1])}}>
                Create new issue
            </button>

            <br/>

            <br/>
            <br/>

            <button onClick={() => {
                signOut(auth).then((a: any) => {
                    console.log(a + "you have been signed out")
                })

            }}> log out </button>

            <br/>
            <br/>

            {/* Map over the issues array and render a div for each issue */}
            {issues.map((issue, index) => (
                <div key={issue.id}>
                    {issue.data().title}
                    <div style={{fontSize: "0.8em" }}>{issue.data().description}</div>    
                </div>
            ))}
        </main>
    )
}
