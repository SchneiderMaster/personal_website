import Navbar from "@/app/navbar";
import React, { useState, useEffect, useRef } from "react";
import "@/styles/globals.css";
import Script from "next/script";
import {
	createIssue,
	createProject,
	createWorklog,
	getAllIssues,
	getAllProjects,
} from "@/app/firestore";
import styles from "@/styles/test.module.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";

export default function Test() {
	const [issues, setIssues] = useState<QueryDocumentSnapshot[]>([]);

	const [projects, setProjects] = useState<QueryDocumentSnapshot[]>([]);

	const [selectedProjectForSearch, setSelectedProjectForSearch] =
		useState<string>("");

	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const [selectedDuration, setSelectedDuration] = useState<number>(0);

	const [issue, setIssue] = useState<string>("");

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

	useEffect(() => {
		fetchProjects();
	});

	const [inputValues, setInputValues] = useState(["", "", ""]);
	const [inputValues1, setInputValues1] = useState(["", "", ""]);

	return (
		<main className={styles.main}>
			<Navbar></Navbar>
			<h1>Hello World!</h1>

			<input
				type="text"
				value={inputValues1[0]}
				onChange={(e) => {
					setInputValues1([
						e.currentTarget.value,
						inputValues1[1],
						inputValues1[2],
					]);
				}}></input>
			<input
				type="text"
				value={inputValues1[1]}
				onChange={(e) => {
					setInputValues1([
						inputValues1[0],
						e.currentTarget.value,
						inputValues1[2],
					]);
				}}></input>
			<input
				type="text"
				value={inputValues1[2]}
				onChange={(e) => {
					setInputValues1([
						inputValues1[0],
						inputValues1[1],
						e.currentTarget.value,
					]);
				}}></input>

			<button
				onClick={() => {
					createProject(
						inputValues1[0],
						inputValues1[1],
						inputValues1[2]
					);
				}}>
				Create new project (id, name, description)
			</button>

			<br />
			<br />
			<br />
			<br />
			<br />
			<br />

			<input
				type="text"
				value={inputValues[0]}
				onChange={(e) => {
					setInputValues([
						e.currentTarget.value,
						inputValues[1],
						inputValues[2],
					]);
				}}></input>
			<input
				type="text"
				value={inputValues[1]}
				onChange={(e) => {
					setInputValues([
						inputValues[0],
						e.currentTarget.value,
						inputValues[2],
					]);
				}}></input>
			<input
				type="text"
				value={inputValues[2]}
				onChange={(e) => {
					setInputValues([
						inputValues[0],
						inputValues[1],
						e.currentTarget.value,
					]);
				}}></input>

			<button
				onClick={() => {
					createIssue(inputValues[0], inputValues[1], inputValues[2]);
				}}>
				Create new issue (title, description, projectId)
			</button>

			<br />

			<br />
			<br />
			<br />

			<select
				onChange={(e) => {
					fetchIssues(e.currentTarget.value);
					// might be buggy since we're using the same state as below for the search, but will be seperated anyways, so don't care
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
				onChange={(e) => {
					if (e.currentTarget.valueAsNumber) {
						setSelectedDuration(e.currentTarget.valueAsNumber);
					}
				}}></input>

			<button
				onClick={() => {
					createWorklog(issue, selectedDate, selectedDuration);
				}}>
				Add worklog
			</button>

			<br />
			<br />
			<br />

			<br />
			<br />

			<button
				onClick={() => {
					signOut(auth).then((a: any) => {
						console.log(a + "you have been signed out");
					});
				}}>
				{" "}
				log out{" "}
			</button>

			<br />
			<br />

			<select
				onChange={(e) => {
					setSelectedProjectForSearch(e.currentTarget.value);
				}}>
				<option key={0} value={""}></option>
				{projects.map((project, index) => (
					<option key={index + 1} value={project.id}>{`${
						project.data().name
					} (${project.id})`}</option>
				))}
			</select>

			<button
				onClick={() => {
					fetchIssues(selectedProjectForSearch);
					// TODO: check if the field is not empty
				}}>
				Get all issues
			</button>

			{/* Map over the issues array and render a div for each issue */}
			{issues.map((issue, index) => (
				<div key={issue.id}>
					{issue.data().title}
					<div style={{ fontSize: "0.8em" }}>
						{issue.data().description}
					</div>
				</div>
			))}
		</main>
	);
}
