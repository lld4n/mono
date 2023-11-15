import React from 'react';

export default function joinRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
      openRooms.layout
    </section>
  );
}
