import styles from './Bottom.module.scss';
import formatData from '../../utils/formatData';
import { useEffect, useState } from 'react';
import { getGameTime } from '../../utils/getGameTime';

export default function Bottom({
  started,
  game_id,
}: {
  started: number;
  game_id: string;
}) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    setInterval(() => {
      setNow(Date.now());
    }, 10000);
  }, []);
  return (
    <div className={styles['bottom']}>
      <div className={styles['bottom-left']}>
        <div className={styles['bottom-left__key']}>{game_id}</div>
        <div className={styles['bottom-left__time']}>
          {getGameTime(started, now)}
        </div>
      </div>
      <div className={styles['bottom-right']}>
        <div className={styles['bottom-right__settings']}>Настройки</div>
        <div className={styles['bottom-right__players']}>Участники</div>
        <div className={styles['bottom-right__exchange']}>Обмен</div>
        <div className={styles['bottom-right__inventory']}>Инвентарь</div>
      </div>
    </div>
  );
}
