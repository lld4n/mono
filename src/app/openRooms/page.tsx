'use client';

import { useEffect, useState } from 'react';
import { openType } from '../../../types/openType';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../../../utils/firebase';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';

export default function openRooms() {
  const router = useRouter();
  const [rooms, setRooms] = useState<openType>({});
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'games', 'open'), (doc) => {
      if (doc.exists()) {
        setRooms(doc.data() as openType);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  function sendRoom(roomKey: string) {
    console.log(roomKey);
    router.push('/room/' + roomKey);
  }

  return (
    <main className={styles['openRooms']}>
      {Object.keys(rooms).map((roomKey) => (
        <div key={roomKey} className={styles['openRooms__item']}>
          {rooms[roomKey].length < 5
            ? rooms[roomKey].map((player) => {
                return (
                  <div className={styles['openRooms__players']}>
                    <span>{player.display_name}</span>
                    <img src={player.photo_url ? player.photo_url : ''}></img>
                  </div>
                );
              })
            : ''}
          {rooms[roomKey].length < 5 ? (
            <div
              className={styles['openRooms__item-button']}
              onClick={() => sendRoom(roomKey)}
            >
              Присоединиться
            </div>
          ) : (
            ''
          )}
        </div>
      ))}
    </main>
  );
}
