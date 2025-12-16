import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account | Wajha",
    description: "Join Wajha today and start managing your SaaS empire.",
    openGraph: {
        title: "Create Account | Wajha",
        description: "Join Wajha today and start managing your SaaS empire.",
        type: "website",
        siteName: "Wajha",
    },
    twitter: {
        card: "summary_large_image",
        title: "Create Account | Wajha",
        description: "Join Wajha today and start managing your SaaS empire.",
    },
};

export default function RegisterPage() {
    return <h1>Register</h1>;
}
