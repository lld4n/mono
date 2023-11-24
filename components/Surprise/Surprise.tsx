import React from 'react';
import styles from './Surprise.module.scss';
import gift from '../../assets/cards/gift.svg';
import dice from '../../assets/cards/dice.svg';
import Image from 'next/image';
import { GameContext } from '../../utils/GameContext';
import useUser from '../../hooks/useUser';
import fstore from '../../utils/firestore';
import { sendTechnicalMessage } from '../../utils/sendTechnicalMessage';
type surpriseType = {
  type: 'plus' | 'minus';
  value: number;
  text: string;
};
const surpriseList: surpriseType[] = [
  {
    type: 'plus',
    value: 1000,
    text: 'Вы выиграли в лотерею',
  },
  {
    type: 'minus',
    value: 500,
    text: 'Вы проиграли в лотерею',
  },
];
export default function Surprise({
  type,
  renderPayButton,
}: {
  type: 'box' | 'chance';
  renderPayButton: (
    value: number,
    whomEmail?: string,
  ) => React.JSX.Element | '';
}) {
  const [indexSurprise, setSurprise] = React.useState(-1);
  const context = React.useContext(GameContext);
  const user = useUser();
  React.useEffect(() => {
    if (context && user) {
      if (indexSurprise !== -1) {
        if (surpriseList[indexSurprise].type === 'minus') {
          sendTechnicalMessage(
            context.game.chat_id,
            user.display_name +
              ' выбрал карточку сюрприза и должен заплатить ' +
              surpriseList[indexSurprise].value +
              ' ✦',
          );
        } else if (surpriseList[indexSurprise].type === 'plus') {
          sendTechnicalMessage(
            context.game.chat_id,
            user.display_name +
              ' выбрал карточку сюрприза и получает ' +
              surpriseList[indexSurprise].value +
              ' ✦',
          );
          const gameBuffer = Object.assign({}, context.game);
          gameBuffer.players[user.email].balance +=
            surpriseList[indexSurprise].value;
          gameBuffer.currentMove.end = true;
          setTimeout(() => {
            fstore.set('games', context.game_id, gameBuffer);
          }, 300);
        }
      }
    }
  }, [indexSurprise]);

  return (
    <>
      {indexSurprise !== -1 ? (
        <>
          {surpriseList[indexSurprise].type === 'minus'
            ? renderPayButton(surpriseList[indexSurprise].value)
            : ''}

          <div className={styles.card}>{surpriseList[indexSurprise].text}</div>
        </>
      ) : (
        <div className={styles.surprise}>
          Выберите один из вариантов
          <div className={styles.wrapper}>
            {new Array(4).fill(0).map((_, index) => {
              return (
                <div
                  key={index}
                  className={styles.btn}
                  onClick={() =>
                    setSurprise(Math.floor(Math.random() * surpriseList.length))
                  }
                >
                  {type === 'box' ? (
                    <Image src={gift} alt={'gift'} width={40} height={40} />
                  ) : (
                    <Image src={dice} alt={'dice'} width={40} height={40} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
