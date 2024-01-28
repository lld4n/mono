import type { Metadata } from "next";
import React from "react";
import "@/styles/global.scss";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import LogoOverlay from "@/components/Global/LogoOverlay/LogoOverlay";
export const metadata: Metadata = {
  title: "mono",
  description: "created by lldan",
  metadataBase: new URL("https://lldan.ru"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="ru"
        style={{
          colorScheme: "dark",
        }}
      >
        <body>
          <ConvexClientProvider>
            <LogoOverlay>{children}</LogoOverlay>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
