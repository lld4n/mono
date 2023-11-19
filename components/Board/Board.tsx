import styles from './Board.module.scss';
import { gameType } from '../../types/gameType';
import { cardsList } from '../../assets/cards';
import Image from 'next/image';
import Center from '../Center/Center';
import Cell from '../Cell/Cell';

const listIndex: number[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 39, -1, 11, 38, 12, 37, 13, 36, 14, 35, 15,
  34, 16, 33, 17, 32, 18, 31, 19, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20,
];

export default function Board() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.board}>
        {listIndex.map((el) => {
          if (el === -1) {
            return <Center key={el} />;
          } else {
            return <Cell key={el} index={el} />;
          }
        })}
      </div>
    </div>
  );
}
