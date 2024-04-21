import React from "react";
import styles from "@/styles/timetable.module.css";
import "@/styles/globals.css";
import Navbar from "@/app/navbar";

export default function TimeTable() {
	function getTime(minutes: number) {
		return `${Math.floor(minutes / 60)}:${minutes % 60 < 10 ? 0 : ""}${
			minutes % 60
		}`;
	}

	function generateDivs(): JSX.Element[] {
		const divs: JSX.Element[] = [];
		const totalDivs = 96 * 7; // Total number of divs required

		for (let i = 0; i < totalDivs; i++) {
			divs.push(
				<div className={styles.cell} key={i}>
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

			<div className={styles.table}>
				{generateDivs()}

				<div
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
				</div>
			</div>
		</main>
	);
}
