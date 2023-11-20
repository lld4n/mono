import React from 'react';
import styles from './Dice.module.scss';
export default function Dice3() {
  return (
    <div>
      <div className={styles.dice}>
        <div className={styles.bullet + ' ' + styles['bullet3_1']}></div>
        <div className={styles.bullet + ' ' + styles['bullet3_2']}></div>
        <div className={styles.bullet + ' ' + styles['bullet3_3']}></div>
      </div>
    </div>
  );
}
