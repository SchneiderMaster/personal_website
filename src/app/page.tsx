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

  useEffect(() => {

    for (let i = 0; i < positions.length; i++) {
      setInterval(() => updateBlobPosition(i, _.random(-2, 2), _.random(-2, 2), false), 100);

    }
  }, []);


  return (
    <main className={styles.main}>
      {/* <Scrollbar current={9}/> */}
      {positions.map((position, index) => (
        <BlurryBlob xpos={position.left} ypos={position.top} width={position.width} height={position.height}></BlurryBlob>
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
      <p>Hi, this is a very long text to see how I'm going to style such big paragraphs and I actually don't know why I just don't simply use some lorem Ipsum generator. But this way, I can actually let my inner creativeness spark. I don't know what I'm writing right here. In deutsch we would say that this is "Geschwollene Scheiße". Dies ist das Wort zum * quickly checks watch * Freitag. <br/>Hi, this is a very long text to see how I'm going to style such big paragraphs and I actually don't know why I just don't simply use some lorem Ipsum generator. But this way, I can actually let my inner creativeness spark. I don't know what I'm writing right here. In deutsch we would say that this is "Geschwollene Scheiße". Dies ist das Wort zum * quickly checks watch * Freitag. <br/>Hi, this is a very long text to see how I'm going to style such big paragraphs and I actually don't know why I just don't simply use some lorem Ipsum generator. But this way, I can actually let my inner creativeness spark. I don't know what I'm writing right here. In deutsch we would say that this is "Geschwollene Scheiße". Dies ist das Wort zum * quickly checks watch * Freitag. <br/>Hi, this is a very long text to see how I'm going to style such big paragraphs and I actually don't know why I just don't simply use some lorem Ipsum generator. But this way, I can actually let my inner creativeness spark. I don't know what I'm writing right here. In deutsch we would say that this is "Geschwollene Scheiße". Dies ist das Wort zum * quickly checks watch * Freitag. <br/>Hi, this is a very long text to see how I'm going to style such big paragraphs and I actually don't know why I just don't simply use some lorem Ipsum generator. But this way, I can actually let my inner creativeness spark. I don't know what I'm writing right here. In deutsch we would say that this is "Geschwollene Scheiße". Dies ist das Wort zum * quickly checks watch * Freitag. <br/>Hi, this is a very long text to see how I'm going to style such big paragraphs and I actually don't know why I just don't simply use some lorem Ipsum generator. But this way, I can actually let my inner creativeness spark. I don't know what I'm writing right here. In deutsch we would say that this is "Geschwollene Scheiße". Dies ist das Wort zum * quickly checks watch * Freitag. <br/>Hi, this is a very long text to see how I'm going to style such big paragraphs and I actually don't know why I just don't simply use some lorem Ipsum generator. But this way, I can actually let my inner creativeness spark. I don't know what I'm writing right here. In deutsch we would say that this is "Geschwollene Scheiße". Dies ist das Wort zum * quickly checks watch * Freitag. <br/>Hi, this is a very long text to see how I'm going to style such big paragraphs and I actually don't know why I just don't simply use some lorem Ipsum generator. But this way, I can actually let my inner creativeness spark. I don't know what I'm writing right here. In deutsch we would say that this is "Geschwollene Scheiße". Dies ist das Wort zum * quickly checks watch * Freitag. <br/>Hi, this is a very long text to see how I'm going to style such big paragraphs and I actually don't know why I just don't simply use some lorem Ipsum generator. But this way, I can actually let my inner creativeness spark. I don't know what I'm writing right here. In deutsch we would say that this is "Geschwollene Scheiße". Dies ist das Wort zum * quickly checks watch * Freitag. <br/>Hi, this is a very long text to see how I'm going to style such big paragraphs and I actually don't know why I just don't simply use some lorem Ipsum generator. But this way, I can actually let my inner creativeness spark. I don't know what I'm writing right here. In deutsch we would say that this is "Geschwollene Scheiße". Dies ist das Wort zum * quickly checks watch * Freitag.</p>
      <Card></Card>
    </main>
  );
}
