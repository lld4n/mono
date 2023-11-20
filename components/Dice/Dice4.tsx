import React from 'react';
import styles from './Dice.module.scss';
export default function Dice4() {
  return (
    <div>
      <div className={styles.dice}>
        <div className={styles.bullet + ' ' + styles['bullet4_1']}></div>
        <div className={styles.bullet + ' ' + styles['bullet4_2']}></div>
        <div className={styles.bullet + ' ' + styles['bullet4_3']}></div>
        <div className={styles.bullet + ' ' + styles['bullet4_4']}></div>
      </div>
    </div>
  );
}
