'use client';

import React, { useEffect, useState } from 'react';
import { openType } from '../../../types/openType';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../../../utils/firebase';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { InternationalizationContext } from '../../../providers/InternationalizationProvider/InternationalizationProvider';

export default function OpenRooms() {
  const i18n = React.useContext(InternationalizationContext);
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
      <div className={styles.wrapper}>
        {Object.keys(rooms).map((roomKey) => (
          <div key={roomKey} className={styles['openRooms__item']}>
            <div className={styles.players}>
              {rooms[roomKey].length < 5
                ? rooms[roomKey].map((player, index) => {
                    return (
                      <div className={styles['openRooms__players']} key={index}>
                        <img
                          src={player.photo_url ? player.photo_url : ''}
                        ></img>
                        <span>{player.display_name}</span>
                      </div>
                    );
                  })
                : ''}
            </div>
            {rooms[roomKey].length < 5 ? (
              <div
                className={styles['openRooms__item-button']}
                onClick={() => sendRoom(roomKey)}
              >
                {i18n.connect}
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
