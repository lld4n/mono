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
  const [themeIndex, setThemeIndex] = React.useState<number>(
    Number(localStorage.getItem('theme')),
  );
  React.useEffect(() => {
    if (Number.isNaN(themeIndex)) {
      setThemeIndex(0);
    }
  }, [themeIndex]);

  React.useEffect(() => {
    localStorage.setItem('theme', String(themeIndex));
    document.documentElement.dataset.theme = themeList[themeIndex];
  }, [themeIndex]);

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
