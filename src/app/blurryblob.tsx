"use client";
import React, { useState } from "react";
import styles from "./blurryblob.module.css";

export default function BlurryBlob ({xpos, ypos, width, height} : any) {

    return(
        <div style={{backgroundColor: "#5e27cc", left: xpos + "vw", top: ypos + "vh", width: width, height: height}} className={styles.blob}>
            
        </div>
    )



}