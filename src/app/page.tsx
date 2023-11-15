'use client';
import styles from './page.module.scss';
import Link from 'next/link';
import { auth, db, provider } from '../../utils/firebase';
import { signInWithPopup, signOut } from '@firebase/auth';
import Cookies from 'universal-cookie';
import Image from 'next/image';
import google from '../../assets/google.svg';
import React from 'react';
import { userType } from '../../types/userType';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from '@firebase/firestore';
const cookies = new Cookies();
export default function Home() {
  const [sign, setSign] = React.useState<string>(cookies.get('auth-token'));
  const [user, setUser] = React.useState<userType | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const userBuffer = localStorage.getItem('user');
    if (userBuffer) {
      setUser(JSON.parse(userBuffer));
    }
  }, []);

  const signOutApp = React.useCallback(async () => {
    await signOut(auth);
    cookies.remove('auth-token');
    setSign('');
  }, []);

  const addUser = React.useCallback(
    async (
      email: string | null,
      displayName: string | null,
      photoUrl: string | null,
    ) => {
      if (!email || !displayName) {
        await signOut(auth);
        cookies.remove('auth-token');
        setSign('');
        router.push('/error');
      } else {
        const docRef = doc(db, 'users', email);
        const docSnap = await getDoc(docRef);
        const userBuffer: userType = {
          displayName,
          email,
          photoUrl,
        };
        localStorage.setItem('user', JSON.stringify(userBuffer));
        setUser(userBuffer);
        if (!docSnap.exists()) {
          await setDoc(doc(db, 'users', email), userBuffer);
        }
        setLoading(false);
      }
    },
    [],
  );

  const signInApp = React.useCallback(async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    await addUser(
      result.user.email,
      result.user.displayName,
      result.user.photoURL,
    );
    cookies.set('auth-token', result.user.refreshToken);
    setSign(result.user.refreshToken);
  }, []);
  return (
    <>
      <header></header>
      {loading ? <div className={styles.loading}>Идет загрузка...</div> : <></>}
      {sign && auth.currentUser ? (
        <main className={styles.main}>
          <div className={styles.wrapper}>
            {user ? (
              <div className={styles.account}>
                {user.photoUrl ? (
                  <img src={user.photoUrl} className={styles.photo} />
                ) : (
                  <></>
                )}
                <span className={styles.name}>{user.displayName}</span>
              </div>
            ) : (
              <></>
            )}

            <Link href="/rules" className={styles.link}>
              Правила
            </Link>
            <Link href="/joinRoom" className={styles.link}>
              Войти в комнату
            </Link>
            <Link href="/createRoom" className={styles.link}>
              Создать комнату
            </Link>
            <Link href="/openRooms" className={styles.link}>
              Открытые комнаты
            </Link>
            <div className={styles.link} onClick={signOutApp}>
              Выйти
            </div>
          </div>
        </main>
      ) : (
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <Link href="/rules" className={styles.link}>
              Правила
            </Link>
            <div className={styles.link} onClick={signInApp}>
              <Image src={google} alt="google" width={24} height={24} />
              <span>Войти с помощью Google</span>
            </div>
          </div>
        </main>
      )}
      <footer></footer>
    </>
  );
}
