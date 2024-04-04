import React, { useEffect, useRef, useState } from 'react';
import styles from './custom-button.module.css';

export default function CustomButton({ backgroundImage, href }) {

    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const anchorRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: any) => {
        if (anchorRef.current) {
            const anchorRect = anchorRef.current.getBoundingClientRect();
            setMousePosition({x: (e.clientX - anchorRect.left - anchorRect.width*2/2)/1.3, y: (e.clientY - anchorRect.top - anchorRect.height*2/2)/1.3});
     }
    };


    return (
        <div className={styles.customButtonWrapper}>
            <a ref={anchorRef} className={styles.customButton} href={href} onMouseMove={handleMouseMove}>
                <div className={styles.customButtonInner} style={{backgroundImage:'url(' + backgroundImage + ')', zIndex: 3}}></div>
                <div className={styles.customButtonGradient} style={{left: mousePosition.x, top: mousePosition.y}}></div>
            </a>
        </div>
    );
}