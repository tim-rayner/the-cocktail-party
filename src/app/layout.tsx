import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className={` antialiased  `} id="app">
        {children}
      </body>
    </html>
  );
}
