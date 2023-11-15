'use client';

import React, { useEffect, useState } from 'react';

import styles from './page.module.scss';
import Image from 'next/image';

import duck from '../../../assets/duck.svg';
import bone from '../../../assets/bone.svg';
import lightning from '../../../assets/lightning.svg';
import github from '../../../assets/github.svg';
import cactus from '../../../assets/cactus.svg';
import cat from '../../../assets/cat.svg';
import music from '../../../assets/music.svg';
import like from '../../../assets/like.svg';
import rocket from '../../../assets/rocket.png';
import { db } from '../../../utils/firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from '@firebase/firestore';
import { useRouter } from 'next/navigation';
import { userType } from '../../../types/userType';
import formatData from '../../../utils/formatData';

export default function joinRoom() {
  const router = useRouter();
  const characters = [duck, bone, cactus, cat, github, lightning, music, like];
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState(localStorage.getItem('chat-key'));
  const [user, setUser] = useState<userType | null>(null);
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
      const docSnap = onSnapshot(doc(db, 'chats', chat), (doc) => {
        setMessages(doc.data()?.messages);
      });
    }
  }, [chat]);
  function clickCharacter(event: any) {
    event.currentTarget.setAttribute('disabled', 'disabled');
  }
  function writeMessage(event: any) {
    setMessage(event.target.value);
  }
  async function sendMessage(event: any) {
    if (event.key === 'Enter') {
      if (chat && event.target.value.length !== 0) {
        const message = {
          text: event.target.value,
          email: user?.email,
          displayName: user?.displayName,
          date: new Date().getTime(),
        };
        setMessage('');
        await setDoc(doc(db, 'chats', chat), {
          messages: [...messages, message],
        });
      }
    }
  }
  return (
    <main className={styles.main}>
      <div className={styles['left-side']}>
        <div className={styles['room__title']}>Начать игру</div>
        <div className={styles['room__persons']}>
          <div className={styles['room__person']}>
            <Image
              src={rocket}
              alt=""
              width={40}
              height={40}
              className={styles['person-image']}
            />
            <div className={styles['person-nickname']}>lldan</div>
          </div>
          <div className={styles['room__person']}>
            <Image
              src={rocket}
              alt=""
              width={40}
              height={40}
              className={styles['person-image']}
            />
            <div className={styles['person-nickname']}>lldan</div>
          </div>
        </div>
        <div className={styles['room__info']}>
          <div className={styles['room__link']}>
            <div className={styles['room__link-text']}>
              PdwRhG1syEYKLdS3iujr
            </div>
            <div className={styles['room__link-icon']}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.10776 1.61316C2.37623 1.34174 2.74409 1.17816 3.38797 1.09064C4.04679 1.00109 4.91592 1 6.14254 1H8.7143C9.94092 1 10.81 1.00109 11.4689 1.09064C12.1127 1.17816 12.4806 1.34174 12.7491 1.61317C13.0881 1.9559 13.2521 2.45206 13.3178 3.43426C12.7567 3.40038 12.0959 3.40038 11.3237 3.40039L11.2859 3.40039H8.92845L8.89067 3.40039C7.81143 3.40038 6.94976 3.40037 6.27388 3.49288C5.57482 3.58857 5.00058 3.79155 4.54733 4.25299C4.09531 4.71319 3.89759 5.29415 3.80417 6.00156C3.71354 6.68788 3.71355 7.5636 3.71356 8.66389L3.71356 8.70057V12.7007L3.71356 12.7374C3.71355 13.4855 3.71355 14.1298 3.74203 14.6813C2.87619 14.6079 2.42492 14.4414 2.10776 14.1207C1.83854 13.8485 1.67573 13.4744 1.58882 12.8208C1.50006 12.1534 1.49902 11.2734 1.49902 10.0337V5.70019C1.49902 4.46051 1.50006 3.58051 1.58882 2.91309C1.67573 2.2595 1.83854 1.88535 2.10776 1.61316ZM3.85054 15.6925C2.80724 15.6239 1.99919 15.433 1.39679 14.8239C0.912757 14.3345 0.698942 13.7151 0.597544 12.9526C0.499005 12.2116 0.499013 11.265 0.499024 10.0709L0.499024 10.0337V5.70019L0.499024 5.66303C0.499013 4.46886 0.499005 3.52227 0.597544 2.78127C0.698941 2.01877 0.912757 1.39931 1.39679 0.909941C1.88157 0.419815 2.4965 0.202618 3.25328 0.0997503C3.98727 -2.02559e-05 4.92447 -1.13152e-05 6.10469 2.48055e-07H6.14254H8.7143H8.75216C9.93236 -1.13152e-05 10.8695 -2.02559e-05 11.6035 0.0997504C12.3603 0.202618 12.9752 0.419815 13.46 0.909937C14.0924 1.54929 14.269 2.4188 14.3272 3.56048C14.8544 3.6755 15.3003 3.87965 15.667 4.25299C16.119 4.71318 16.3168 5.29415 16.4102 6.00156C16.5008 6.68788 16.5008 7.5636 16.5008 8.66389V8.70057V12.7007V12.7374C16.5008 13.8377 16.5008 14.7134 16.4102 15.3997C16.3168 16.1071 16.119 16.6881 15.667 17.1483C15.2137 17.6097 14.6395 17.8127 13.9404 17.9084C13.2646 18.0009 12.4029 18.0009 11.3237 18.0009H11.2859H8.92845H8.89068C7.81144 18.0009 6.94976 18.0009 6.27388 17.9084C5.57482 17.8127 5.00057 17.6097 4.54733 17.1483C4.1593 16.7532 3.95867 16.2692 3.85054 15.6925ZM5.26075 4.95373C5.49798 4.71221 5.82463 4.5637 6.4095 4.48364C7.00968 4.40149 7.80276 4.40039 8.92845 4.40039H11.2859C12.4116 4.40039 13.2046 4.40149 13.8048 4.48364C14.3897 4.5637 14.7163 4.7122 14.9536 4.95374C15.1921 5.19651 15.3396 5.53274 15.4188 6.13248C15.4998 6.74571 15.5008 7.55526 15.5008 8.70057V12.7007C15.5008 13.846 15.4998 14.6556 15.4188 15.2688C15.3396 15.8685 15.1921 16.2048 14.9536 16.4475C14.7163 16.6891 14.3897 16.8376 13.8048 16.9176C13.2046 16.9998 12.4116 17.0009 11.2859 17.0009H8.92845C7.80275 17.0009 7.00968 16.9998 6.4095 16.9176C5.82464 16.8376 5.49799 16.6891 5.26075 16.4475C5.02229 16.2048 4.87477 15.8685 4.79557 15.2688C4.71458 14.6556 4.71356 13.846 4.71356 12.7007V8.70057C4.71356 7.55527 4.71458 6.74571 4.79557 6.13248C4.87477 5.53273 5.02229 5.1965 5.26075 4.95373Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div className={styles['room__subtitle']}>
            Пригласи еще участников. Для этого скопируй код выше и отправь
            друзьям
          </div>
        </div>
      </div>
      <div className={styles['right-side']}>
        <div className={styles['room__subtitle']}>
          Выберите персонажа за которого будете играть
        </div>
        <div className={styles['room__characters']}>
          {characters.map((elem, index) => (
            <button
              className={styles['room__character']}
              onClick={(event) => clickCharacter(event)}
              key={index}
            >
              <Image src={elem} alt="" width={25} height={25} />
            </button>
          ))}
        </div>
        <div className={styles['room__chat']}>
          <div className={styles['room__messages']}>
            {messages.map((message: any, index: number) => (
              <div className={styles['room__message']} key={index}>
                <div className={styles['message-date']}>
                  {formatData(message.date)}
                </div>
                <div className={styles['message-author']}>
                  {message.displayName}
                </div>
                <div className={styles['message-text']}>{message.text}</div>
              </div>
            ))}
          </div>
          <div className={styles['room__input']}>
            <input
              type={'text'}
              placeholder={'Введите сообщение'}
              value={message}
              onChange={writeMessage}
              onKeyDown={sendMessage}
              className={styles.input}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
