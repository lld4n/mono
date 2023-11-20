import React from 'react';
import styles from './Dice.module.scss';
export default function Dice6() {
  return (
    <div className={styles.dice}>
      <div className={styles.bullet + ' ' + styles['bullet6_1']}></div>
      <div className={styles.bullet + ' ' + styles['bullet6_2']}></div>
      <div className={styles.bullet + ' ' + styles['bullet6_3']}></div>
      <div className={styles.bullet + ' ' + styles['bullet6_4']}></div>
      <div className={styles.bullet + ' ' + styles['bullet6_5']}></div>
      <div className={styles.bullet + ' ' + styles['bullet6_6']}></div>
    </div>
  );
}
