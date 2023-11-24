'use client';
import Loading from '../../../components/Loading/Loading';
import useUser from '../../../hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';
import { chatType } from '../../../types/chatType';
import fstore from '../../../utils/firestore';
import { gameUsersTypeEnum, gameType } from '../../../types/gameType';
import { query } from '@firebase/database';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../../utils/firebase';

export default function CreateRoom() {
  const router = useRouter();
  const user = useUser();

  const dev = async () => {
    const querySnapshot = await getDocs(collection(db, 'games'));
    querySnapshot.forEach((doc) => {
      if (doc.id !== 'open') {
        console.log(doc.id);
        fstore.delete('games', doc.id);
      }
    });
  };

  React.useEffect(() => {
    dev().then(() => {
      if (user) {
        const creating = async () => {
          const chatBuffer: chatType = {
            messages: [],
            created: new Date().getTime(),
          };
          const chat_id = await fstore.add('chats', chatBuffer);
          const gameBuffer: gameType = {
            chat_id,
            blocked: [],
            created: new Date().getTime(),
            started: 0,
            private: true,
            players: {},
            exchange: null,
            characters: {},
            currentMove: {
              double: false,
              doubleCount: 0,
              email: user.email,
              valueDice: -1,
              end: false,
              changePosition: -1,
            },
            auction: null,
            cards: [],
            prison: [],
            users: [
              {
                display_name: user.display_name,
                email: user.email,
                photo_url: user.photo_url,
                selected_character: -1,
                type: gameUsersTypeEnum.ADMIN,
              },
            ],
          };
          const game_id = await fstore.add('games', gameBuffer);
          router.push('/room/' + game_id);
        };

        creating();
      } else {
        router.push('/');
      }
    });
  }, []);
  return <Loading />;
}
