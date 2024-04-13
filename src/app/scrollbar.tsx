import React from "react";
import styles from "./scrollbar.module.css";

export default function Scrollbar({ current }: any){

    return(
    <div className={styles.bar}>
        <div className={styles.progress}>
            {current}
        </div>
      </div>
    );


}