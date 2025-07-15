import type { Metadata } from "next";
import { Lobster } from "next/font/google";
import "./globals.css";

const lobster = Lobster({
  weight: "400",
  variable: "--font-lobster",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Batyrbek & Guzel weeding invitation",
  description: "Batyrbek & Guzel weeding invitation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lobster.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
