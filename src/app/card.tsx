import React, { useEffect, useRef, useState } from "react";
import styles from "./card.module.css";

export default function Card() {


    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);


    return(
        <div className={`${styles.card} ${isVisible ? styles.visible : styles.invisible}`} style={{backgroundPositionX: isVisible ? styles.visible : styles.invisible}} ref={targetRef}>
            <div className={styles.image} style={{backgroundImage: "url(channels4_profile.jpg)"}}></div>
            <div className={styles.text}>
                <h2>YouTube</h2>
                YouTube is very cool and I am also very cool. Also, please subscribe and like because I am very cool and so is my video. Maybe, one day, I will be rich with this. Then, I wouldn't have to bother with doing stuff for other people that I don't care about.
            </div>
        </div>

    )
}