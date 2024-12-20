import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "@/styles/app.css";
import { ASCIIPortrait } from "./components/ASCII/portrait";
import { ASCIIName } from "./components/ASCII/name";

const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-roboto-mono',
    display: 'swap',
})
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Josh Eflin",
    description: "Josh Eflin's Personal and Professional website",
};

export default function RootLayout({
    terminal,
    children,
}: Readonly<{
    children: React.ReactNode;
    terminal: React.ReactNode;
}>) {
    console.log('layout')
    return (
        <html lang="en" className={`${roboto_mono.variable}`}>
            <body className={inter.className}>
                <header>
                    <div className="ascii-art">
                        <ASCIIPortrait />
                    </div>
                    <div className="ascii-art">
                        <ASCIIName />
                    </div>
                </header>
                {children}
                <footer>
                    {terminal}
                </footer>
            </body>

        </html >
    );
}
