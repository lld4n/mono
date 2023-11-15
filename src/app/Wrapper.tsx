'use client';

import type { ReactNode } from 'react';
import ThemeProvider from '../../utils/ThemeProvider';
import Theme from '../../components/Theme';
import React from 'react';
export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
      <Theme />
    </ThemeProvider>
  );
};
