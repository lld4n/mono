import styles from './Sidebar.module.scss';
import { characters } from '../../assets/characters';
import React from 'react';
import { GameContext } from '../../utils/GameContext';

export default function Sidebar() {
  const context = React.useContext(GameContext);
  return (
    <>
      {context ? (
        <div className={styles.sidebar}>
          {Object.keys(context.game.players).map((player, index) => (
            <div
              key={index}
              className={styles.player}
              style={{
                backgroundColor:
                  characters[context.game.players[player].selected_character]
                    .color,
                color:
                  characters[context.game.players[player].selected_character]
                    .opposite,
              }}
            >
              <div className={styles['player__name']}>
                {context.game.players[player].display_name}
              </div>
              <div className={styles['player__balance']}>
                {context.game.players[player].balance}
              </div>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
}
