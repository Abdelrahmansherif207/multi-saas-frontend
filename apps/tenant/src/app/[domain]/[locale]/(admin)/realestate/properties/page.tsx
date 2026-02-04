'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { DataTable, ColumnDef, Badge, ActionButton, PropertyModal } from '@/components/admin/ui';
import { mockProperties, MockProperty, formatCurrency, mockPropertyTypes, mockAreas } from '@/mocks/admin/properties';
import { Plus, Search, Building2, SlidersHorizontal } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin';

export default function PropertiesListPage() {
    const params = useParams();
    const locale = params.locale as string;
    const router = useRouter();
    const t = useTranslations('Admin.properties');
    const tTable = useTranslations('Admin.table');
    const isRTL = locale === 'ar';

    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterArea, setFilterArea] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<MockProperty | null>(null);

    const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
        available: 'success',
        pending: 'warning',
        sold: 'danger',
    };

    const statusLabel: Record<string, string> = {
        available: isRTL ? 'متاح' : 'Available',
        pending: isRTL ? 'قيد الانتظار' : 'Pending',
        sold: isRTL ? 'مباع' : 'Sold',
    };

    const columns: ColumnDef<MockProperty>[] = [
        {
            key: 'name',
            header: t('columns.name'),
            sortable: true,
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">{value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{row.compound}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'type',
            header: t('columns.type'),
            sortable: true,
            render: (value) => (
                <Badge variant="secondary">{value}</Badge>
            ),
        },
        {
            key: 'area',
            header: t('columns.area'),
            sortable: true,
        },
        {
            key: 'developerPrice',
            header: t('columns.price'),
            sortable: true,
            align: 'right',
            render: (value) => (
                <span className="font-semibold text-foreground tabular-nums">
                    {formatCurrency(value, locale)}
                </span>
            ),
        },
        {
            key: 'status',
            header: t('columns.status'),
            render: (value: string) => (
                <Badge variant={statusVariant[value]}>
                    {statusLabel[value]}
                </Badge>
            ),
        },
    ];

    const handleRowAction = (action: 'view' | 'edit' | 'delete', row: MockProperty) => {
        switch (action) {
            case 'view':
                router.push(`/${locale}/realestate/properties/${row.id}`);
                break;
            case 'edit':
                const property = mockProperties.find(p => p.id === row.id);
                if (property) {
                    setEditingProperty(property);
                    setIsModalOpen(true);
                }
                break;
            case 'delete':
                // Static UI - no actual delete
                console.log('Delete property:', row.id);
                break;
        }
    };

    // Filter data (static UI logic)
    const filteredData = mockProperties.filter(property => {
        const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.compound.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = !filterType || property.typeId === filterType;
        const matchesArea = !filterArea || property.areaId === filterArea;
        const matchesStatus = !filterStatus || property.status === filterStatus;
        return matchesSearch && matchesType && matchesArea && matchesStatus;
    });

    const activeFiltersCount = [filterType, filterArea, filterStatus].filter(Boolean).length;

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={t('title')}
                description={isRTL ? `${mockProperties.length} عقار في النظام` : `${mockProperties.length} properties in the system`}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/realestate` },
                    { label: t('title') },
                ]}
                actions={
                    <ActionButton
                        variant="primary"
                        icon={<Plus className="w-4 h-4" />}
                        onClick={() => {
                            setEditingProperty(null);
                            setIsModalOpen(true);
                        }}
                    >
                        {t('createProperty')}
                    </ActionButton>
                }
                locale={locale}
            />

            {/* Search and Filters Card */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className={`absolute w-4 h-4 text-muted-foreground top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'}`} />
                            <input
                                type="text"
                                placeholder={t('filters.search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`
                                    w-full py-2.5 px-4 rounded-xl
                                    bg-muted/50
                                    border border-transparent
                                    text-foreground
                                    placeholder-muted-foreground
                                    focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900/20 focus:bg-background
                                    transition-all duration-200
                                    ${isRTL ? 'pr-11' : 'pl-11'}
                                `}
                            />
                        </div>

                        {/* Filter Toggle Button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`
                                flex items-center gap-2 px-4 py-2.5 rounded-xl
                                border transition-all duration-200
                                ${showFilters || activeFiltersCount > 0
                                    ? 'bg-slate-900 border-slate-900 text-white'
                                    : 'bg-muted/50 border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
                                }
                            `}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            <span className="text-sm font-medium">{isRTL ? 'الفلاتر' : 'Filters'}</span>
                            {activeFiltersCount > 0 && (
                                <span className="w-5 h-5 rounded-full bg-white text-slate-900 text-xs font-semibold flex items-center justify-center">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Expandable Filters */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-border">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                        {isRTL ? 'نوع العقار' : 'Property Type'}
                                    </label>
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-transparent text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900/20 focus:bg-background transition-all duration-200"
                                    >
                                        <option value="">{t('filters.allTypes')}</option>
                                        {mockPropertyTypes.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {isRTL ? type.nameAr : type.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                        {isRTL ? 'المنطقة' : 'Area'}
                                    </label>
                                    <select
                                        value={filterArea}
                                        onChange={(e) => setFilterArea(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-transparent text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900/20 focus:bg-background transition-all duration-200"
                                    >
                                        <option value="">{t('filters.allAreas')}</option>
                                        {mockAreas.map(area => (
                                            <option key={area.id} value={area.id}>
                                                {isRTL ? area.nameAr : area.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                        {isRTL ? 'الحالة' : 'Status'}
                                    </label>
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-transparent text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900/20 focus:bg-background transition-all duration-200"
                                    >
                                        <option value="">{t('filters.allStatuses')}</option>
                                        <option value="available">{statusLabel.available}</option>
                                        <option value="pending">{statusLabel.pending}</option>
                                        <option value="sold">{statusLabel.sold}</option>
                                    </select>
                                </div>
                            </div>

                            {/* Clear Filters */}
                            {activeFiltersCount > 0 && (
                                <button
                                    onClick={() => {
                                        setFilterType('');
                                        setFilterArea('');
                                        setFilterStatus('');
                                    }}
                                    className="mt-3 text-sm text-slate-700 hover:text-slate-900 font-medium transition-colors"
                                >
                                    {isRTL ? 'مسح جميع الفلاتر' : 'Clear all filters'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <DataTable
                    columns={columns}
                    data={filteredData}
                    selectable
                    selectedIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                    onRowAction={handleRowAction}
                    pagination={{
                        currentPage: 1,
                        totalPages: 2,
                        pageSize: 10,
                        totalItems: filteredData.length,
                    }}
                    emptyState={{
                        title: isRTL ? 'لا توجد عقارات' : 'No properties found',
                        description: isRTL ? 'لم يتم العثور على عقارات تطابق معايير البحث' : 'No properties match your search criteria',
                    }}
                    locale={locale}
                />
            </div>

            {/* Property Modal */}
            <PropertyModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingProperty(null);
                }}
                onSubmit={(data) => {
                    console.log('Form submitted:', data);
                    setIsModalOpen(false);
                    setEditingProperty(null);
                }}
                mode={editingProperty ? 'edit' : 'create'}
                locale={locale}
                initialData={editingProperty ? {
                    name: editingProperty.name,
                    typeId: editingProperty.typeId,
                    areaId: editingProperty.areaId,
                    developerPrice: editingProperty.developerPrice.toString(),
                    status: editingProperty.status,
                    images: [
                        'https://picsum.photos/seed/property1/400/300',
                        'https://picsum.photos/seed/property2/400/300',
                        'https://picsum.photos/seed/property3/400/300',
                        'https://picsum.photos/seed/property4/400/300',
                    ],
                } : undefined}
                propertyTypes={mockPropertyTypes.map(t => ({ id: t.id, name: t.name, nameAr: t.nameAr }))}
                areas={mockAreas.map(a => ({ id: a.id, name: a.name, nameAr: a.nameAr }))}
            />
        </div>
    );
}
