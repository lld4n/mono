import React from 'react';
import styles from './Dice.module.scss';
export default function Dice5() {
  return (
    <div className={styles.dice}>
      <div className={styles.bullet + ' ' + styles['bullet5_1']}></div>
      <div className={styles.bullet + ' ' + styles['bullet5_2']}></div>
      <div className={styles.bullet + ' ' + styles['bullet5_3']}></div>
      <div className={styles.bullet + ' ' + styles['bullet5_4']}></div>
      <div className={styles.bullet + ' ' + styles['bullet5_5']}></div>
    </div>
  );
}
