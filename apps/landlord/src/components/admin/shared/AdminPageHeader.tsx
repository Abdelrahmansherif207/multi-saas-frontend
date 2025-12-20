import { Link } from '@/i18n/routing';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface AdminPageHeaderProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
}

export function AdminPageHeader({ title, breadcrumbs }: AdminPageHeaderProps) {
    return (
        <div className="flex flex-col gap-1 pb-6 relative z-20">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1 text-sm text-muted-foreground/60 mb-1">
                {breadcrumbs.map((item, index) => (
                    <div key={index} className="flex items-center gap-1">
                        {index > 0 && <ChevronRight className="w-3.5 h-3.5" />}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="hover:text-foreground transition-colors font-medium"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className={index === breadcrumbs.length - 1 ? "text-foreground font-medium" : ""}>
                                {item.label}
                            </span>
                        )}
                    </div>
                ))}
            </nav>

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        </div>
    );
}
