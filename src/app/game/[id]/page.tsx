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

export default function GameId({ params }: { params: { id: string } }) {
  const [game, setGame] = React.useState<gameType | null>(null);
  const router = useRouter();
  const user = useUser();
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

  React.useEffect(() => {
    console.log(game);
  }, [game]);

  return (
    <>
      {game ? (
        <GameContext.Provider
          value={{
            game: game,
          }}
        >
          <main className={styles['main']}>
            <section className={styles['section']}>
              <Board />
              <Sidebar />
            </section>
            <Bottom game_id={params.id} />
          </main>
        </GameContext.Provider>
      ) : (
        <Loading />
      )}
    </>
  );
}
