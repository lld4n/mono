'use client';

import styles from './page.module.scss';
import Image from 'next/image';

import Input from '../../../components/Input';
import duck from '../../../assets/duck.svg';
import bone from '../../../assets/bone.svg';
import lightning from '../../../assets/lightning.svg';
import github from '../../../assets/github.svg';
import cactus from '../../../assets/cactus.svg';
import cat from '../../../assets/cat.svg';
import music from '../../../assets/music.svg';
import like from '../../../assets/like.svg';

import React from 'react';
export default function joinRoom() {
  const characters = [duck, bone, cactus, cat, github, lightning, music, like];
  function clickCharacter(event: any) {
    event.currentTarget.setAttribute('disabled', 'disabled');
  }
  return (
    <main className={styles.main}>
      <div className={styles['left-side']}>
        <div className={styles['room__title']}>Начать игру</div>
        <div className={styles['room__persons']}>
          <div className={styles['room__person']}></div>
        </div>
        <div className={styles['room__info']}>
          <div className={styles['room__link']}>
            <div className={styles['room__link-text']}>KEY</div>
            <div className={styles['room__link-icon']}></div>
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
          <div className={styles['room__messages']}></div>
          <div className={styles['room__input']}>
            <Input type={'text'} placeholder={'Введите сообщение'} />
          </div>
        </div>
      </div>
    </main>
  );
}
