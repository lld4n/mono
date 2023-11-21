import styles from './Sidebar.module.scss';
import { characters } from '../../assets/characters';
import React from 'react';
import { GameContext } from '../../utils/GameContext';
import { InternationalizationContext } from '../../providers/InternationalizationProvider/InternationalizationProvider';

export default function Sidebar() {
  const context = React.useContext(GameContext);
  const i18n = React.useContext(InternationalizationContext);
  return (
    <>
      {context ? (
        <div className={styles.sidebar}>
          {context.game.users.map((player, index) => (
            <div
              key={index}
              className={
                context.game.currentMove.email === player.email
                  ? styles.playerActive
                  : styles.player
              }
              style={{
                backgroundColor:
                  characters[
                    context.game.players[player.email].selected_character
                  ].color,
                color:
                  characters[
                    context.game.players[player.email].selected_character
                  ].opposite,
              }}
            >
              <div className={styles['player__name']}>
                {context.game.players[player.email].display_name}
              </div>
              {context.game.currentMove.email === player.email ? (
                <div>{i18n.currentMove}</div>
              ) : (
                ''
              )}
              <div className={styles['player__balance']}>
                {context.game.players[player.email].balance}
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
