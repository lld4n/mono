'use client';
import Loading from '../../../components/Loading/Loading';
import useUser from '../../../hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';
import { chatType } from '../../../types/chatType';
import fstore from '../../../utils/firestore';
import { gamePlayersTypeEnum, gameType } from '../../../types/gameType';

export default function CreateRoom() {
  const router = useRouter();
  const user = useUser(router);

  React.useEffect(() => {
    const creating = async () => {
      const chatBuffer: chatType = {
        messages: [],
        created: new Date().getTime(),
      };
      const chat_id = await fstore.add('chats', chatBuffer);
      const gameBuffer: gameType = {
        chat_id,
        created: new Date().getTime(),
        started: 0,
        players: [
          {
            display_name: user.display_name,
            email: user.email,
            photo_url: user.photo_url,
            selected_character: -1,
            type: gamePlayersTypeEnum.ADMIN,
          },
        ],
      };
      const game_id = await fstore.add('games', gameBuffer);
      router.push('/room/' + game_id);
    };

    creating();
  }, []);
  return <Loading />;
}
