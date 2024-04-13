'use client';
import styles from "./page.module.css";
import Scrollbar from "./scrollbar";
import BlurryBlob from "./blurryblob"
import { useEffect, useState } from "react";
import _ from 'lodash';
import CustomButton from "./custom-button";
import Card from "./card";

export default function Home() {

  const [positions, setPositions] = useState([
    {left: 50, top: 60, width: 50, height: 30},
    {left: 40, top: 50, width: 80, height: 60},
    {left: 60, top: 40, width: 20, height: 40}
  ])


  function clamp(min: number, value: number, max: number){
    if(value > max){
      return max;
    }
    if(value < min) {
      return min;
    }
    return value;
  }



  useEffect(() => {


  function updateBlobPosition(index: number, xOffset: number, yOffset: number, useAbsolutePosition: boolean){
    setPositions(prevPositions => {
      const newPositions = [...prevPositions];
      newPositions[index] = useAbsolutePosition ? 
      {
        left: xOffset,
        top: yOffset + window.scrollY/window.innerHeight*100,
        width: prevPositions[index].width,
        height: prevPositions[index].height
      }
      : {
        left: clamp(40, prevPositions[index].left + xOffset, 60),
        top: clamp(40 + window.scrollY/window.innerHeight*100, prevPositions[index].top + yOffset, 60+ window.scrollY/window.innerHeight*100),
        width: prevPositions[index].width,
        height: prevPositions[index].height
      };
      return newPositions;
    });

  }

    for (let i = 0; i < positions.length; i++) {
      setInterval(() => updateBlobPosition(i, _.random(-2, 2), _.random(-2, 2), false), 100);

    }
  }, [positions.length]);


  return (
    <main className={styles.main}>
      {/* <Scrollbar current={9}/> */}
      {positions.map((position, index) => (
        <BlurryBlob key={index} xpos={position.left} ypos={position.top} width={position.width} height={position.height}></BlurryBlob>
      ))}

      <h1 className={styles.epic}>
        <span className={styles.this}>This</span> is epic.
      </h1>
    	
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className={styles.custombuttonwrapper}>
        <CustomButton backgroundImage={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/800px-GitHub_Invertocat_Logo.svg.png"} href={"https://github.com/SchneiderMaster/"}></CustomButton>
        <CustomButton backgroundImage={"https://cdn-icons-png.flaticon.com/512/48/48968.png"} href={"https://youtube.com/@pixelprodigy27"}></CustomButton>
        <CustomButton backgroundImage={"https://www.innersloth.com/wp-content/themes/innersloth/markup/assets/img/ico/ico-red-player.svg"} href={"https://www.innersloth.com/games/among-us/"}></CustomButton>
        <CustomButton backgroundImage={"https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/At_sign.svg/220px-At_sign.svg.png"} href={"mailto:pixelprodigy27@gmail.com"}></CustomButton>
      </div>
      { /* eslint-disable-next-line react/no-unescaped-entities */ }
      <p> Lorem ipsum Lorem ipsum but in cooler and a little bit longer and I am overall very coooool.</p>
        
              <Card></Card>
    </main>
  );
}
