import type { Metadata } from 'next';
import './reset.scss';
import './_variables.scss';
import './global.scss';

import React from 'react';
import { Wrapper } from '@/app/Wrapper';

export const metadata: Metadata = {
  title: 'mono',
  description: 'Бесплатная монополия онлайн',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="body">
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
