import styles from "@/styles/page.module.css";
import BlurryBlob from "./blurryblob"
import _ from 'lodash';
import CustomButton from "./custom-button";
import Card from "./card";
import Navbar from "./navbar";
import React from "react";

export default function Home() {



  const blobPositions = 
  [
    {xpos: 50, ypos: 60, width: 50, height: 30},
    {xpos: 40, ypos: 50, width: 80, height: 60},
    {xpos: 60, ypos: 40, width: 20, height: 40}
  ]



  return (
    <main className={styles.main}>
      <Navbar useSliding={true}></Navbar>
      {blobPositions.map((position, index) => (
        <BlurryBlob key={index} xpos={position.xpos} ypos={position.ypos} width={position.width} height={position.height}></BlurryBlob>
      ))}

      <h1 className={styles.epic}>
        <span className={styles.this}>This</span> is epic.
      </h1>
      <div className={styles.custombuttonwrapper}>
        <CustomButton backgroundImage={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/800px-GitHub_Invertocat_Logo.svg.png"} href={"https://github.com/SchneiderMaster/"}></CustomButton>
        <CustomButton backgroundImage={"https://cdn-icons-png.flaticon.com/512/48/48968.png"} href={"https://youtube.com/@pixelprodigy27"}></CustomButton>
        <CustomButton backgroundImage={"https://www.innersloth.com/wp-content/themes/innersloth/markup/assets/img/ico/ico-red-player.svg"} href={"https://www.innersloth.com/games/among-us/"}></CustomButton>
        <CustomButton backgroundImage={"https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/At_sign.svg/220px-At_sign.svg.png"} href={"mailto:pixelprodigy27@gmail.com"}></CustomButton>
      </div>
      { /* eslint-disable-next-line react/no-unescaped-entities */ }
      <p> Lorem ipsum Lorem ipsum but in cooler and a little bit longer and I am overall very coooool.</p>
        
      <Card></Card>
      <Card></Card>
    </main>
  );
}
