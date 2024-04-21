import React, { Ref, useEffect, useRef, useState } from "react";
import styles from "@/styles/timetable.module.css";
import "@/styles/globals.css";
import Navbar from "@/app/navbar";

export default function TimeTable() {
	function getTime(minutes: number) {
		return `${Math.floor(minutes / 60)}:${minutes % 60 < 10 ? 0 : ""}${
			minutes % 60
		}`;
	}

	const [worklogDivs, setWorklogDivs] = useState<JSX.Element[]>([]);

	const [dragging, setDragging] = useState<boolean>(false);

	function createSingleDiv(left: number, top: number) {
		let tempDivs = [...worklogDivs];
		tempDivs.push(
			<div
				style={{
					position: "absolute",
					top: `${top}px`,
					left: `${left}px`,
					width: "200px",
					height: `${15 * 1}px`,
					backgroundColor: "#5e27cc",
					zIndex: 100,
					overflow: "hidden",
				}}>
				TE-0
			</div>
		);
		setWorklogDivs(tempDivs);
	}

	useEffect(() => {
		const whileDragging = () => {
			const intervalId = setInterval(() => {
				console.log("dragging");
				if (!dragging) {
					clearInterval(intervalId);
				}
			}, 10);
			return () => clearInterval(intervalId);
		};

		if (dragging) {
			whileDragging();
		}
	}, [dragging]);

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
						setDragging(true);
						let pos = e.currentTarget.getBoundingClientRect();
						createSingleDiv(pos.left, pos.top);

						console.log(pos.x, pos.y);
					}}
					onMouseUp={() => {
						console.log("up");
						setDragging(false);
					}}
					// onMouseDown={(e) => {
					// 	console.log(e.clientX, e.clientY);
					// }}
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
