'use client';

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

interface PermissionsListProps {
    permissions: string[];
}

export function PermissionsList({ permissions }: PermissionsListProps) {
    const [showAll, setShowAll] = useState(false);
    const t = useTranslations('Admin.Profile');

    if (!permissions || permissions.length === 0) {
        return <span className="text-sm text-muted-foreground italic">No specific permissions</span>;
    }

    const DISPLAY_LIMIT = 8;
    const hasMore = permissions.length > DISPLAY_LIMIT;
    const displayedPermissions = showAll ? permissions : permissions.slice(0, DISPLAY_LIMIT);

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                {displayedPermissions.map((permission) => (
                    <Badge key={permission} variant="outline" className="text-xs transition-all duration-300">
                        {permission}
                    </Badge>
                ))}
            </div>

            {hasMore && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAll(!showAll)}
                    className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                    {showAll ? (
                        <div className="flex items-center gap-1">
                            {t('show_less', { defaultMessage: 'Show Less' })}
                            <ChevronUp className="w-3 h-3" />
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            {t('show_more', { defaultMessage: 'Show More' })} (+{permissions.length - DISPLAY_LIMIT})
                            <ChevronDown className="w-3 h-3" />
                        </div>
                    )}
                </Button>
            )}
        </div>
    );
}
