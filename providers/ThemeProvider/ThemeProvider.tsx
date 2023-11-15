'use client';
import React from 'react';
import styles from './ThemeProvider.module.scss';
import moon from '../../assets/moon.svg';
import sun from '../../assets/sun.svg';
import Image from 'next/image';

const themeList = ['dark', 'light'];
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeIndex, setThemeIndex] = React.useState<number>(0);
  React.useEffect(() => {
    if (localStorage.getItem('theme')) {
      setThemeIndex(Number(localStorage.getItem('theme')));
      document.documentElement.dataset.theme = themeList[themeIndex];
    } else {
      setThemeIndex(0);
      document.documentElement.dataset.theme = themeList[themeIndex];
      localStorage.setItem('theme', String(themeIndex));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('theme', String(themeIndex));
    document.documentElement.dataset.theme = themeList[themeIndex];
  }, [themeIndex]);

  console.log(themeIndex, themeList[themeIndex]);
  return (
    <>
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
    </>
  );
}
