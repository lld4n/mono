import React from 'react';
import styles from './Center.module.scss';
import Chat from '../Chat/Chat';
import { characters } from '../../assets/characters';
import { gameType } from '../../types/gameType';
import { GameContext } from '../../utils/GameContext';
import OpenCard from '../OpenCard/OpenCard';
import Cubic from '../Cubic/Cubic';
import useUser from '../../hooks/useUser';
import { number } from 'prop-types';
import { sendTechnicalMessage } from '../../utils/sendTechnicalMessage';
import fstore from '../../utils/firestore';
import { getFullBalance } from '../../utils/getFullBalance';
import { cardsList } from '../../assets/cards';
import { InternationalizationContext } from '../../providers/InternationalizationProvider/InternationalizationProvider';
export default function Center() {
  const context = React.useContext(GameContext);
  const user = useUser();
  const i18n = React.useContext(InternationalizationContext);
  React.useEffect(() => {
    if (context) {
      if (context.throwValue[0] !== 0 && context.throwValue[1] !== 0) {
        const gameBuffer = Object.assign({}, context.game);
        sendTechnicalMessage(
          gameBuffer.chat_id,
          gameBuffer.players[gameBuffer.currentMove.email].display_name +
            ' бросает кубики и выпадает ' +
            String(context.throwValue[0] + context.throwValue[1]),
        );
        if (context.throwValue[0] === context.throwValue[1]) {
          gameBuffer.currentMove.doubleCount++;
          gameBuffer.currentMove.double = true;
          if (gameBuffer.currentMove.doubleCount === 3) {
            // отправка в тюрьму
            context.game.currentMove.end = true;
            context.setThrowValue([0, 0]);
            console.log('changeUseEffectCenter', gameBuffer);
            fstore.set('games', context.game_id, gameBuffer);
            return;
          }
          sendTechnicalMessage(
            gameBuffer.chat_id,
            'Выпадает дубль, значит следующий ход снова делает ' +
              gameBuffer.players[gameBuffer.currentMove.email].display_name,
          );
        }
        gameBuffer.currentMove.valueDice =
          context.throwValue[0] + context.throwValue[1];
        const curPosition =
          gameBuffer.characters[
            gameBuffer.players[gameBuffer.currentMove.email].selected_character
          ];
        if (curPosition + context.throwValue[0] + context.throwValue[1] >= 40) {
          gameBuffer.players[gameBuffer.currentMove.email].balance += 2000;
          sendTechnicalMessage(
            gameBuffer.chat_id,
            'Игрок ' +
              gameBuffer.players[gameBuffer.currentMove.email].display_name +
              ' проходит круг и получает 2000 ✦',
          );
        }
        gameBuffer.characters[
          gameBuffer.players[gameBuffer.currentMove.email].selected_character
        ] = (curPosition + context.throwValue[0] + context.throwValue[1]) % 40;
        gameBuffer.currentMove.changePosition =
          (curPosition + context.throwValue[0] + context.throwValue[1]) % 40;
        setTimeout(() => {
          console.log('changeUseEffectCenter2', gameBuffer);
          fstore.set('games', context.game_id, gameBuffer);
        }, 600);
      }
    }
  }, [context?.throwValue]);

  const buyCard = (index: number) => {
    if (context && user) {
      const gameBuffer = Object.assign({}, context.game);
      gameBuffer.cards[index].status = 0;
      gameBuffer.cards[index].owner_email = user.email;
      gameBuffer.players[user.email].balance -= Math.max(
        ...(cardsList[index].prices || [0]),
      );
      sendTechnicalMessage(
        context.game.chat_id,
        'Игрок ' +
          user.display_name +
          ' покупает ячейку ' +
          i18n.cards.titles[index] +
          ' за ' +
          Math.max(...(cardsList[index].prices || [0])) +
          ' ✦',
      );
      gameBuffer.currentMove.end = true;
      context.setOpenCard(-1);
      console.log('changeBuyCardCenter', gameBuffer);
      fstore.set('games', context.game_id, gameBuffer);
    }
  };

  const pay = (value: number, whomEmail?: string) => {
    if (context && user) {
      const gameBuffer = Object.assign({}, context.game);
      if (whomEmail) {
        gameBuffer.players[whomEmail].balance += value;
        gameBuffer.players[user.email].balance -= value;
      } else {
        gameBuffer.players[user.email].balance -= value;
      }
      gameBuffer.currentMove.end = true;
      console.log('changePayCenter', gameBuffer);
      fstore.set('games', context.game_id, gameBuffer);
    }
  };

  const renderPayButton = (value: number, whomEmail?: string) => {
    if (context && user) {
      const fullBalance = getFullBalance(user.email, context.game);
      if (fullBalance > value) {
        return (
          <div className={styles.btn} onClick={() => pay(value, whomEmail)}>
            Заплатить <span className={styles.money}>{value}</span>
          </div>
        );
      } else {
        return <div className={styles.btn}>Сдаться</div>;
      }
    }
    return '';
  };

  const renderActivity = () => {
    if (user && context) {
      const fullBalance = getFullBalance(user.email, context.game);
      const changePosition = context.game.currentMove.changePosition;
      if (
        user.email === context.game.currentMove.email &&
        changePosition !== -1
      ) {
        if (context.game.cards[changePosition].status === null) {
          if (changePosition === 4) {
            return renderPayButton(2000);
          } else if (changePosition === 38) {
            return renderPayButton(1000);
          } else if (changePosition === 10) {
            const gameBuffer = Object.assign({}, context.game);
            gameBuffer.currentMove.end = true;
            fstore.set('games', context.game_id, gameBuffer);
            return '';
          } else if (changePosition === 30) {
            // тюрьма, пока скип
            const gameBuffer = Object.assign({}, context.game);
            gameBuffer.currentMove.end = true;
            fstore.set('games', context.game_id, gameBuffer);
            return '';
          }
          return 'пустой статус, карточки не улицы';
        } else if (context.game.cards[changePosition].status === -2) {
          context.setOpenCard(changePosition);
          return (
            <div className={styles.block}>
              {cardsList[changePosition].prices &&
              fullBalance >=
                Math.max(...(cardsList[changePosition].prices || [0])) ? (
                <div
                  className={styles.btn}
                  onClick={() => buyCard(changePosition)}
                >
                  Купить за
                  <span className={styles.money}>
                    {Math.max(...(cardsList[changePosition].prices || [0]))}
                  </span>
                </div>
              ) : (
                ''
              )}

              <div className={styles.btn}>Выставить на аукцион</div>
            </div>
          );
        } else if (changePosition === 12 || changePosition === 28) {
          return 'Ресурсы';
        } else if (
          context.game.cards[changePosition].owner_email &&
          context.game.cards[changePosition].owner_email !== user.email
        ) {
          return <div>Заплатить</div>;
        } else {
          const gameBuffer = Object.assign({}, context.game);
          gameBuffer.currentMove.end = true;
          fstore.set('games', context.game_id, gameBuffer);
          return '';
        }
      }
    }

    return '';
  };

  return (
    <>
      {context && user ? (
        <div className={styles.center}>
          {context.game.currentMove.email === user.email &&
          context.game.currentMove.valueDice === -1 ? (
            <Cubic set={context.setThrowValue} />
          ) : (
            ''
          )}
          {renderActivity()}
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
