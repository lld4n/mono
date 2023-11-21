'use client';
import { useRouter } from 'next/navigation';
import useUser from '../../../../hooks/useUser';
import React from 'react';
import {
  gameSelectedCharacterType,
  gameUsersTypeEnum,
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
import { cardsList } from '../../../../assets/cards';

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
        console.log(doc.data());
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
      const you = game.users.find((el) => el.email === user.email);
      if (!you) {
        console.log(you);
        if (game.users.length < 5) {
          if (game.blocked.includes(user.email)) {
            router.push('/');
          } else {
            let gameBuffer = Object.assign({}, game);
            gameBuffer.users.push({
              display_name: user.display_name,
              email: user.email,
              photo_url: user.photo_url,
              selected_character: -1,
              type: gameUsersTypeEnum.PLAYER,
            });
            if (!gameBuffer.private) {
              addPlayerInOpen();
            }
            setAwait(gameBuffer);
          }
        } else {
          router.push('/error');
        }
      } else {
        if (you.type === gameUsersTypeEnum.ADMIN) {
          setAdmin(true);
        }

        setLoading(false);
      }
    }
  }, [game]);

  const choice = (index: gameSelectedCharacterType) => {
    if (game && user) {
      if (!game.users.map((el) => el.selected_character).includes(index)) {
        let gameBuffer = Object.assign({}, game);
        gameBuffer.users = game.users.map((el) => {
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
      game.users.map((el) => el.selected_character).every((v) => v !== -1)
    ) {
      let gameBuffer = Object.assign({}, game);
      gameBuffer.started = new Date().getTime();
      gameBuffer.characters = {};
      for (let elem of gameBuffer.users) {
        gameBuffer.characters[elem.selected_character] = 0;
        gameBuffer.players[elem.email] = {
          display_name: elem.display_name,
          balance: 15000,
          selected_character: elem.selected_character,
        };
      }
      const ignoreList = [0, 2, 4, 7, 10, 17, 20, 22, 30, 33, 36, 38];
      for (let i = 0; i < cardsList.length; i++) {
        if (ignoreList.includes(i)) {
          gameBuffer.cards.push({
            status: null,
            owner_email: null,
            card_id: i,
          });
        } else {
          gameBuffer.cards.push({
            status: -2,
            owner_email: null,
            card_id: i,
          });
        }
      }
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
        for (let el of game.users) {
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

  const blockUser = async (email: string) => {
    if (game) {
      let gameBuffer = Object.assign({}, game);
      const indexPlayer = gameBuffer.users.findIndex(
        (el) => el.email === email,
      );
      if (indexPlayer >= 0) {
        gameBuffer.users.splice(indexPlayer, 1);
        gameBuffer.blocked.push(email);
        if (!gameBuffer.private) {
          const openBuffer: openType = (await fstore.get(
            'games',
            'open',
          )) as openType;
          if (openBuffer[params.id]) {
            // delete openBuffer[params.id];
            const list: openPlayersType[] = [];
            for (let el of gameBuffer.users) {
              list.push({
                display_name: el.display_name,
                photo_url: el.photo_url,
              });
            }
            openBuffer[params.id] = list;
            await fstore.set('games', 'open', openBuffer);
          }
        }
        await fstore.set('games', params.id, gameBuffer);
      }
    }
  };

  const leaveRoom = async () => {
    if (user && game) {
      let gameBuffer = Object.assign({}, game);
      const indexPlayer = gameBuffer.users.findIndex(
        (el) => el.email === user.email,
      );
      if (indexPlayer >= 0) {
        gameBuffer.users.splice(indexPlayer, 1);
        if (!gameBuffer.private) {
          const openBuffer: openType = (await fstore.get(
            'games',
            'open',
          )) as openType;
          if (openBuffer[params.id]) {
            const list: openPlayersType[] = [];
            for (let el of gameBuffer.users) {
              list.push({
                display_name: el.display_name,
                photo_url: el.photo_url,
              });
            }
            openBuffer[params.id] = list;
            await fstore.set('games', 'open', openBuffer);
            // router.push('/'); // не надо, так как если комната публичная, то он уберет пользователя из open, а из games/params.id не успеет, так как пользователя уже перекинет на главную
          }
        }
        await fstore.set('games', params.id, gameBuffer);
        router.push('/');
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
                    game?.users
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
                {game?.users.map((elem) => {
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
                      {admin && elem.email !== user?.email ? (
                        <div
                          className={styles.deletePlayer}
                          onClick={() => blockUser(elem.email)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="16"
                            viewBox="0 0 22 16"
                            fill="none"
                          >
                            <path
                              d="M6.43287 16H15.5583C17.2704 16 18.0265 15.2004 18.2873 13.497L19.6865 4.04128L18.2873 4.12818L16.8967 13.4796C16.7663 14.34 16.3057 14.6876 15.541 14.6876H6.45894C5.67676 14.6876 5.22483 14.34 5.10316 13.4796L3.71262 4.12818L2.31338 4.04128L3.71262 13.497C3.96465 15.2091 4.72945 16 6.43287 16ZM2.22647 4.78H19.7734C20.8424 4.78 21.4247 4.1108 21.4247 3.05051V1.72949C21.4247 0.6692 20.8424 0 19.7734 0H2.22647C1.20963 0 0.575195 0.6692 0.575195 1.72949V3.05051C0.575195 4.1108 1.15749 4.78 2.22647 4.78ZM2.58279 3.46767C2.14825 3.46767 1.97443 3.28516 1.97443 2.85062V1.92938C1.97443 1.49483 2.14825 1.31233 2.58279 1.31233H19.4258C19.8603 1.31233 20.0255 1.49483 20.0255 1.92938V2.85062C20.0255 3.28516 19.8603 3.46767 19.4258 3.46767H2.58279ZM8.48395 12.8712C8.65771 12.8712 8.8142 12.7843 8.94458 12.6627L10.9956 10.6029L13.0553 12.6627C13.177 12.7756 13.3334 12.8712 13.5246 12.8712C13.8897 12.8712 14.1939 12.5583 14.1939 12.1933C14.1939 11.9934 14.1069 11.8544 13.9852 11.724L11.9429 9.67298L13.994 7.59584C14.1243 7.45678 14.2025 7.32644 14.2025 7.14393C14.2025 6.77022 13.9071 6.47473 13.5246 6.47473C13.3595 6.47473 13.2118 6.54426 13.0728 6.68331L10.9956 8.74306L8.93582 6.69201C8.79677 6.56163 8.65771 6.49211 8.48395 6.49211C8.11025 6.49211 7.80603 6.77891 7.80603 7.14393C7.80603 7.33513 7.89294 7.48289 8.01458 7.60451L10.057 9.67298L8.01458 11.7328C7.89294 11.8544 7.80603 12.0021 7.80603 12.1933C7.80603 12.5583 8.11025 12.8712 8.48395 12.8712Z"
                              fill="#1C1C1E"
                            />
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  );
                })}
              </div>
              {game && game.users.length >= 5 ? (
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
              {user ? <div onClick={leaveRoom}>{i18n.room.leave}</div> : ''}
            </div>
            <div className={styles.right}>
              <div className={styles.block}>
                <div className={styles.span}>{i18n.room.character}</div>
                <div className={styles.characters}>
                  {characters.map((el, index) => {
                    return (
                      <div
                        className={
                          game?.users
                            .map((el) => el.selected_character)
                            .includes(index as gameSelectedCharacterType)
                            ? styles.disabledCharacter
                            : styles.oneCharacter
                        }
                        key={el.color}
                        onClick={() =>
                          choice(index as gameSelectedCharacterType)
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
                    colors={game.users.map((el) => {
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
