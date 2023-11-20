import React from 'react';
import styles from './Dice.module.scss';
export default function Dice1() {
  return (
    <div>
      <div className={styles.dice}>
        <div className={styles.bullet + ' ' + styles['bullet1_1']}></div>
      </div>
    </div>
  );
}
