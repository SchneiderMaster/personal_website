import React, { Ref, RefObject, useEffect, useRef, useState } from "react";
import styles from "@/styles/timetable.module.css";
import "@/styles/globals.css";
import Navbar from "@/app/navbar";
import useMousePosition from "@/helpers/useMousePosition";
import { clamp } from "@/helpers/clamp";
import { floor } from "lodash";
import { CreateIssue } from "@/app/create-issue";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { getWorklogsForWeek } from "@/app/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";

export default function TimeTable() {
	function getTime(minutes: number) {
		return `${Math.floor(minutes / 60)}:${minutes % 60 < 10 ? 0 : ""}${
			minutes % 60
		}`;
	}

	const [worklogDivs, setWorklogDivs] = useState<JSX.Element[]>([]);

	const tableCells: JSX.Element[] = [];

	const [dragging, setDragging] = useState<boolean>(false);

	const currentTimer = useRef<any>(null);

	const mousePosition = useMousePosition(true);

	const [worklogPoss, setWorklogPoss] = useState<number[][]>([]);

	const [worklogs, setWorklogs] = useState<QueryDocumentSnapshot[]>();

	let startTime = useRef(0);

	let stopTime = useRef(0);

	const [duration, setDuration] = useState<number>(0);

	const tableCellsRefs = useRef<RefObject<HTMLDivElement>[]>([]);

	function getDuration(start:number, stop:number) {
		const value = Math.floor((stop-start)/7) * 900;		
		return value != 0 ? value : 900;
	}

	function createSingleDiv(left: number, top: number, id: string, key: string, height: number | undefined, comment: string) {
		setWorklogDivs((prevDivs) => [
		  ...prevDivs,
		  <div
			key={key}
			className={styles.worklog}
			style={{
			  top: `${top}px`,
			  left: `${left}px`,
			  height: `${height ? height : 15}px`,
			}}
		  >
			{id}
			<br/>
			{comment}
		  </div>
		]);
	  
		setWorklogPoss((prevPoss) => [
		  ...prevPoss,
		  [left, top]
		]);
	  }

	useEffect(() => {

		const startTimer = () => {
			currentTimer.current = setInterval(() => {
				if(mousePosition.y){
					

					let test = [... worklogDivs];
					test[worklogDivs.length-1] = 
					<div
						className={styles.worklog}

						key={worklogDivs.length-1}
					style={{
						height: `${clamp(1, floor((mousePosition.y+window.scrollY-worklogPoss[worklogDivs.length-1][1])/15), 10000)*15}px`,
						top: `${worklogPoss[worklogDivs.length-1][1]}px`,
						left: `${worklogPoss[worklogDivs.length-1][0]}px`,
					}}>
					TE-0
				</div>

				setWorklogDivs(test);
				}



			}, 10);
		}

		if (dragging) {
			startTimer();
		}
		else {
			clearInterval(currentTimer.current);
		}
		return () => clearInterval(currentTimer.current);
	}, [dragging, mousePosition, worklogDivs, worklogPoss]);


	const fetchWorklogs = async () => {
		const snapshot = await getWorklogsForWeek(new Date());
		if(snapshot){
			setWorklogs(snapshot);
		} 
	}

	useEffect(() => {
		onAuthStateChanged(auth, () => {
			fetchWorklogs();
		});
	}, [])

	useEffect(() => {
		console.log(worklogs?.length)
		if(worklogs){
			worklogs.forEach((worklog, index) => {
				const startDate: Date = worklog.data().startDate.toDate();

				const cellIndex: number = (startDate.getHours()*60 +  startDate.getMinutes())/15*7 + startDate.getDay() -1;
				const cellPos = tableCellsRefs.current[cellIndex]?.current?.getBoundingClientRect()
				console.log(cellIndex + "; " + cellPos);
				if(cellPos){
					createSingleDiv((cellPos.x), (cellPos.y), worklog.data().issueId, worklog.id.toString(), worklog.data().duration/60, worklog.data().comment);
				}
			})
		}

	}, [worklogs])


	function openCreation(duration: number) {
		setDuration(duration);
	}

	function generateDivs(): JSX.Element[] {
		const totalDivs = 96 * 7; // Total number of divs required

		for (let i = 0; i < totalDivs; i++) {
			tableCellsRefs.current[i] = React.createRef();
			tableCells.push(
				<div
					className={`${styles.cell} ${
						Math.floor(i / 7) % 4 === 0 ? styles.fullHour : ""
					}`}
					key={i}
					onMouseOver={() => {
						setDuration(0);
					}}
					onMouseDown={(e) => {
						if(e.button === 0){
						setDragging(true);
						let pos = e.currentTarget.getBoundingClientRect();
						createSingleDiv(pos.left, pos.top + window.scrollY, "test", worklogDivs.length.toString(), 15, "...");

						startTime.current = i;
					}
					}}
					onMouseUp={(e) => {
					if(e.button === 0){
						setDragging(false);
						stopTime.current = i;

						openCreation(getDuration(startTime.current, stopTime.current));
					}
					}}
					ref={tableCellsRefs.current[i]}
				>
					<div className={styles.cellText}>
						{getTime(Math.floor(i / 7) * 15)}
					</div>
				</div>
			);
		}

		return tableCells;
	}

	return (
		<main className={styles.main}>
			<CreateIssue duration_={duration}></CreateIssue>
			<Navbar></Navbar>
			<div>Also Hi, lol</div>

			{worklogDivs.map((worklogDiv, index) => {
				return worklogDiv;
			})}

			<div className={styles.table}>
				{generateDivs()}
			</div>
		</main>
	);
}
