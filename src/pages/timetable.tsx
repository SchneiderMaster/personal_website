import React, { Ref, useEffect, useRef, useState } from "react";
import styles from "@/styles/timetable.module.css";
import "@/styles/globals.css";
import Navbar from "@/app/navbar";
import useMousePosition from "@/helpers/useMousePosition";
import { clamp } from "@/helpers/clamp";
import { floor } from "lodash";
import { CreateIssue } from "@/app/create-issue";

export default function TimeTable() {
	function getTime(minutes: number) {
		return `${Math.floor(minutes / 60)}:${minutes % 60 < 10 ? 0 : ""}${
			minutes % 60
		}`;
	}

	const [worklogDivs, setWorklogDivs] = useState<JSX.Element[]>([]);

	const [dragging, setDragging] = useState<boolean>(false);

	const currentTimer = useRef<any>(null);

	const mousePosition = useMousePosition(true);

	const [worklogPoss, setWorklogPoss] = useState<number[][]>([]);

	let startTime = useRef(0);

	let stopTime = useRef(0);

	const [duration, setDuration] = useState<number>(0);

	function getDuration(start:number, stop:number) {
		const value = Math.floor((stop-start)/7) * 900;		
		return value != 0 ? value : 900;
	}

	function createSingleDiv(left: number, top: number) {
		let tempDivs = [...worklogDivs];
		let tempPoss = [...worklogPoss];
		tempDivs.push(
			<div
				key={tempDivs.length}
				className={styles.worklog}
				style={{
					top: `${top}px`,
					left: `${left}px`,
					height: `${15}px`,
				}}>
				TE-0
			</div>
		);

		tempPoss.push([left, top]);

		setWorklogPoss(tempPoss);
		setWorklogDivs(tempDivs);
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



	function openCreation(duration: number) {
		setDuration(duration);
		console.log(duration);
	}

	function generateDivs(): JSX.Element[] {
		const divs: JSX.Element[] = [];
		const totalDivs = 96 * 7; // Total number of divs required

		for (let i = 0; i < totalDivs; i++) {
			divs.push(
				<div
					className={`${styles.cell} ${
						Math.floor(i / 7) % 4 === 0 ? styles.fullHour : ""
					}`}
					key={i}
					onMouseDown={(e) => {
						if(e.button === 0){
						setDragging(true);
						let pos = e.currentTarget.getBoundingClientRect();
						createSingleDiv(pos.left, pos.top + window.scrollY);

						startTime.current = i;
					}
					}}
					onMouseUp={(e) => {
					if(e.button === 0){
						console.log("up");
						setDragging(false);
						stopTime.current = i;

						openCreation(getDuration(startTime.current, stopTime.current));
					}
					}}
				>
					<div className={styles.cellText}>
						{getTime(Math.floor(i / 7) * 15)}
					</div>
				</div>
			);
		}

		return divs;
	}

	return (
		<main className={styles.main}>
			<CreateIssue duration={duration} style={{display: `${duration == 0 ? "none" : "flex"}`}}></CreateIssue>
			<Navbar></Navbar>
			<div>Also Hi, lol</div>

			{worklogDivs.map((worklogDiv, index) => {
				return worklogDiv;
			})}

			<div className={styles.table}>
				{generateDivs()}

				{/* <div
					style={{
						backgroundColor: "#aaa",
						gridArea: "4 / 2 / 12 / 2",
						borderRadius: "10px",
						margin: "1px 7px 3px 7px",
						color: "#444",
						padding: "5px 7px 7px 7px",
					}}>
					TE-0
				</div>

				<div
					style={{
						backgroundColor: "#aaa",
						gridArea: "12 / 2 / 16 / 2",
						borderRadius: "10px",
						margin: "1px 7px 3px 7px",
						color: "#444",
						padding: "5px 7px 7px 7px",
					}}>
					TE-1
				</div> */}
			</div>
		</main>
	);
}
