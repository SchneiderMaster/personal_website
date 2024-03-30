"use client";
import React, { useState } from "react";
import styles from "./blurryblob.module.css";

export default function BlurryBlob ({xpos, ypos, width, height}) {

    return(
        <div style={{backgroundColor: "#50f", left: xpos + "vw", top: ypos + "vh", width: width, height: height}} className={styles.blob}>
            
        </div>
    )



}