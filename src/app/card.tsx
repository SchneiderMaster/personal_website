"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/card.module.css";

export default function Card() {


    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(targetRef.current){
          setIsVisible(entry.isIntersecting || targetRef.current.getBoundingClientRect().top <= window.innerHeight/5);
          console.log(targetRef.current.getBoundingClientRect().top + "; " + window.innerHeight/5);
      }
      },
      { threshold: 1 }
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
                <h2 className={`${isVisible ? styles.fadedIn : styles.fadedOut}`}>YouTube</h2>
                { /* eslint-disable-next-line react/no-unescaped-entities*/ } 
                YouTube is very cool and I am also very cool. Also, please subscribe and like because I am very cool and so is my video. There, I also do very cool programming stuff because I am cool. Please also comment for the algorithm and so.
            </div>
        </div>

    )
}