'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';
import { FormTextarea } from '../ui/FormTextarea';
import { Card } from '../ui/Card';
import { ActionButton } from '../ui/ActionButton';
import { mockPropertyTypes, mockAreas, mockCompounds, MockProperty } from '../../../mocks/admin/properties';
import { Save, X, Building2, MapPin, DollarSign, CheckCircle } from 'lucide-react';

interface PropertyFormProps {
    property?: MockProperty;
    locale: string;
    mode: 'create' | 'edit';
}

export function PropertyForm({ property, locale, mode }: PropertyFormProps) {
    const t = useTranslations('Admin.properties.form');
    const tCommon = useTranslations('Admin.common');
    const router = useRouter();
    const isRTL = locale === 'ar';

    const propertyTypeOptions = mockPropertyTypes.map(type => ({
        value: type.id,
        label: isRTL ? type.nameAr : type.name,
    }));

    const areaOptions = mockAreas.map(area => ({
        value: area.id,
        label: isRTL ? area.nameAr : area.name,
    }));

    const compoundOptions = mockCompounds.map(compound => ({
        value: compound.id,
        label: compound.name,
    }));

    const statusOptions = [
        { value: 'available', label: t('available') },
        { value: 'pending', label: t('pending') },
        { value: 'sold', label: t('sold') },
    ];

    const bedroomOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5+' },
    ];

    const bathroomOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4+' },
    ];

    return (
        <form className="space-y-6">
            {/* Basic Information */}
            <Card
                title={t('basicInfo')}
                description={isRTL ? 'أدخل المعلومات الأساسية للعقار' : 'Enter the basic property information'}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <FormInput
                            label={t('propertyName')}
                            placeholder={isRTL ? 'أدخل اسم العقار' : 'Enter property name'}
                            defaultValue={property?.name}
                            required
                            locale={locale}
                            icon={<Building2 className="w-4 h-4" />}
                        />
                    </div>
                    <FormSelect
                        label={t('propertyType')}
                        options={propertyTypeOptions}
                        placeholder={isRTL ? 'اختر نوع العقار' : 'Select property type'}
                        defaultValue={property?.typeId}
                        required
                        locale={locale}
                    />
                    <FormSelect
                        label={t('bedrooms')}
                        options={bedroomOptions}
                        placeholder={isRTL ? 'اختر عدد الغرف' : 'Select bedrooms'}
                        defaultValue={property?.bedrooms?.toString()}
                        required
                        locale={locale}
                    />
                    <FormSelect
                        label={t('bathrooms')}
                        options={bathroomOptions}
                        placeholder={isRTL ? 'اختر عدد الحمامات' : 'Select bathrooms'}
                        defaultValue={property?.bathrooms?.toString()}
                        required
                        locale={locale}
                    />
                    <FormInput
                        label={t('areaSize')}
                        type="number"
                        placeholder={isRTL ? 'أدخل المساحة' : 'Enter area size'}
                        defaultValue={property?.areaSize}
                        required
                        locale={locale}
                    />
                    <div className="md:col-span-2">
                        <FormTextarea
                            label={t('description')}
                            placeholder={isRTL ? 'أدخل وصف العقار' : 'Enter property description'}
                            defaultValue={property?.description}
                            rows={4}
                            locale={locale}
                        />
                    </div>
                </div>
            </Card>

            {/* Location */}
            <Card
                title={t('location')}
                description={isRTL ? 'حدد موقع العقار' : 'Specify the property location'}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormSelect
                        label={t('selectArea')}
                        options={areaOptions}
                        placeholder={isRTL ? 'اختر المنطقة' : 'Select area'}
                        defaultValue={property?.areaId}
                        required
                        locale={locale}
                    />
                    <FormSelect
                        label={t('compound')}
                        options={compoundOptions}
                        placeholder={isRTL ? 'اختر الكمبوند' : 'Select compound'}
                        defaultValue={property?.compoundId}
                        locale={locale}
                    />
                    <FormInput
                        label={t('address')}
                        placeholder={isRTL ? 'أدخل العنوان' : 'Enter address'}
                        defaultValue={property?.address}
                        locale={locale}
                        icon={<MapPin className="w-4 h-4" />}
                    />
                    <FormInput
                        label={t('city')}
                        placeholder={isRTL ? 'أدخل المدينة' : 'Enter city'}
                        defaultValue={property?.city}
                        locale={locale}
                    />
                </div>
            </Card>

            {/* Pricing */}
            <Card
                title={t('pricing')}
                description={isRTL ? 'حدد أسعار العقار' : 'Set property pricing'}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                        label={t('developerPrice')}
                        type="number"
                        placeholder={isRTL ? 'أدخل سعر المطور' : 'Enter developer price'}
                        defaultValue={property?.developerPrice}
                        required
                        locale={locale}
                        icon={<DollarSign className="w-4 h-4" />}
                    />
                    <FormInput
                        label={t('resalePrice')}
                        type="number"
                        placeholder={isRTL ? 'أدخل سعر إعادة البيع' : 'Enter resale price'}
                        defaultValue={property?.resalePrice}
                        locale={locale}
                        icon={<DollarSign className="w-4 h-4" />}
                    />
                </div>
            </Card>

            {/* Status */}
            <Card
                title={t('propertyStatus')}
                description={isRTL ? 'حدد حالة العقار' : 'Set property status'}
            >
                <div className="max-w-md">
                    <FormSelect
                        label={t('selectStatus')}
                        options={statusOptions}
                        placeholder={isRTL ? 'اختر الحالة' : 'Select status'}
                        defaultValue={property?.status || 'available'}
                        required
                        locale={locale}
                    />
                </div>
            </Card>

            {/* Actions */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ActionButton
                    type="button"
                    variant="primary"
                    icon={<Save className="w-4 h-4" />}
                >
                    {mode === 'create' ? t('submit') : t('save')}
                </ActionButton>
                <ActionButton
                    type="button"
                    variant="outline"
                    icon={<X className="w-4 h-4" />}
                    onClick={() => router.back()}
                >
                    {t('cancel')}
                </ActionButton>
            </div>
        </form>
    );
}
