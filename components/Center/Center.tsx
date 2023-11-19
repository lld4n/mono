import React from 'react';
import styles from './Center.module.scss';
import Chat from '../Chat/Chat';
import { characters } from '../../assets/characters';
import { gameType } from '../../types/gameType';
import { GameContext } from '../../utils/GameContext';
export default function Center() {
  const context = React.useContext(GameContext);
  return (
    <>
      {context ? (
        <div className={styles.center}>
          <Chat
            chat_id={context.game.chat_id}
            colors={context.game.users.map((el) => {
              if (el.selected_character !== -1) {
                return {
                  color: characters[el.selected_character].color,
                  email: el.email,
                  opposite: characters[el.selected_character].opposite,
                };
              } else {
                return {
                  color: '',
                  email: '',
                  opposite: '',
                };
              }
            })}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
}
