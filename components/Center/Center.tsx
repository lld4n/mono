import React from 'react';
import styles from './Center.module.scss';
import Chat from '../Chat/Chat';
import { characters } from '../../assets/characters';
import { gameType } from '../../types/gameType';
import { GameContext } from '../../utils/GameContext';
import OpenCard from '../OpenCard/OpenCard';
import Cubic from '../Cubic/Cubic';
export default function Center() {
  const context = React.useContext(GameContext);
  return (
    <>
      {context ? (
        <div className={styles.center}>
          <Cubic />
          {context.openCard !== -1 ? <OpenCard /> : ''}
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
