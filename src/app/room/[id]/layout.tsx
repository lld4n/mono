import React from 'react';

export default function joinRoomLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			{children}
			room.[id].layout
		</section>
	);
}
