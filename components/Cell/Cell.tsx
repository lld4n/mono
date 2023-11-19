import React from 'react';
import styles from './Cell.module.scss';
import { gameType } from '../../types/gameType';
import Image from 'next/image';
import { cardsList } from '../../assets/cards';
import { GameContext } from '../../utils/GameContext';
import block from '../../assets/cards/block.svg';
const ignoreList = [0, 2, 4, 7, 10, 17, 20, 22, 30, 33, 36, 38];
export default function Cell({ index }: { index: number }) {
  const context = React.useContext(GameContext);

  const getPrice = React.useCallback((index: number) => {
    if (context && !ignoreList.includes(index)) {
      const cardBuffer = context.game.cards[index];
      if (cardBuffer.status === -2) {
        if (index === 12 || index === 28 || index % 5 === 0) {
          return cardsList[index].prices?.[1];
        }

        return cardsList[index].prices?.[3];
      }
      return '123';
    }
    return '';
  }, []);

  if (!context) {
    return '';
  }

  if (context.game.cards[index].status === -1) {
    return (
      <div className={styles.cellVer}>
        <div className={styles.cellBottom}>
          <Image src={block} alt={'block'} width={32} height={32} />
        </div>
      </div>
    );
  }

  if (index === 0) {
    return (
      <div className={styles.start} onClick={() => context?.setOpenCard(index)}>
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
      <div
        className={styles.prison}
        onClick={() => context?.setOpenCard(index)}
      >
        <Image
          priority={true}
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
      <div
        className={styles.parking}
        onClick={() => context?.setOpenCard(index)}
      >
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
      <div
        className={styles.police}
        onClick={() => context?.setOpenCard(index)}
      >
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
      <div
        className={styles.cellVer}
        onClick={() => context?.setOpenCard(index)}
      >
        <div className={styles.cellTop}>{getPrice(index)}</div>
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
      <div
        className={styles.cellVer}
        onClick={() => context?.setOpenCard(index)}
      >
        <div className={styles.cellBottom}>
          <Image
            src={cardsList[index].svg}
            alt={'train'}
            width={32}
            height={44}
          />
        </div>
        <div className={styles.cellTop}>{getPrice(index)}</div>
      </div>
    );
  }

  if (index === 15) {
    return (
      <div
        className={styles.cellHor}
        onClick={() => context?.setOpenCard(index)}
      >
        <div className={styles.cellBottom}>
          <Image
            src={cardsList[index].svg}
            alt={'train'}
            width={44}
            height={32}
          />
        </div>
        <div className={styles.cellTop}>{getPrice(index)}</div>
      </div>
    );
  }

  if (index === 35) {
    return (
      <div
        className={styles.cellHor}
        onClick={() => context?.setOpenCard(index)}
      >
        <div className={styles.cellLeftWrapper}>
          <div className={styles.cellLeft}>{getPrice(index)}</div>
        </div>
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
      <div
        className={styles.cellVer}
        onClick={() => context?.setOpenCard(index)}
      >
        {ignoreList.includes(index) ? (
          <div className={styles.plug}></div>
        ) : (
          <div className={styles.cellTop}>{getPrice(index)}</div>
        )}

        <div
          className={styles.cellBottom}
          onClick={() => context?.setOpenCard(index)}
        >
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
      <div
        className={styles.cellHor}
        onClick={() => context?.setOpenCard(index)}
      >
        <div className={styles.cellBottom}>
          <Image
            src={cardsList[index].svg}
            alt={String(index)}
            width={32}
            height={32}
          />
        </div>
        {ignoreList.includes(index) ? (
          <div className={styles.plug}></div>
        ) : (
          <div className={styles.cellTop}>{getPrice(index)}</div>
        )}
      </div>
    );
  }

  if (index < 30) {
    return (
      <div
        className={styles.cellVer}
        onClick={() => context?.setOpenCard(index)}
      >
        <div className={styles.cellBottom}>
          <Image
            src={cardsList[index].svg}
            alt={String(index)}
            width={32}
            height={32}
          />
        </div>
        {ignoreList.includes(index) ? (
          <div className={styles.plug}></div>
        ) : (
          <div className={styles.cellTop}>{getPrice(index)}</div>
        )}
      </div>
    );
  }

  if (index < 40) {
    return (
      <div
        className={styles.cellHor}
        onClick={() => context?.setOpenCard(index)}
      >
        {ignoreList.includes(index) ? (
          <div className={styles.plug}></div>
        ) : (
          <div className={styles.cellLeftWrapper}>
            <div className={styles.cellLeft}>{getPrice(index)}</div>
          </div>
        )}
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
