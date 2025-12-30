import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    homeLabel?: string;
}

export function Breadcrumb({ items, homeLabel = 'Home' }: BreadcrumbProps) {
    return (
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
            <Link
                href="/"
                className="flex items-center gap-1 hover:text-primary transition-colors"
            >
                <Home className="w-4 h-4" />
                <span>{homeLabel}</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 font-medium">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
