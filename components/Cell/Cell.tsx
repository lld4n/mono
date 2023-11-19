import React from 'react';
import styles from './Cell.module.scss';
import { gameType } from '../../types/gameType';
import Image from 'next/image';
import { cardsList } from '../../assets/cards';
import { GameContext } from '../../utils/GameContext';

export default function Cell({ index }: { index: number }) {
  const context = React.useContext(GameContext);
  if (!context) {
    return '';
  }

  if (index === 0) {
    return (
      <div className={styles.start}>
        <Image
          src={cardsList[index].svg}
          alt={'start'}
          width={32}
          height={32}
        />
      </div>
    );
  }

  if (index === 10) {
    return (
      <div className={styles.prison}>
        <Image
          src={cardsList[index].svg}
          alt={'prison'}
          width={74}
          height={74}
        />
      </div>
    );
  }

  if (index === 20) {
    return (
      <div className={styles.parking}>
        <Image
          src={cardsList[index].svg}
          alt={'parking'}
          width={32}
          height={32}
        />
      </div>
    );
  }

  if (index === 30) {
    return (
      <div className={styles.police}>
        <Image
          src={cardsList[index].svg}
          alt={'police'}
          width={32}
          height={32}
        />
      </div>
    );
  }

  if (index === 5) {
    return (
      <div className={styles.cellVer}>
        <div className={styles.cellTop}></div>
        <div className={styles.cellBottom}>
          <Image
            src={cardsList[index].svg}
            alt={'train'}
            width={32}
            height={44}
          />
        </div>
      </div>
    );
  }

  if (index === 25) {
    return (
      <div className={styles.cellVer}>
        <div className={styles.cellBottom}>
          <Image
            src={cardsList[index].svg}
            alt={'train'}
            width={32}
            height={44}
          />
        </div>
        <div className={styles.cellTop}></div>
      </div>
    );
  }

  if (index === 15) {
    return (
      <div className={styles.cellHor}>
        <div className={styles.cellBottom}>
          <Image
            src={cardsList[index].svg}
            alt={'train'}
            width={44}
            height={32}
          />
        </div>
        <div className={styles.cellTop}></div>
      </div>
    );
  }

  if (index === 35) {
    return (
      <div className={styles.cellHor}>
        <div className={styles.cellTop}></div>
        <div className={styles.cellBottom}>
          <Image
            src={cardsList[index].svg}
            alt={'train'}
            width={44}
            height={32}
          />
        </div>
      </div>
    );
  }

  if (index < 10) {
    return (
      <div className={styles.cellVer}>
        <div className={styles.cellTop}></div>
        <div className={styles.cellBottom}>
          <Image
            src={cardsList[index].svg}
            alt={String(index)}
            width={32}
            height={32}
          />
        </div>
      </div>
    );
  }

  if (index < 20) {
    return (
      <div className={styles.cellHor}>
        <div className={styles.cellBottom}>
          <Image
            src={cardsList[index].svg}
            alt={String(index)}
            width={32}
            height={32}
          />
        </div>
        <div className={styles.cellTop}></div>
      </div>
    );
  }

  if (index < 30) {
    return (
      <div className={styles.cellVer}>
        <div className={styles.cellBottom}>
          <Image
            src={cardsList[index].svg}
            alt={String(index)}
            width={32}
            height={32}
          />
        </div>
        <div className={styles.cellTop}></div>
      </div>
    );
  }

  if (index < 40) {
    return (
      <div className={styles.cellHor}>
        <div className={styles.cellTop}></div>
        <div className={styles.cellBottom}>
          <Image
            src={cardsList[index].svg}
            alt={String(index)}
            width={32}
            height={32}
          />
        </div>
      </div>
    );
  }
  return <div>Cell</div>;
}
