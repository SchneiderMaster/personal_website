import Navbar from "@/app/navbar";
import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import Script from "next/script";
import { createIssue, createProject, getAllIssues, getAllProjects } from "@/app/firestore";
import styles from "@/styles/test.module.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";

export default function Test(){

    let fetched = false;

    const [issues, setIssues] = useState<QueryDocumentSnapshot[]>([])

    const [projects, setProjects] = useState<QueryDocumentSnapshot[]>([]);

    const [selectedProject, setSelectedProject] = useState<string>("");

    const fetchIssues = async (projectId: string) => {
        const snapshot = await getAllIssues(projectId);
        if (snapshot) {
            setIssues(snapshot);
        }
    };

    // onAuthStateChanged(auth, (user: any) => {if(!fetched) {fetchIssues(); fetched = true;}});


    const fetchProjects = async () => {
        const snapshot = await getAllProjects();
        if (snapshot) {
            setProjects(snapshot);
        }
    };
    onAuthStateChanged(auth, (user: any) => {fetchProjects()});



    const [inputValues, setInputValues] = useState(["", "", ""])
    const [inputValues1, setInputValues1] = useState(["", "", ""])

    return (
        <main className={styles.main}>
            <Navbar></Navbar>
            <h1>Hello World!</h1>

            <input type="text" value={inputValues1[0]} onChange={(e) => {setInputValues1([e.currentTarget.value, inputValues1[1], inputValues1[2]])}}></input>
            <input type="text" value={inputValues1[1]} onChange={(e) => {setInputValues1([inputValues1[0], e.currentTarget.value, inputValues1[2]])}}></input>
            <input type="text" value={inputValues1[2]} onChange={(e) => {setInputValues1([inputValues1[0], inputValues1[1], e.currentTarget.value])}}></input>

            <button onClick={() => {createProject(inputValues1[0], inputValues1[1], inputValues1[2])}}>
                Create new project (id, name, description)
            </button>

            <br/>
            <br/>
            <br/>            
            <br/>
            <br/>
            <br/>

            <input type="text" value={inputValues[0]} onChange={(e) => {setInputValues([e.currentTarget.value, inputValues[1], inputValues[2]])}}></input>
            <input type="text" value={inputValues[1]} onChange={(e) => {setInputValues([inputValues[0], e.currentTarget.value, inputValues[2]])}}></input>
            <input type="text" value={inputValues[2]} onChange={(e) => {setInputValues([inputValues[0], inputValues[1], e.currentTarget.value])}}></input>

            <button onClick={() => {createIssue(inputValues[0], inputValues[1], inputValues[2])}}>
                Create new issue (title, description, projectId)
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


            <select onChange={(e) => {
                setSelectedProject(e.currentTarget.value);
            }} onMouseEnter={(e) => {
                setSelectedProject(e.currentTarget.value);
            }}>
                {projects.map((project, index) => (
                    <option key={index} value={project.id}>{`${project.data().name} (${project.id})`}</option>
                ))}
                
            </select>

            <button onClick={() => {
                console.log(selectedProject);
                fetchIssues(selectedProject);
            }}>Get all issues</button>

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
