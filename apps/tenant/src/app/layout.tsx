import "./globals.css";
import { Inter, Readex_Pro, Roboto } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-roboto",
    display: "swap",
});

const readexPro = Readex_Pro({
    subsets: ["arabic"],
    weight: ["400", "500", "700"],
    variable: "--font-readex-pro",
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${roboto.variable} ${readexPro.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
