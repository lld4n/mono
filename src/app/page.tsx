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
import { InternationalizationContext } from '../../providers/InternationalizationProvider/InternationalizationProvider';
import { types } from 'sass';
import Boolean = types.Boolean;
const cookies = new Cookies();
export default function Home() {
  const [sign, setSign] = React.useState<string>(cookies.get('auth-token'));
  const [user, setUser] = React.useState<userType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const i18n = React.useContext(InternationalizationContext);
  React.useEffect(() => {
    const userBuffer = localStorage.getItem('user');
    if (userBuffer) {
      setUser(JSON.parse(userBuffer));
    }
    setLoading(false);
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
      {loading ? (
        <div className={styles.loading}>Идет загрузка...</div>
      ) : (
        <>
          {sign && user ? (
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
                  {i18n.root.rules}
                </Link>
                <Link href="/joinRoom" className={styles.link}>
                  {i18n.root.join}
                </Link>
                <Link href="/createRoom" className={styles.link}>
                  {i18n.root.create}
                </Link>
                <Link href="/openRooms" className={styles.link}>
                  {i18n.root.open}
                </Link>
                <div className={styles.link} onClick={signOutApp}>
                  {i18n.root.exit}
                </div>
              </div>
            </main>
          ) : (
            <main className={styles.main}>
              <div className={styles.wrapper}>
                <Link href="/rules" className={styles.link}>
                  {i18n.root.rules}
                </Link>
                <div className={styles.link} onClick={signInApp}>
                  <Image src={google} alt="google" width={24} height={24} />
                  <span>{i18n.root.google}</span>
                </div>
              </div>
            </main>
          )}{' '}
        </>
      )}
      <footer></footer>
    </>
  );
}
