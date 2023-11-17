import React, { useEffect, useState } from 'react';
import { messageType } from '../types/chatType';
import { userType } from '../types/userType';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from '@firebase/firestore';
import { db } from '../utils/firebase';
import { useRouter } from 'next/navigation';
import duck from '../assets/characters/duck.svg';
import bone from '../assets/characters/bone.svg';
import cactus from '../assets/characters/cactus.svg';
import cat from '../assets/characters/cat.svg';
import octocat from '../assets/characters/octocat.svg';
import heart from '../assets/characters/heart.svg';
import music from '../assets/characters/music.svg';
import zip from '../assets/characters/zip.svg';
import { InternationalizationContext } from '../providers/InternationalizationProvider/InternationalizationProvider';
import { findCharacterNameByImage } from '../utils/findCharacterNameByImage';

export function useRoom() {
  const i18n = React.useContext(InternationalizationContext);

  const router = useRouter();
  const characters = [duck, bone, cactus, cat, octocat, heart, music, zip];
  const [messages, setMessages] = useState<messageType[]>([]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState(localStorage.getItem('chat-key'));
  const [user, setUser] = useState<userType | null>(null);

  const [copy, setCopy] = useState(false);
  useEffect(() => {
    const userBuffer = localStorage.getItem('user');
    if (userBuffer) {
      setUser(JSON.parse(userBuffer));
    } else {
      router.push('/error');
    }
    const setData = async () => {
      const docRef = await addDoc(collection(db, 'chats'), {
        messages: [],
      });
      localStorage.setItem('chat-key', docRef.id);
    };
    if (!chat) setData();
  }, []);
  useEffect(() => {
    if (chat) {
      const unsubscribe = onSnapshot(doc(db, 'chats', chat), (doc) => {
        setMessages(doc.data()?.messages);
      });
    }
  }, [chat]);

  function copyKey(event: any) {
    navigator.clipboard.writeText(event.currentTarget.value).then(
      () => {
        setCopy(true);
      },
      (err) => {
        setCopy(false);
      },
    );
    setTimeout(() => {
      setCopy(false);
    }, 500);
  }

  function compareCharacter(
    userCharacterUrlImage: string,
    currentCharacterUrlImage: string,
  ): boolean {
    if (userCharacterUrlImage === currentCharacterUrlImage) {
      return true;
    }
    return false;
  }

  function clickCharacter(event: any) {
    const userBuffer = localStorage.getItem('user');
    if (userBuffer) {
      let userObject = JSON.parse(userBuffer);
      if (userObject.characterUrlImage) {
        if (
          compareCharacter(
            userObject.characterUrlImage,
            event.currentTarget.value,
          )
        ) {
          return;
        } else {
          const currentCharacter = characters.filter(
            (character) =>
              JSON.stringify(character) === userObject.characterUrlImage,
          );
        }
      }

      const characterName = findCharacterNameByImage(event.currentTarget.value);
      userObject = {
        ...userObject,
        characterUrlImage: event.currentTarget.value,
        characterName,
      };
      setUser(userObject);
      localStorage.setItem('user', JSON.stringify(userObject));
    } else {
      router.push('/error');
    }
  }
  function writeMessage(event: any) {
    setMessage(event.target.value);
  }
  async function sendMessage(event: any) {
    if (event.key === 'Enter') {
      if (chat && event.target.value.trim().length !== 0) {
        const message = {
          text: event.target.value,
          email: user?.email,
          display_name: user?.display_name,
          date: new Date().getTime(),
        };
        setMessage('');
        await setDoc(doc(db, 'chats', chat), {
          messages: [...messages, message],
        });
      }
    }
  }
  return {
    messages,
    message,
    characters,
    clickCharacter,
    sendMessage,
    writeMessage,
    copyKey,
    chat,
    i18n,
    user,
    copy,
  };
}
