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
import { startOfWeek } from "date-fns";

export default function TimeTable() {
	function getTime(minutes: number) {
		return `${Math.floor(minutes / 60)}:${minutes % 60 < 10 ? 0 : ""}${
			minutes % 60
		}`;
	}

	const [worklogDivs, setWorklogDivs] = useState<JSX.Element[]>([]);

	const tableCells: JSX.Element[] = [];

	const tableHeader: JSX.Element[] = [];
 
	const [dragging, setDragging] = useState<boolean>(false);

	const currentTimer = useRef<any>(null);

	const mousePosition = useMousePosition(true);

	const [worklogPoss, setWorklogPoss] = useState<number[][]>([]);

	const [worklogs, setWorklogs] = useState<QueryDocumentSnapshot[]>();

	let startTime = useRef(0);

	let stopTime = useRef(0);

	const [duration, setDuration] = useState<number>(0);

	const tableCellsRefs = useRef<RefObject<HTMLDivElement>[]>([]);

	const [startDate, setStartDate] = useState<Date>(new Date());

	const days: string[] = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday"
	]

	function getDuration(start:number, stop:number) {
		const value = Math.floor((stop-start)/7) * 900;		
		return value != 0 ? value : 900;
	}

	function createWorklogDiv(left: number, top: number, title: string, id: string, key: string, height: number | undefined, comment: string) {
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
			<div className={styles.comment}>{comment}</div>
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
					New Issue
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
		if(worklogs){
			worklogs.forEach((worklog, index) => {
				const startDate: Date = worklog.data().startDate.toDate();

				const cellIndex: number = (startDate.getHours()*60 +  startDate.getMinutes())/15*7 + startDate.getDay() -1;
				const cellPos = tableCellsRefs.current[cellIndex]?.current?.getBoundingClientRect()
				if(cellPos){
					createWorklogDiv((cellPos.x), (cellPos.y + window.scrollY), worklog.data().title, worklog.data().issueId, worklog.id.toString(), worklog.data().duration/60, worklog.data().comment);
				}
			})
		}

	}, [worklogs])


	function openCreation(duration: number, start: Date) {
		setDuration(duration);
		setStartDate(start);
		console.log(start);
	}

	function generateTimetableHeader(): JSX.Element[]{

		for (let i = 0; i < 7; i++){
			tableHeader.push(
				<div 
					key={days[i]}
					className={styles.headerCell}>
					{days[i]}
				</div>

			)
		}

		return tableHeader;

	}

	function generateTimetableCells(): JSX.Element[] {






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
						createWorklogDiv(pos.left, pos.top + window.scrollY, "", "New issue", worklogDivs.length.toString(), 15, "...");

						startTime.current = i;
					}
					}}
					onMouseUp={(e) => {
					if(e.button === 0){
						setDragging(false);
						stopTime.current = i;

						openCreation(getDuration(startTime.current, stopTime.current), new Date(startOfWeek(new Date(), {weekStartsOn: 1}).getTime() + (startTime.current % 7) * 24*60*60*1000 + (Math.floor(startTime.current/7)*15 *60*1000) ));
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
			<CreateIssue duration_={duration} start_={startDate}></CreateIssue>
			<Navbar></Navbar>
			<div>Also Hi, lol</div>

			{worklogDivs.map((worklogDiv, index) => {
				return worklogDiv;
			})}

			<div className={styles.tableHeader}>
				{generateTimetableHeader()}
			</div>

			<div className={styles.table}>
			{generateTimetableCells()}

			</div>
		</main>
	);
}
