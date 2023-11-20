import React from 'react';
import styles from './OpenCard.module.scss';
import { GameContext } from '../../utils/GameContext';
import { InternationalizationContext } from '../../providers/InternationalizationProvider/InternationalizationProvider';
import { cardsList, cardsTypeEnum } from '../../assets/cards';
import Image from 'next/image';

const ignoreList = [0, 2, 4, 7, 10, 17, 20, 22, 30, 33, 36, 38];
export default function OpenCard() {
  const context = React.useContext(GameContext);
  const i18n = React.useContext(InternationalizationContext);
  const [close, setClose] = React.useState(true);

  return (
    <>
      {context ? (
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <div className={styles.block}>
              <div className={styles.title}>
                {i18n.cards.titles[context.openCard]}
              </div>
              <div className={styles.hideWrapper}>
                <div className={styles.hide} onClick={() => setClose(!close)}>
                  {close ? i18n.disclose : i18n.close}
                </div>
                {ignoreList.includes(context.openCard) ? (
                  <div
                    className={styles.exit}
                    onClick={() => context?.setOpenCard(-1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M1 1L6 6M11 11L6 6M6 6L11 1M6 6L1 11"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            {close ? (
              ''
            ) : (
              <div className={styles.text}>
                {i18n.cards.info[cardsList[context.openCard].type]}
              </div>
            )}
          </div>
          {ignoreList.includes(context.openCard) ? (
            ''
          ) : (
            <div className={styles.bottom}>
              <div className={styles.bottomTop}>
                <div className={styles.group}>
                  {cardsList[context.openCard].group?.map((el) => {
                    return (
                      <Image
                        key={el}
                        src={cardsList[el].svg}
                        alt={''}
                        width={20}
                        height={20}
                      />
                    );
                  })}
                </div>
                <div
                  className={styles.exit}
                  onClick={() => context?.setOpenCard(-1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M1 1L6 6M11 11L6 6M6 6L11 1M6 6L1 11"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className={styles.bottomBottom}>
                <Image
                  src={cardsList[context.openCard].svg}
                  alt={''}
                  width={50}
                  height={50}
                />
                <div className={styles.content}>
                  {cardsList[context.openCard].rent?.map((el, index) => {
                    return (
                      <div key={index} className={styles.item}>
                        <div>
                          {cardsList[context.openCard].type ===
                          cardsTypeEnum.STREET
                            ? i18n.cards.street.rent[index]
                            : cardsList[context.openCard].type ===
                                cardsTypeEnum.TRAIN
                              ? i18n.cards.train.rent[index]
                              : cardsList[context.openCard].type ===
                                  cardsTypeEnum.RESOURCES
                                ? i18n.cards.resources.rent[index]
                                : ''}
                        </div>
                        <div className={styles.money}>{el}</div>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.content}>
                  {cardsList[context.openCard].prices?.map((el, index) => {
                    return (
                      <div key={index} className={styles.item}>
                        <div>
                          {cardsList[context.openCard].type ===
                          cardsTypeEnum.STREET
                            ? i18n.cards.street.prices[index]
                            : cardsList[context.openCard].type ===
                                cardsTypeEnum.TRAIN
                              ? i18n.cards.train.prices[index]
                              : cardsList[context.openCard].type ===
                                  cardsTypeEnum.RESOURCES
                                ? i18n.cards.resources.prices[index]
                                : ''}
                        </div>
                        <div className={styles.money}>{el}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
}
