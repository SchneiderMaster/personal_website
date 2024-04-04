import React from "react";
import styles from "./card.module.css";

export default function Card() {


    return(
        <div className={styles.card}>
            <div style={{backgroundImage: "url(channels4_profile.jpg)"}}></div>
            <p>
                <h2>YouTube</h2>
                YouTube is very cool and I am also very cool. Also, please subscribe and like because I am very cool and so is my video. Maybe, one day, I will be rich with this. Then, I wouldn't have to bother with doing stuff for other people that I don't care about.
            </p>
        </div>

    )
}