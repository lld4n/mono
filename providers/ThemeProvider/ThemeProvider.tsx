'use client';
import React from 'react';
import styles from './ThemeProvider.module.scss';
import moon from '../../assets/moon.svg';
import sun from '../../assets/sun.svg';
import Image from 'next/image';
import { fstore } from '../../utils/firestore';
import { auth } from '../../utils/firebase';
export const ThemeContext = React.createContext<number>(0);
const themeList = ['dark', 'light'];
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeIndex, setThemeIndex] = React.useState<number>(0);

  React.useEffect(() => {
    document.documentElement.dataset.theme = themeList[themeIndex];
  }, [themeIndex]);

  return (
    <ThemeContext.Provider value={themeIndex}>
      {children}
      <button
        className={styles.button}
        onClick={() => {
          setThemeIndex((themeIndex + 1) % themeList.length);
        }}
      >
        {themeIndex === 1 ? (
          <Image src={sun} alt={'sun'} width={18} height={18} />
        ) : (
          <Image src={moon} alt={'moon'} width={18} height={18} />
        )}
      </button>
    </ThemeContext.Provider>
  );
}
