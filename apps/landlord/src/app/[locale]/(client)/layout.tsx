import { Header } from "@/components/client/Header";
import { Footer } from "@/components/client/Footer";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col relative">{children}</main>
            <Footer />
        </div>
    );
}
