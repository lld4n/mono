'use client';
import styles from './page.module.scss';
import React, { useState } from 'react';
import Spin from '../../../components/Spin/Spin';
import Dice1 from '../../../components/Dice/Dice1';
import Dice2 from '../../../components/Dice/Dice2';
import Dice3 from '../../../components/Dice/Dice3';
import Dice4 from '../../../components/Dice/Dice4';
import Dice5 from '../../../components/Dice/Dice5';
import Dice6 from '../../../components/Dice/Dice6';
export default function Cubic() {
  //массив, в котором первое число - значение первого кубика, а второе число - значение второго кубика
  const [currentValue, setCurrentValue] = useState<number[]>([0, 0]);
  const [spin, setSpin] = useState(false);
  function clickButton() {
    setSpin(true);
    getRandomNumber();
    setTimeout(() => {
      setSpin(false);
    }, 500);
  }
  function getRandomNumber() {
    //получение чисел от 1 до 6
    const value1 = Math.floor(Math.random() * 6 + 1);
    const value2 = Math.floor(Math.random() * 6 + 1);
    setCurrentValue([value1, value2]);
  }
  return (
    <div className={styles['cubic']}>
      {spin ? (
        <Spin currentValue={currentValue} />
      ) : (
        <div className={styles['cubic__items']}>
          <div className={styles['cubic__item']}>
            {currentValue[0] === 0 ? <Dice1 /> : ''}
            {currentValue[0] === 6 ? <Dice6 /> : ''}
            {currentValue[0] === 5 ? <Dice5 /> : ''}
            {currentValue[0] === 4 ? <Dice4 /> : ''}
            {currentValue[0] === 3 ? <Dice3 /> : ''}
            {currentValue[0] === 2 ? <Dice2 /> : ''}
            {currentValue[0] === 1 ? <Dice1 /> : ''}
          </div>
          <div className={styles['cubic__item']}>
            {currentValue[1] === 0 ? <Dice1 /> : ''}
            {currentValue[1] === 6 ? <Dice6 /> : ''}
            {currentValue[1] === 5 ? <Dice5 /> : ''}
            {currentValue[1] === 4 ? <Dice4 /> : ''}
            {currentValue[1] === 3 ? <Dice3 /> : ''}
            {currentValue[1] === 2 ? <Dice2 /> : ''}
            {currentValue[1] === 1 ? <Dice1 /> : ''}
          </div>
        </div>
      )}
      <div
        className={
          spin
            ? [styles['cubic__button'], styles['disabled']].join('')
            : styles['cubic__button']
        }
        onClick={clickButton}
        style={{ height: 37 }}
      >
        {!spin ? 'Бросить кубики' : ''}
      </div>
    </div>
  );
}
