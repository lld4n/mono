'use client';
import logo from '../../assets/logo.svg';
import styles from './wrapper.module.scss';
import type { ReactNode } from 'react';
import React from 'react';
import InternationalizationProvider from '../../providers/InternationalizationProvider/InternationalizationProvider';
import ThemeProvider from '../../providers/ThemeProvider/ThemeProvider';
import Image from 'next/image';
import Link from 'next/link';
export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={35}
          className={styles.logo}
          priority={true}
        />
      </Link>

      <InternationalizationProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </InternationalizationProvider>
    </>
  );
};
