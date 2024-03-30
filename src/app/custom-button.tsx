import React from 'react';
import styles from './custom-button.module.css';

export default function CustomButton({ backgroundImage, href }) {
    return (
        <a style={{backgroundImage: 'url(' + backgroundImage + ')'}} className={styles.customButton} href={href}>
            
        </a>
    );
}