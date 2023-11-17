'use client';
import styles from './page.module.scss';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import useUser from '../../../hooks/useUser';
import { useRouter } from 'next/navigation';
import { InternationalizationContext } from '../../../providers/InternationalizationProvider/InternationalizationProvider';

export default function JoinRoom() {
  const router = useRouter();
  const user = useUser();
  const i18n = useContext(InternationalizationContext);
  const [roomKey, setRoomKey] = useState('');
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, []);
  function sendRoomKey() {
    if (roomKey.length !== 0) router.push('/room/' + roomKey);
  }
  function changeRoomKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event?.key === 'Enter') {
      sendRoomKey();
    }
  }
  return (
    <main className={styles['joinRoom']}>
      <input
        type="text"
        placeholder={i18n.joinRoom.keyInput}
        className={styles['joinRoom__input']}
        value={roomKey}
        onChange={(event) => setRoomKey(event.target.value)}
        onKeyDown={(event) => changeRoomKey(event)}
      />
      <div onClick={() => sendRoomKey()} className={styles['joinRoom__button']}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            d="M20.0379 12.5379C20.404 12.1718 20.404 11.5782 20.0379 11.2121C19.6717 10.846 19.0782 10.846 18.7121 11.2121L13.125 16.7991L11.2879 14.9621C10.9218 14.596 10.3282 14.596 9.96208 14.9621C9.59597 15.3282 9.59597 15.9217 9.96208 16.2879L12.4621 18.7879C12.8282 19.154 13.4217 19.154 13.7879 18.7879L20.0379 12.5379Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 1.5625C7.57867 1.5625 1.5625 7.57867 1.5625 15C1.5625 22.4214 7.57867 28.4375 15 28.4375C22.4214 28.4375 28.4375 22.4214 28.4375 15C28.4375 7.57867 22.4214 1.5625 15 1.5625ZM3.4375 15C3.4375 8.61421 8.61421 3.4375 15 3.4375C21.3857 3.4375 26.5625 8.61421 26.5625 15C26.5625 21.3857 21.3857 26.5625 15 26.5625C8.61421 26.5625 3.4375 21.3857 3.4375 15Z"
            fill="black"
          />
        </svg>
      </div>
    </main>
  );
}
