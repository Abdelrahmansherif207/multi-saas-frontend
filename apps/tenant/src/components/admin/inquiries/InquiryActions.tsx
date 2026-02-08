'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ActionButton, Modal } from '../ui'; // Assuming ActionButton is exported from ui
import { Phone, Check, UserCheck, UserPlus, Loader2 } from 'lucide-react';
import { Inquiry } from '@/app/[domain]/[locale]/(admin)/dashboard/inquiries/types';

interface InquiryActionsProps {
    inquiry: Inquiry;
    isRTL: boolean;
    subdomain: string;
    authToken?: string | null;
}

export function InquiryActions({ inquiry, isRTL, subdomain, authToken }: InquiryActionsProps) {
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null); // store the action name being executed
    const [assignAgentOpen, setAssignAgentOpen] = useState(false);
    const [agentId, setAgentId] = useState('');

    const apiBase = process.env.NEXT_PUBLIC_API_URL;

    const handleStatusChange = async (action: 'contacted' | 'qualified' | 'converted') => {
        setLoading(action);
        try {
            await axios.put(
                `${apiBase}/tenant/${subdomain}/admin/realestate/inquiries/${inquiry.id}`,
                { status: action },
                {
                    headers: {
                        'X-Tenant-ID': subdomain,
                        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
                    }
                }
            );
            router.refresh();
        } catch (error) {
            console.error(`Error marking inquiry as ${action}:`, error);
            alert(isRTL ? 'حدث خطأ' : 'An error occurred');
        } finally {
            setLoading(null);
        }
    };

    const handleAssignAgent = async () => {
        if (!agentId) return;
        setLoading('assign');
        try {
            await axios.put(
                `${apiBase}/tenant/${subdomain}/admin/realestate/inquiries/${inquiry.id}`,
                { agent_id: Number(agentId) },
                {
                    headers: {
                        'X-Tenant-ID': subdomain,
                        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
                    }
                }
            );
            router.refresh();
            setAssignAgentOpen(false);
        } catch (error) {
            console.error('Error assigning agent:', error);
            alert(isRTL ? 'حدث خطأ' : 'An error occurred');
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {inquiry.status === 'new' && (
                <ActionButton
                    variant="outline"
                    size="sm"
                    icon={loading === 'contacted' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4 text-amber-500" />}
                    onClick={() => handleStatusChange('contacted')}
                    disabled={!!loading}
                >
                    {isRTL ? 'تم التواصل' : 'Mark Contacted'}
                </ActionButton>
            )}

            {(inquiry.status === 'new' || inquiry.status === 'contacted') && (
                <ActionButton
                    variant="outline"
                    size="sm"
                    icon={loading === 'qualified' ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserCheck className="w-4 h-4 text-green-500" />}
                    onClick={() => handleStatusChange('qualified')}
                    disabled={!!loading}
                >
                    {isRTL ? 'تأهيل' : 'Qualify'}
                </ActionButton>
            )}

            {inquiry.status === 'qualified' && (
                <ActionButton
                    variant="outline"
                    size="sm"
                    icon={loading === 'converted' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 text-indigo-500" />}
                    onClick={() => handleStatusChange('converted')}
                    disabled={!!loading}
                >
                    {isRTL ? 'تحويل' : 'Convert'}
                </ActionButton>
            )}

            <ActionButton
                variant="outline"
                size="sm"
                icon={<UserPlus className="w-4 h-4 text-slate-500" />}
                onClick={() => setAssignAgentOpen(true)}
                disabled={!!loading}
            >
                {isRTL ? 'تعيين وكيل' : 'Assign Agent'}
            </ActionButton>

            {/* Assign Agent Modal */}
            <Modal
                isOpen={assignAgentOpen}
                onClose={() => setAssignAgentOpen(false)}
                title={isRTL ? 'تعيين وكيل' : 'Assign Agent'}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {isRTL ? 'رقم الوكيل' : 'Agent ID'}
                        </label>
                        <input
                            type="text"
                            value={agentId}
                            onChange={(e) => setAgentId(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                            placeholder={isRTL ? 'أدخل معرف الوكيل' : 'Enter agent ID'}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            {isRTL ? 'ملاحظة: سيتم استبدال هذا بقائمة منسدلة عند توفر قائمة الوكلاء.' : 'Note: This will be replaced by a dropdown when agent list is available.'}
                        </p>
                    </div>
                    <div className="flex justify-end gap-2">
                        <ActionButton variant="ghost" onClick={() => setAssignAgentOpen(false)}>
                            {isRTL ? 'إلغاء' : 'Cancel'}
                        </ActionButton>
                        <ActionButton
                            variant="primary"
                            onClick={handleAssignAgent}
                            disabled={!agentId || loading === 'assign'}
                        >
                            {loading === 'assign' ? (isRTL ? 'جاري التعيين...' : 'Assigning...') : (isRTL ? 'تعيين' : 'Assign')}
                        </ActionButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
