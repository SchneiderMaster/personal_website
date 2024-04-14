"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/blurryblob.module.css";
import { clamp } from "@/helpers/clamp";
import _ from "lodash";

export default function BlurryBlob ({xpos, ypos, width, height} : any) {



  const [blobPosition, setBlobPosition] = useState([xpos, ypos])


  useEffect(() => {


  function updateBlobPosition(index: number, xOffset: number, yOffset: number){
    setBlobPosition((prevPosition: number[]) => {
      let newPosition = [
        clamp(40, prevPosition[0] + xOffset, 60),
        clamp(40 + window.scrollY/window.innerHeight*100, prevPosition[1] + yOffset, 60+ window.scrollY/window.innerHeight*100)
      ];
      return newPosition;
    });

  }

    for (let i = 0; i < blobPosition.length; i++) {
      setInterval(() => updateBlobPosition(i, _.random(-2, 2), _.random(-2, 2)), 100);

    }
  }, [blobPosition.length]);




    return(
        <div style={{backgroundColor: "#5e27cc", left: blobPosition[0] + "vw", top: blobPosition[1] + "vh", width: width, height: height}} className={styles.blob}>
            
        </div>
    )



}