import type { Metadata } from 'next';
import './_reset.scss';
import './_variables.scss';
import './_global.scss';

import React from 'react';
import { Wrapper } from '@/app/Wrapper';

export const metadata: Metadata = {
  title: 'mono',
  description: 'Бесплатная монополия онлайн',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
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
