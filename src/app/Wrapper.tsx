'use client';

import type { ReactNode } from 'react';
import ThemeProvider from '../../utils/ThemeProvider';
import Theme from '../../components/Theme';
import React from 'react';
import InternationalizationProvider from '../../providers/InternationalizationProvider/InternationalizationProvider';
export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <InternationalizationProvider>{children}</InternationalizationProvider>
      <Theme />
    </ThemeProvider>
  );
};
