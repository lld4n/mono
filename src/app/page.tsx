'use client';
import styles from './page.module.scss';
import Link from 'next/link';
import { auth, db, provider } from '../../utils/firebase';
import { signInWithPopup, signOut } from '@firebase/auth';
import Image from 'next/image';
import google from '../../assets/google.svg';
import React from 'react';
import { userType } from '../../types/userType';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { InternationalizationContext } from '../../providers/InternationalizationProvider/InternationalizationProvider';
import Loading from '../../components/Loading/Loading';
import cooky from '../../utils/cooky';
export default function Home() {
  const [user, setUser] = React.useState<userType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const i18n = React.useContext(InternationalizationContext);
  React.useEffect(() => {
    const userBuffer = cooky.get('user_mono');
    if (userBuffer) {
      setUser(JSON.parse(userBuffer));
    }
    setLoading(false);
  }, []);

  const signOutApp = React.useCallback(async () => {
    await signOut(auth);
    cooky.remove('user_mono');
    setUser(null);
  }, []);

  const addUser = React.useCallback(
    async (
      email: string | null,
      display_name: string | null,
      photo_url: string | null,
    ) => {
      if (!email || !display_name) {
        await signOut(auth);
        cooky.remove('user_mono');
        router.push('/error');
      } else {
        const docRef = doc(db, 'users', email);
        const docSnap = await getDoc(docRef);
        const userBuffer: userType = {
          display_name,
          email,
          photo_url,
        };
        cooky.set('user_mono', userBuffer);
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
  }, []);

  return (
    <>
      <header></header>
      {loading ? (
        <Loading />
      ) : (
        <>
          {user ? (
            <main className={styles.main}>
              <div className={styles.wrapper}>
                {user ? (
                  <div className={styles.account}>
                    {user.photo_url ? (
                      <img src={user.photo_url} className={styles.photo} />
                    ) : (
                      <></>
                    )}
                    <span className={styles.name}>{user.display_name}</span>
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
          )}
        </>
      )}
      <footer></footer>
    </>
  );
}
