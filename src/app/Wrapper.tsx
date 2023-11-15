'use client';

import type { ReactNode } from 'react';
import React from 'react';
import InternationalizationProvider from '../../providers/InternationalizationProvider/InternationalizationProvider';
import ThemeProvider from '../../providers/ThemeProvider/ThemeProvider';
export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <InternationalizationProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </InternationalizationProvider>
  );
};
