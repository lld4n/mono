'use client';
import styles from './page.module.scss';
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();
import { getCookies, getCookie, setCookie } from 'cookies-next';
import React from 'react';
export default function JoinRoom() {
  console.log(typeof getCookie('user'));
  console.log(getCookies());
  // React.useEffect(() => {
  //   setCookie('user', {
  //     email: 'safin',
  //   });
  // }, []);

  // console.log(cookieStore.getAll());
  return <main className={styles.lldan}>joinRoom.page</main>;
}
