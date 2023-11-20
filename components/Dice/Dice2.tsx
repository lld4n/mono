import React from 'react';
import styles from './Dice.module.scss';
export default function Dice2() {
  return (
    <div className={styles.dice}>
      <div className={styles.bullet + ' ' + styles['bullet2_1']}></div>
      <div className={styles.bullet + ' ' + styles['bullet2_2']}></div>
    </div>
  );
}
