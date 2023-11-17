import React from 'react';
import styles from './Chat.module.scss';
import { InternationalizationContext } from '../../providers/InternationalizationProvider/InternationalizationProvider';
import formatData from '../../utils/formatData';
import { chatType, messageType } from '../../types/chatType';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../../utils/firebase';
import { gameType } from '../../types/gameType';
import fstore from '../../utils/firestore';
import useUser from '../../hooks/useUser';
import { setIn } from 'immutable';
export default function Chat({
  chat_id,
  colors,
}: {
  chat_id: string;
  colors: { email: string; color: string; opposite: string }[];
}) {
  const user = useUser();
  const i18n = React.useContext(InternationalizationContext);
  const [chat, setChat] = React.useState<chatType | null>(null);
  const [input, setInput] = React.useState<string>('');
  const scroll = React.useRef<HTMLDivElement | null>(null);
  const setAwait = async (chatBuffer: chatType) => {
    await fstore.set('chats', chat_id, chatBuffer);
  };

  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', chat_id), (doc) => {
      if (doc.exists()) {
        setChat(doc.data() as chatType);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  React.useEffect(() => {
    scroll.current?.scrollTo(0, scroll.current?.offsetHeight);
  }, [chat]);

  const renderMessage = (message: messageType) => {
    const messageColor = colors.find((el) => el.email === message.email);
    if (messageColor) {
      return (
        <span className={styles.oneMessage} key={message.date}>
          <span className={styles.date}>{formatData(message.date)}</span>
          <span
            className={styles.author}
            style={{
              backgroundColor: messageColor.color,
              color: messageColor.opposite,
            }}
          >
            {message.display_name}
          </span>
          <span className={styles.text}>{message.text}</span>
        </span>
      );
    } else {
      return (
        <span className={styles.oneMessage} key={message.date}>
          <span className={styles.date}>{formatData(message.date)}</span>
          <span className={styles.author}>{message.display_name}</span>
          <span className={styles.text}>{message.text}</span>
        </span>
      );
    }
  };

  const send = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.length > 0 && user) {
      let chatBuffer = Object.assign({}, chat);
      const message = {
        text: input,
        email: user.email,
        display_name: user.display_name,
        date: new Date().getTime(),
      };
      chatBuffer.messages.push(message);
      setInput('');
      setAwait(chatBuffer);
    }
  };

  console.log(chat);
  return (
    <div className={styles.wrapper}>
      <div className={styles.messages} ref={scroll}>
        {chat?.messages.map((message: messageType) => renderMessage(message))}
      </div>
      <input
        className={styles.input}
        placeholder={i18n.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => send(e)}
      />
    </div>
  );
}
