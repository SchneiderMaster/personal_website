"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/navbar.module.css";
import { clamp } from "@/helpers/clamp";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { auth } from "./firebase";
import LoginButton from "./login-button";
import Link from "next/link";

export default function Navbar({ useSliding }: any) {
	const [navbarPosition, setNavbarPosition] = useState(0);

	useEffect(() => {
		function handleScroll() {
			setNavbarPosition(
				clamp(-10, (window.scrollY / window.innerHeight) * 20 - 20, 0)
			);
		}

		if (useSliding) {
			setNavbarPosition(-10);
			window.removeEventListener("scroll", handleScroll);
			window.addEventListener("scroll", handleScroll, { passive: true });
			return () => window.removeEventListener("scroll", handleScroll);
		}
	}, [useSliding]);

	return (
		<div
			className={`${styles.navbar}`}
			style={{
				top: navbarPosition + "vh",
				opacity: (navbarPosition + 10) / 10,
			}}>
			<Link href="/">Home</Link>
			<Link href="/test">Creation</Link>
			<Link href="/timetable">Timetable</Link>

			<LoginButton></LoginButton>
		</div>
	);
}
