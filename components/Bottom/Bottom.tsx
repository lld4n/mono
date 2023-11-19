import styles from './Bottom.module.scss';
import React, { useEffect, useState } from 'react';
import { getGameTime } from '../../utils/getGameTime';
import { GameContext } from '../../utils/GameContext';

export default function Bottom({ game_id }: { game_id: string }) {
  const [now, setNow] = useState(Date.now());
  const context = React.useContext(GameContext);
  useEffect(() => {
    setInterval(() => {
      setNow(Date.now());
    }, 10000);
  }, []);
  return (
    <div className={styles['bottom']}>
      <div className={styles['bottom-left']}>
        <div>{game_id}</div>
        <div>{getGameTime(context?.game.started, now)}</div>
      </div>
      <div className={styles['bottom-right']}>
        <div>Настройки</div>
        <div>Обмен</div>
      </div>
    </div>
  );
}
