import React from 'react';
import styles from './OpenCard.module.scss';
import { GameContext } from '../../utils/GameContext';
import { InternationalizationContext } from '../../providers/InternationalizationProvider/InternationalizationProvider';
import { cardsList } from '../../assets/cards';
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
            <div className={styles.bottom}></div>
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
}
