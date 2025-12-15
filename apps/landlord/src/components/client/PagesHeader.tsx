import Link from "next/link";
import { Fragment } from "react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PagesHeaderProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
}

export function PagesHeader({ title, breadcrumbs }: PagesHeaderProps) {
    return (
        <div className="bg-muted/30 pt-32 pb-20 mb-16 border-b">
            <div className="container mx-auto px-4 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    {title}
                </h1>
                {/* Breadcrumbs */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1;
                        return (
                            <Fragment key={index}>
                                {item.href && !isLast ? (
                                    <Link href={item.href} className="hover:text-foreground transition-colors">
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className={isLast ? "text-foreground font-medium" : ""}>
                                        {item.label}
                                    </span>
                                )}
                                {!isLast && <span>{">"}</span>}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
