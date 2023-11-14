import type { Metadata } from 'next';
import './reset.scss';
import React from 'react';

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
      <body>
        {children}
        root.layout
      </body>
    </html>
  );
}
