'use client';
import { useRouter } from 'next/navigation';
import useUser from '../../../../hooks/useUser';
import React from 'react';
import {
  gamePlayersSelectedCharacterType,
  gamePlayersTypeEnum,
  gameType,
} from '../../../../types/gameType';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../../../../utils/firebase';
import Loading from '../../../../components/Loading/Loading';
import fstore from '../../../../utils/firestore';
import styles from './page.module.scss';
import { InternationalizationContext } from '../../../../providers/InternationalizationProvider/InternationalizationProvider';
import Copy from '../../../../components/Copy/Copy';
import { characters } from '../../../../assets/characters';
import Image from 'next/image';

export default function RoomId({ params }: { params: { id: string } }) {
  const router = useRouter();
  const user = useUser();
  const [game, setGame] = React.useState<gameType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [admin, setAdmin] = React.useState(false);
  const i18n = React.useContext(InternationalizationContext);
  React.useEffect(() => {
    if (!user) {
      router.push('/');
    }
    const unsub = onSnapshot(doc(db, 'games', params.id), (doc) => {
      setGame(doc.data() as gameType);
    });

    return () => {
      unsub();
    };
  }, []);

  const setAwait = async (gameBuffer: gameType) => {
    await fstore.set('games', params.id, gameBuffer);
    setLoading(false);
  };
  React.useEffect(() => {
    if (game && user) {
      console.log(game);
      const you = game.players.find((el) => el.email === user.email);
      if (!you) {
        if (game.players.length <= 5) {
          let gameBuffer = Object.assign({}, game);
          gameBuffer.players.push({
            display_name: user.display_name,
            email: user.email,
            photo_url: user.photo_url,
            selected_character: -1,
            type: gamePlayersTypeEnum.PLAYER,
          });

          setAwait(gameBuffer);
        } else {
          router.push('/error');
        }
      } else {
        if (you.type === gamePlayersTypeEnum.ADMIN) {
          setAdmin(true);
        }

        setLoading(false);
      }
    }
  }, [game]);

  const handle = (index: gamePlayersSelectedCharacterType) => {
    if (game && user) {
      if (!game.players.map((el) => el.selected_character).includes(index)) {
        let gameBuffer = Object.assign({}, game);
        gameBuffer.players = game.players.map((el) => {
          if (el.email === user.email) {
            el.selected_character = index;
          }
          return el;
        });
        setAwait(gameBuffer);
      }
    }
  };

  return (
    <>
      {game || !loading ? (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.left}>
              {admin ? (
                <div className={styles.startGame}>{i18n.room.title}</div>
              ) : (
                ''
              )}

              <div className={styles.players}>
                {game?.players.map((elem) => {
                  return (
                    <div key={elem.email} className={styles.onePlayer}>
                      {elem.photo_url ? (
                        <img
                          src={elem.photo_url}
                          alt={''}
                          className={styles.photoPlayer}
                        />
                      ) : (
                        <div className={styles.photoNull}></div>
                      )}

                      <span>{elem.display_name}</span>
                      {elem.selected_character !== -1 ? (
                        <div
                          className={styles.playerSelected}
                          style={{
                            backgroundColor:
                              characters[elem.selected_character].color,
                          }}
                        >
                          <Image
                            src={characters[elem.selected_character].svg}
                            alt={''}
                            width={25}
                            height={25}
                          />
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  );
                })}
              </div>
              {game && game.players.length >= 5 ? (
                ''
              ) : (
                <div className={styles.info}>
                  <Copy value={params.id} />
                  <div className={styles.subtitle}>{i18n.room.subtitle}</div>
                </div>
              )}
            </div>
            <div className={styles.right}>
              <div className={styles.block}>
                <div className={styles.span}>{i18n.room.character}</div>
                <div className={styles.characters}>
                  {characters.map((el, index) => {
                    return (
                      <div
                        className={
                          game?.players
                            .map((el) => el.selected_character)
                            .includes(index as gamePlayersSelectedCharacterType)
                            ? styles.disabledCharacter
                            : styles.oneCharacter
                        }
                        key={el.color}
                        onClick={() =>
                          handle(index as gamePlayersSelectedCharacterType)
                        }
                      >
                        <Image src={el.svg} alt={''} width={25} height={25} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
