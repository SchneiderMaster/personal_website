import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/create-issue.module.css";
import { createWorklog, getAllIssues, getAllProjects } from "./firestore";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import TimeTable from "@/pages/timetable";
export function CreateIssue({duration_}:any) {

	const [duration, setDuration] = useState<number>(duration_);

    const [issues, setIssues] = useState<QueryDocumentSnapshot[]>([]);

	const [projects, setProjects] = useState<QueryDocumentSnapshot[]>([]);

    const [issue, setIssue] = useState<string>("");

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const [selectedDuration, setSelectedDuration] = useState<number>(duration);

    const [comment, setComment] = useState<string>("");



    useEffect(() => {
		onAuthStateChanged(auth, () => {
			fetchProjects();

		});
	}, []);

	useEffect(() => {
		setDuration(duration_);
		setSelectedDuration(duration_);
	}, [duration_]);


    const fetchIssues = async (projectId: string) => {
		const snapshot = await getAllIssues(projectId);
		if (snapshot) {
			setIssues(snapshot);
		}
	};

	const fetchProjects = async () => {
		const snapshot = await getAllProjects();
		if (snapshot) {
			setProjects(snapshot);
		}
	};


    return(
        <div className={styles.main}  style={{display: `${duration === 0 ? "none" : "flex"}`}}>

            <div className={styles.center}>

                <h2>Log time on an issue</h2>

                <select
				onChange={(e) => {
					fetchIssues(e.currentTarget.value);
				}}>
				<option key={0} value={""}></option>
				{projects.map((project, index) => (
					<option key={index + 1} value={project.id}>{`${
						project.data().name
					} (${project.id})`}</option>
				))}
			</select>

			<select
				onChange={(e) => {
					setIssue(e.currentTarget.value);
				}}>
				<option key={0} value={""}></option>
				{issues.map((issue, index) => (
					<option key={index + 1} value={issue.id}>{`${
						issue.data().title
					} (${issue.id})`}</option>
				))}
			</select>

			<input
				type="datetime-local"
				onChange={(e) => {
					if (e.currentTarget.valueAsDate) {
						setSelectedDate(e.currentTarget.valueAsDate);
					}
				}}></input>

			<input
				type="number"
				placeholder={duration.toString()}
				onChange={(e) => {
					if (e.currentTarget.valueAsNumber) {
						setSelectedDuration(e.currentTarget.valueAsNumber);
					}
				}}></input>

			<input
				type="text"
				onChange={(e) => {
					if (e.currentTarget.value) {
						setComment(e.currentTarget.value);
					}
				}}></input>

			<button
				onClick={() => {
					console.log(selectedDate);
					createWorklog(
						issue,
						selectedDate,
						selectedDuration,
						comment
					).then(() => {

					setDuration(0);
					duration_ = 0;

					})
				}}>
				Add worklog
			</button>










            </div>

        </div>

    );
}