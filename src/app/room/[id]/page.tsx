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
import Chat from '../../../../components/Chat/Chat';
import { openPlayersType, openType } from '../../../../types/openType';

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
      if (doc.exists()) {
        setGame(doc.data() as gameType);
      } else {
        router.push('/error');
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const setAwait = async (gameBuffer: gameType) => {
    await fstore.set('games', params.id, gameBuffer);
    setLoading(false);
  };

  const addPlayerInOpen = async () => {
    const openBuffer: openType = (await fstore.get(
      'games',
      'open',
    )) as openType;
    if (openBuffer[params.id] && user) {
      openBuffer[params.id].push({
        display_name: user.display_name,
        photo_url: user.photo_url,
      });
      await fstore.set('games', 'open', openBuffer);
    }
  };

  React.useEffect(() => {
    if (game && user) {
      if (game.started !== 0) {
        router.push('/game/' + params.id);
      }
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
          if (!gameBuffer.private) {
            addPlayerInOpen();
          }
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

  const choice = (index: gamePlayersSelectedCharacterType) => {
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

  const start = async () => {
    if (
      game &&
      game.players.map((el) => el.selected_character).every((v) => v !== -1)
    ) {
      let gameBuffer = Object.assign({}, game);
      gameBuffer.started = new Date().getTime();
      await setAwait(gameBuffer);
      if (!gameBuffer.private) {
        const openBuffer: openType = (await fstore.get(
          'games',
          'open',
        )) as openType;
        if (openBuffer[params.id]) {
          delete openBuffer[params.id];
          await fstore.set('games', 'open', openBuffer);
        }
      }
      router.push('/game/' + params.id);
    }
  };

  const setOpen = async () => {
    if (game) {
      const openBuffer: openType = (await fstore.get(
        'games',
        'open',
      )) as openType;
      if (game.private) {
        const list: openPlayersType[] = [];
        for (let el of game.players) {
          list.push({
            display_name: el.display_name,
            photo_url: el.photo_url,
          });
        }
        openBuffer[params.id] = list;
        await fstore.set('games', 'open', openBuffer);
        let gameBuffer = Object.assign({}, game);
        gameBuffer.private = false;
        await fstore.set('games', params.id, gameBuffer);
      } else {
        if (openBuffer[params.id]) {
          delete openBuffer[params.id];
          await fstore.set('games', 'open', openBuffer);
          let gameBuffer = Object.assign({}, game);
          gameBuffer.private = true;
          await fstore.set('games', params.id, gameBuffer);
        }
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
                <div
                  className={
                    game?.players
                      .map((el) => el.selected_character)
                      .every((v) => v !== -1)
                      ? styles.startGame
                      : styles.startDisabled
                  }
                  onClick={start}
                >
                  {i18n.room.title}
                </div>
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
              {admin ? (
                <div className={styles.toggle}>
                  {i18n.room.toggle}
                  <div className={styles.toggleButton} onClick={setOpen}>
                    {game?.private ? i18n.room.private : i18n.room.public}
                  </div>
                </div>
              ) : (
                <div className={styles.toggle}>
                  {i18n.room.toggle}{' '}
                  {game?.private ? i18n.room.private : i18n.room.public}
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
                          choice(index as gamePlayersSelectedCharacterType)
                        }
                      >
                        <Image src={el.svg} alt={''} width={25} height={25} />
                      </div>
                    );
                  })}
                </div>
                {game ? (
                  <Chat
                    chat_id={game.chat_id}
                    colors={game.players.map((el) => {
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
                ) : (
                  ''
                )}
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
