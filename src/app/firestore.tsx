import {
	DocumentData,
	QueryDocumentSnapshot,
	QuerySnapshot,
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { app, auth, db } from "./firebase";
import { getAuth, initializeAuth, onAuthStateChanged } from "firebase/auth";

export async function createIssue(
	title: string,
	description: string,
	projectId: string
) {
	try {
		if (auth.currentUser) {
			const projectSnapshot = await getDoc(
				doc(db, "users", auth.currentUser.uid, "projects", projectId)
			);

			if (projectSnapshot.exists()) {
				const index = projectSnapshot.data().currentIndex;

				await setDoc(
					doc(
						db,
						"users",
						auth.currentUser.uid,
						"issues",
						`${projectId}-${index + 1}`
					),
					{
						title: title,
						description: description,
						projectId: projectId,
					}
				);

				const newProject = { ...projectSnapshot.data() };
				newProject.currentIndex = index + 1;

				await setDoc(
					doc(
						db,
						"users",
						auth.currentUser.uid,
						"projects",
						projectId
					),
					newProject
				);
			} else {
				console.log("First create a project and select it.");
			}
		} else {
			console.log("You aren't signed in.");
		}
	} catch (err) {
		console.log(auth.currentUser?.uid + "; " + auth);

		console.log(err);
	}
}

export async function getAllIssues(projectId: string) {
	try {
		if (auth.currentUser) {
			let querySnapshot: QuerySnapshot<DocumentData, DocumentData>;
			console.log("testissues");
			if (projectId === "") {
				querySnapshot = await getDocs(
					query(
						collection(db, "users", auth.currentUser.uid, "issues")
					)
				);
			} else {
				console.log(projectId);
				querySnapshot = await getDocs(
					query(
						collection(db, "users", auth.currentUser.uid, "issues"),
						where("projectId", "==", projectId)
					)
				);
			}

			const issues: QueryDocumentSnapshot[] = [];

			querySnapshot.forEach((doc) => {
				console.log(doc.data().title);
				issues.push(doc);
			});

			return issues;
		} else {
			console.log("You aren't signed in.");
			return null;
		}
	} catch (err) {
		console.log(err);
		return null;
	}
}

export async function createProject(
	projectId: string,
	projectName: string,
	projectDescription: string
) {
	try {
		if (auth.currentUser) {
			await setDoc(
				doc(db, "users", auth.currentUser.uid, "projects", projectId),
				{
					name: projectName,
					description: projectDescription,
					currentIndex: 0,
				}
			);
		}
	} catch (err) {
		console.log(err);
	}
}

export async function getAllProjects() {
	try {
		if (auth.currentUser) {
			const querySnapshot = await getDocs(
				collection(db, "users", auth.currentUser.uid, "projects")
			);
			console.log("test");
			const projects: QueryDocumentSnapshot[] = [];

			querySnapshot.forEach((doc) => {
				projects.push(doc);
			});

			return projects;
		} else {
			console.log("You aren't signed in.");
			return null;
		}
	} catch (err) {
		console.log(err);
	}
}

export async function createWorklog(
	issueId: string,
	startDate: Date,
	duration: number,
	comment: string
) {
	try {
		if (auth.currentUser) {
			await addDoc(
				collection(db, "users", auth.currentUser.uid, "worklogs"),
				{
					startDate: startDate,
					duration: duration,
					issueId: issueId,
					comment: comment,
				}
			);
		}
	} catch (err) {
		console.log(err);
	}
}
