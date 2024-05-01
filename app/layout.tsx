import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./assets/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Josh Eflin",
  description: "Josh Eflin's Personal and Professional website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>
            Josh Eflin
          </h1>
          <ul>
            <li> Opera </li>
            <li> Engineering </li>
            <li> Blogging </li>
            <li> Hire Me </li>
          </ul>
          <
          
        </header>
        {children}
      </body>

    </html>
  );
}
