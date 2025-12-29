import Link from 'next/link';
// Reuse types from real-estate or shared location. 
// For this quick test, we will import from the sibling directory to ensure type compatibility with the registry
import { TenantConfig, MenuItem } from '../../real-estate/types';

interface HeaderProps {
    config: TenantConfig;
    menu?: MenuItem[];
}

export function Header({ config, menu = [] }: HeaderProps) {
    return (
        <header className="border-b-4 border-black py-6">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-3xl font-black uppercase tracking-tighter">
                    {config.name}
                </Link>

                <nav className="hidden md:flex gap-8">
                    {menu.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-lg font-bold uppercase hover:underline"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <Link
                    href="/contact"
                    className="bg-black text-white px-6 py-2 font-bold uppercase hover:bg-gray-800 transition-colors"
                >
                    Get in touch
                </Link>
            </div>
        </header>
    );
}
