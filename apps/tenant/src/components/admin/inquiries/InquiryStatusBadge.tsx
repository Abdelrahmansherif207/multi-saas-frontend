import { Badge } from '@/components/admin/ui';

interface InquiryStatusBadgeProps {
    status: string;
    label: string;
}

export function InquiryStatusBadge({ status, label }: InquiryStatusBadgeProps) {
    const variants: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'> = {
        new: 'primary',
        contacted: 'warning',
        qualified: 'success',
        converted: 'secondary',
        closed: 'danger'
    };

    return (
        <Badge variant={variants[status] || 'default'}>
            {label}
        </Badge>
    );
}
