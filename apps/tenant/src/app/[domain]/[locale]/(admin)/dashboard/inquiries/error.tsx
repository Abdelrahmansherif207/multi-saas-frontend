'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { ActionButton } from '@/components/admin/ui';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Inquiries Error:', error);
    }, [error]);

    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="max-w-md w-full p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                            Something went wrong
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {error.message || 'An unexpected error occurred'}
                        </p>
                    </div>
                    <ActionButton
                        variant="primary"
                        onClick={reset}
                        icon={<RefreshCw className="w-4 h-4" />}
                    >
                        Try again
                    </ActionButton>
                </div>
            </div>
        </div>
    );
}
