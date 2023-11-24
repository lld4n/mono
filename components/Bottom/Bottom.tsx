import styles from './Bottom.module.scss';
import React, { useEffect, useState } from 'react';
import { getGameTime } from '../../utils/getGameTime';
import { GameContext } from '../../utils/GameContext';

export default function Bottom() {
  const context = React.useContext(GameContext);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    setInterval(() => {
      setNow(Date.now());
    }, 10000);
  }, []);
  return (
    <>
      {context ? (
        <div className={styles['bottom']}>
          <div className={styles['bottom-left']}>
            <div>{context.game_id}</div>
            <div>{getGameTime(context.game.started, now)}</div>
            <div>{JSON.stringify(context.game.characters)}</div>
          </div>
          <div className={styles['bottom-right']}>
            <div>Настройки</div>
            <div>Обмен</div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
