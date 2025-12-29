import "./globals.css";
import { Plus_Jakarta_Sans, Space_Grotesk, Tajawal } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-real-estate",
    display: "swap",
});

const tajawal = Tajawal({
    subsets: ["arabic"],
    weight: ["400", "500", "700"],
    variable: "--font-tajawal",
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-minimal",
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${jakarta.variable} ${spaceGrotesk.variable} ${tajawal.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
