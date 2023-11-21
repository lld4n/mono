import React from 'react';
import styles from './Cubic.module.scss';
import Dice0 from '../Dice/Dice0';
import Spin from '../Spin/Spin';

export default function Cubic() {
  const [currentValue, setCurrentValue] = React.useState<[number, number]>([
    0, 0,
  ]);
  const [spin, setSpin] = React.useState(false);

  function clickButton() {
    const value1 = Math.floor(Math.random() * 6 + 1);
    const value2 = Math.floor(Math.random() * 6 + 1);
    setCurrentValue([value1, value2]);
    setSpin(true);
  }
  return (
    <div className={styles['cubic']}>
      {spin ? (
        <Spin currentValue={currentValue} />
      ) : (
        <div className={styles['cubic__items']}>
          <div className={styles['cubic__item']}>
            <Dice0 />
          </div>
          <div className={styles['cubic__item']}>
            <Dice0 />
          </div>
        </div>
      )}
      {spin ? (
        ''
      ) : (
        <div className={styles['cubic__button']} onClick={clickButton}>
          {!spin ? 'Бросить кубики' : ''}
        </div>
      )}
    </div>
  );
}
