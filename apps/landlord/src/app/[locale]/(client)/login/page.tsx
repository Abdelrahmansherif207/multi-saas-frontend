import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Wajha",
    description: "Secure login to your Wajha dashboard.",
    robots: "index, follow",
    openGraph: {
        title: "Login | Wajha",
        description: "Secure login to your Wajha dashboard.",
        type: "website",
        siteName: "Wajha",
    },
    twitter: {
        card: "summary_large_image",
        title: "Login | Wajha",
        description: "Secure login to your Wajha dashboard.",
    },
};

export default function LoginPage() {
    return <h1>Login</h1>;
}
