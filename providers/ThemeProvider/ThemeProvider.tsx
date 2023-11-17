'use client';
import React from 'react';
import styles from './ThemeProvider.module.scss';
import moon from '../../assets/moon.svg';
import sun from '../../assets/sun.svg';
import Image from 'next/image';
import cooky from '../../utils/cooky';
import NoSSR from 'react-no-ssr';
const themeList = ['dark', 'light'];
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeIndex, setThemeIndex] = React.useState<number>(
    Number(cooky.get('theme_mono')),
  );

  React.useEffect(() => {
    if (!themeIndex) {
      setThemeIndex(0);
    }
  }, []);

  React.useEffect(() => {
    cooky.set('theme_mono', themeIndex);
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
        <NoSSR>
          {themeIndex === 1 ? (
            <Image src={sun} alt={'sun'} width={18} height={18} />
          ) : themeIndex === 0 ? (
            <Image src={moon} alt={'moon'} width={18} height={18} />
          ) : (
            ''
          )}
        </NoSSR>
      </button>
    </>
  );
}
