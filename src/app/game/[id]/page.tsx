'use client';
import React from 'react';
import { gameType } from '../../../../types/gameType';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../../../../utils/firebase';
import { useRouter } from 'next/navigation';
import useUser from '../../../../hooks/useUser';
import Board from '../../../../components/Board/Board';
import Loading from '../../../../components/Loading/Loading';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import Bottom from '../../../../components/Bottom/Bottom';
import styles from './page.module.scss';
import { GameContext } from '../../../../utils/GameContext';
import fstore from '../../../../utils/firestore';
import { number } from 'prop-types';

export default function GameId({ params }: { params: { id: string } }) {
  const [game, setGame] = React.useState<gameType | null>(null);
  const [openCard, setOpenCard] = React.useState(-1);
  const [throwValue, setThrowValue] = React.useState<[number, number]>([0, 0]);
  const router = useRouter();
  const user = useUser();

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

  React.useEffect(() => {
    if (game && game.currentMove.end) {
      const gameBuffer = Object.assign({}, game);
      let indexPlayer = gameBuffer.users.findIndex(
        (el) => el.email === gameBuffer.currentMove.email,
      );
      if (indexPlayer) {
        indexPlayer = (indexPlayer + 1) % gameBuffer.users.length;
      } else {
        indexPlayer = 0;
      }

      if (gameBuffer.currentMove.double) {
        gameBuffer.currentMove.double = false;
        gameBuffer.currentMove.end = false;
        gameBuffer.currentMove.valueDice = -1;
        gameBuffer.currentMove.changePosition = -1;
      } else {
        gameBuffer.currentMove = {
          double: false,
          doubleCount: 0,
          email: gameBuffer.users[indexPlayer].email,
          valueDice: -1,
          end: false,
          changePosition: -1,
        };
      }

      setThrowValue([0, 0]);
      console.log('changeGameIdPage', gameBuffer);
      fstore.set('games', params.id, gameBuffer);
    }
  }, [game]);

  return (
    <>
      {game ? (
        <GameContext.Provider
          value={{
            game,
            openCard,
            setOpenCard,
            game_id: params.id,
            setThrowValue,
            throwValue,
          }}
        >
          <main className={styles['main']}>
            <section className={styles['section']}>
              <Board />
              <Sidebar />
            </section>
            <Bottom />
          </main>
        </GameContext.Provider>
      ) : (
        <Loading />
      )}
    </>
  );
}
