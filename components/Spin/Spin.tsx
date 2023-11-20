import styles from './Spin.module.scss';
import React, { useEffect, useRef } from 'react';
import Dice1 from '../Dice/Dice1';
import Dice2 from '../Dice/Dice2';
import Dice3 from '../Dice/Dice3';
import Dice4 from '../Dice/Dice4';
import Dice5 from '../Dice/Dice5';
import Dice6 from '../Dice/Dice6';
export default function Spin({ currentValue }: { currentValue: number[] }) {
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref1.current && ref2.current) {
      ref1.current?.scroll({
        top: (currentValue[0] - 1) * 80,
        left: 0,
        behavior: 'smooth',
      });
      ref2.current?.scroll({
        top: (currentValue[1] - 1) * 80,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className={styles['spin']}>
      <div className={styles['spin__item']} ref={ref1}>
        <div>
          <Dice1 />
        </div>
        <div>
          <Dice2 />
        </div>
        <div>
          <Dice3 />
        </div>
        <div>
          <Dice4 />
        </div>
        <div>
          <Dice5 />
        </div>
        <div>
          <Dice6 />
        </div>
      </div>
      <div className={styles['spin__item']} ref={ref2}>
        <div>
          <Dice1 />
        </div>
        <div>
          <Dice2 />
        </div>
        <div>
          <Dice3 />
        </div>
        <div>
          <Dice4 />
        </div>
        <div>
          <Dice5 />
        </div>
        <div>
          <Dice6 />
        </div>
      </div>
    </div>
  );
}
