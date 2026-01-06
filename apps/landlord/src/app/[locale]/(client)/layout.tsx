import { Header } from "@/components/client/Header";
import { Footer } from "@/components/client/Footer";
import { getCurrentUser } from "@/lib/auth/server";

export default async function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();

    return (
        <div className="min-h-screen flex flex-col">
            <Header user={user} />
            <main className="flex-1 flex flex-col relative">{children}</main>
            <Footer />
        </div>
    );
}
