import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "The Cocktail Party",
  description: "Gamify your cocktail party with a competitive leaderboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={` antialiased  `} id="app">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
