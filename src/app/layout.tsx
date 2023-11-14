'use client';

import type { Metadata } from 'next';
import './reset.scss';
import './_variables.scss';
import styles from './page.module.scss';

import React, { useEffect } from 'react';
import ThemeProvider from '../../utils/ThemeProvider';
import Theme from '../../components/Theme';

// я это закомментировал, потому что при 'use client' ошибка

// export const metadata: Metadata = {
//   title: 'mono',
//   description: 'Бесплатная монополия онлайн',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    function getTheme() {
      const theme = localStorage.getItem('theme');
      if (!theme) {
        localStorage.setItem('theme', 'light');
      }
    }
    getTheme();
  }, []);
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={styles.body}>
          {children}
          <Theme />
        </body>
      </html>
    </ThemeProvider>
  );
}
