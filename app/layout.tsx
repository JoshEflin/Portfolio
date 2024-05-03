import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "@/styles/app.css";


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
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${roboto_mono.variable}`}>
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
                </header>
                {children}
            </body>

        </html >
    );
}
