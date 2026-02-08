'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Inquiry, PropertyContext, CompoundContext } from '@/app/[domain]/[locale]/(admin)/dashboard/inquiries/types';
import { InquiryStatusBadge } from './InquiryStatusBadge';
import { InquiryActions } from './InquiryActions';
import {
    User, Mail, Phone, Calendar, MessageSquare, Building2, MapPin,
    Home, ArrowUpRight, UserCheck, FileText
} from 'lucide-react';

interface InquiryDetailViewProps {
    inquiry: Inquiry;
    locale: string;
    subdomain: string;
    authToken?: string | null;
}

export function InquiryDetailView({ inquiry, locale, subdomain, authToken }: InquiryDetailViewProps) {
    const isRTL = locale === 'ar';

    return (
        <div className="space-y-6">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{inquiry.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <InquiryStatusBadge status={inquiry.status} label={inquiry.status_label || inquiry.status} />
                            <span className="text-sm text-slate-500">•</span>
                            <span className="text-sm text-slate-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(inquiry.created_at).toLocaleString(locale)}
                            </span>
                        </div>
                    </div>
                </div>
                <InquiryActions inquiry={inquiry} isRTL={isRTL} subdomain={subdomain} authToken={authToken} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Message */}
                    <Card title={isRTL ? 'الرسالة' : 'Message'} icon={<MessageSquare className="w-4 h-4" />}>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {inquiry.message || (isRTL ? 'لا توجد رسالة' : 'No message provided')}
                        </div>
                    </Card>

                    {/* Related Property */}
                    {inquiry.property && (
                        <Card title={isRTL ? 'العقار المهتم به' : 'Interested Property'} icon={<Home className="w-4 h-4" />}>
                            <div className="flex gap-4">
                                {inquiry.property.primary_image && (
                                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={inquiry.property.primary_image.urls.small}
                                            alt={inquiry.property.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                                        {inquiry.property.title}
                                    </h3>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                                        {inquiry.property.price_formatted}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                                        <MapPin className="w-3 h-3" />
                                        <span className="truncate">{inquiry.property.compound_address}</span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{inquiry.property.bedrooms}</span> Beds
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{inquiry.property.bathrooms}</span> Baths
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{inquiry.property.area}</span> m²
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Related Compound */}
                    {inquiry.compound && (
                        <Card title={isRTL ? 'الكمبوند المهتم به' : 'Interested Compound'} icon={<Building2 className="w-4 h-4" />}>
                            <div className="gap-4">
                                <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                                    {inquiry.compound.name}
                                </h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                                    {inquiry.compound.price_range}
                                </p>
                                <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                                    {inquiry.compound.description}
                                </p>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <Card title={isRTL ? 'معلومات العميل' : 'Customer Info'}>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                                </label>
                                <a href={`mailto:${inquiry.email}`} className="flex items-center gap-2 mt-1 text-slate-900 dark:text-white hover:text-indigo-500">
                                    <Mail className="w-4 h-4" />
                                    <span>{inquiry.email}</span>
                                </a>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    {isRTL ? 'رقم الهاتف' : 'Phone'}
                                </label>
                                <a href={`tel:${inquiry.phone}`} className="flex items-center gap-2 mt-1 text-slate-900 dark:text-white hover:text-indigo-500">
                                    <Phone className="w-4 h-4" />
                                    <span>{inquiry.phone || '-'}</span>
                                </a>
                            </div>
                        </div>
                    </Card>

                    {/* Admin Notes */}
                    <Card title={isRTL ? 'ملاحظات المشرف' : 'Admin Notes'} icon={<FileText className="w-4 h-4" />}>
                        <div className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                            {inquiry.admin_notes || (isRTL ? 'لا توجد ملاحظات' : 'No notes added')}
                        </div>
                    </Card>

                    {/* Agent Info */}
                    <Card title={isRTL ? 'الوكيل المسؤول' : 'Assigned Agent'}>
                        {inquiry.agent ? (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <UserCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">{inquiry.agent.name}</p>
                                    <p className="text-xs text-slate-500">{inquiry.agent.email}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-4 text-slate-500 text-sm">
                                {isRTL ? 'لم يتم تعيين وكيل بعد' : 'No agent assigned yet'}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
