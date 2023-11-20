'use client';
import styles from './page.module.scss';
import React, { useState } from 'react';
import Spin from '../../../components/Spin/Spin';

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
    const value1 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    const value2 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    setCurrentValue([value1, value2]);
  }
  return (
    <div className={styles['cubic']}>
      {spin ? (
        <Spin currentValue={currentValue} />
      ) : (
        <div className={styles['cubic__items']}>
          <div className={styles['cubic__item']}>
            {currentValue[0] === 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="35"
                  y="35"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
            {currentValue[0] === 6 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="10"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="10"
                  y="35"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="10"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="35"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
            {currentValue[0] === 5 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="10"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="35"
                  y="35"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="10"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
            {currentValue[0] === 4 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="10"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="10"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
            {currentValue[0] === 3 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="10"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="35"
                  y="35"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
            {currentValue[0] === 2 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="10"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
            {currentValue[0] === 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="35"
                  y="35"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
          </div>
          <div className={styles['cubic__item']}>
            {currentValue[1] === 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="35"
                  y="35"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
            {currentValue[1] === 6 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="10"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="10"
                  y="35"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="10"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="35"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
            {currentValue[1] === 5 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="10"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="35"
                  y="35"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="10"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
            {currentValue[1] === 4 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="10"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="10"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
            {currentValue[1] === 3 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="10"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="35"
                  y="35"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
            {currentValue[1] === 2 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="10"
                  y="10"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
                <rect
                  x="60"
                  y="60"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
            {currentValue[1] === 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="10" fill="white" />
                <rect
                  x="35"
                  y="35"
                  width="10"
                  height="10"
                  rx="5"
                  fill="black"
                />
              </svg>
            ) : (
              ''
            )}
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
