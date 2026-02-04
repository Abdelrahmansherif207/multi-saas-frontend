'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Modal } from './Modal';
import { ActionButton } from './ActionButton';
import { Building2, Upload, X, Image as ImageIcon } from 'lucide-react';

interface PropertyFormData {
    name: string;
    nameAr: string;
    typeId: string;
    areaId: string;
    compoundId: string;
    developerId: string;
    developerPrice: string;
    brokerPrice: string;
    status: string;
    description: string;
    descriptionAr: string;
    images: string[];
}

interface PropertyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PropertyFormData) => void;
    initialData?: Partial<PropertyFormData>;
    mode: 'create' | 'edit';
    locale: string;
    loading?: boolean;
    // Options for dropdowns
    propertyTypes?: Array<{ id: string; name: string; nameAr: string }>;
    areas?: Array<{ id: string; name: string; nameAr: string }>;
    compounds?: Array<{ id: string; name: string; nameAr: string }>;
    developers?: Array<{ id: string; name: string; nameAr: string }>;
}

const defaultFormData: PropertyFormData = {
    name: '',
    nameAr: '',
    typeId: '',
    areaId: '',
    compoundId: '',
    developerId: '',
    developerPrice: '',
    brokerPrice: '',
    status: 'available',
    description: '',
    descriptionAr: '',
    images: [],
};

export function PropertyModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    mode,
    locale,
    loading = false,
    propertyTypes = [],
    areas = [],
    compounds = [],
    developers = [],
}: PropertyModalProps) {
    const isRTL = locale === 'ar';
    const [formData, setFormData] = useState<PropertyFormData>(defaultFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof PropertyFormData, string>>>({});
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Reset form when modal opens/closes or initial data changes
    useEffect(() => {
        if (isOpen) {
            setFormData({ ...defaultFormData, ...initialData });
            setErrors({});
        }
    }, [isOpen, initialData]);

    const handleChange = (field: keyof PropertyFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleImageUpload = (files: FileList | null) => {
        if (!files) return;

        const newImages: string[] = [];
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result as string;
                    setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, result]
                    }));
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        handleImageUpload(e.dataTransfer.files);
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof PropertyFormData, string>> = {};

        if (!formData.name.trim()) {
            newErrors.name = isRTL ? 'اسم العقار مطلوب' : 'Property name is required';
        }
        if (!formData.typeId) {
            newErrors.typeId = isRTL ? 'نوع العقار مطلوب' : 'Property type is required';
        }
        if (!formData.areaId) {
            newErrors.areaId = isRTL ? 'المنطقة مطلوبة' : 'Area is required';
        }
        if (!formData.developerPrice.trim()) {
            newErrors.developerPrice = isRTL ? 'السعر مطلوب' : 'Price is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const inputClassName = (hasError: boolean) => `
        w-full px-4 py-3 rounded-xl
        bg-slate-50 border ${hasError ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-slate-900 focus:ring-slate-900/10'}
        text-slate-900 text-sm
        placeholder-slate-400
        focus:outline-none focus:ring-2 focus:bg-white
        transition-all duration-200
    `;

    const selectClassName = (hasError: boolean) => `
        w-full px-4 py-3 rounded-xl
        bg-slate-50 border ${hasError ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-slate-900 focus:ring-slate-900/10'}
        text-slate-900 text-sm
        focus:outline-none focus:ring-2 focus:bg-white
        transition-all duration-200
        appearance-none cursor-pointer
    `;

    const labelClassName = 'block text-sm font-medium text-slate-700 mb-2';
    const errorClassName = 'text-xs text-red-500 mt-1';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'create'
                ? (isRTL ? 'إضافة عقار جديد' : 'Add New Property')
                : (isRTL ? 'تعديل العقار' : 'Edit Property')
            }
            description={mode === 'create'
                ? (isRTL ? 'أدخل تفاصيل العقار الجديد' : 'Enter the details for the new property')
                : (isRTL ? 'قم بتحديث تفاصيل العقار' : 'Update the property details')
            }
            size="xl"
            footer={
                <>
                    <ActionButton
                        variant="ghost"
                        onClick={onClose}
                        disabled={loading}
                    >
                        {isRTL ? 'إلغاء' : 'Cancel'}
                    </ActionButton>
                    <ActionButton
                        variant="primary"
                        onClick={handleSubmit}
                        loading={loading}
                        icon={<Building2 className="w-4 h-4" />}
                    >
                        {mode === 'create'
                            ? (isRTL ? 'إضافة العقار' : 'Add Property')
                            : (isRTL ? 'حفظ التغييرات' : 'Save Changes')
                        }
                    </ActionButton>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info Section */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                        {isRTL ? 'المعلومات الأساسية' : 'Basic Information'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClassName}>
                                {isRTL ? 'اسم العقار (إنجليزي)' : 'Property Name (English)'} *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className={inputClassName(!!errors.name)}
                                placeholder={isRTL ? 'أدخل اسم العقار' : 'Enter property name'}
                            />
                            {errors.name && <p className={errorClassName}>{errors.name}</p>}
                        </div>
                        <div>
                            <label className={labelClassName}>
                                {isRTL ? 'اسم العقار (عربي)' : 'Property Name (Arabic)'}
                            </label>
                            <input
                                type="text"
                                value={formData.nameAr}
                                onChange={(e) => handleChange('nameAr', e.target.value)}
                                className={inputClassName(false)}
                                placeholder={isRTL ? 'أدخل اسم العقار بالعربية' : 'Enter property name in Arabic'}
                                dir="rtl"
                            />
                        </div>
                    </div>
                </div>

                {/* Classification Section */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                        {isRTL ? 'التصنيف' : 'Classification'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClassName}>
                                {isRTL ? 'نوع العقار' : 'Property Type'} *
                            </label>
                            <select
                                value={formData.typeId}
                                onChange={(e) => handleChange('typeId', e.target.value)}
                                className={selectClassName(!!errors.typeId)}
                            >
                                <option value="">{isRTL ? 'اختر النوع' : 'Select type'}</option>
                                {propertyTypes.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {isRTL ? type.nameAr : type.name}
                                    </option>
                                ))}
                            </select>
                            {errors.typeId && <p className={errorClassName}>{errors.typeId}</p>}
                        </div>
                        <div>
                            <label className={labelClassName}>
                                {isRTL ? 'المنطقة' : 'Area'} *
                            </label>
                            <select
                                value={formData.areaId}
                                onChange={(e) => handleChange('areaId', e.target.value)}
                                className={selectClassName(!!errors.areaId)}
                            >
                                <option value="">{isRTL ? 'اختر المنطقة' : 'Select area'}</option>
                                {areas.map(area => (
                                    <option key={area.id} value={area.id}>
                                        {isRTL ? area.nameAr : area.name}
                                    </option>
                                ))}
                            </select>
                            {errors.areaId && <p className={errorClassName}>{errors.areaId}</p>}
                        </div>
                        <div>
                            <label className={labelClassName}>
                                {isRTL ? 'المجمع' : 'Compound'}
                            </label>
                            <select
                                value={formData.compoundId}
                                onChange={(e) => handleChange('compoundId', e.target.value)}
                                className={selectClassName(false)}
                            >
                                <option value="">{isRTL ? 'اختر المجمع' : 'Select compound'}</option>
                                {compounds.map(compound => (
                                    <option key={compound.id} value={compound.id}>
                                        {isRTL ? compound.nameAr : compound.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={labelClassName}>
                                {isRTL ? 'المطور' : 'Developer'}
                            </label>
                            <select
                                value={formData.developerId}
                                onChange={(e) => handleChange('developerId', e.target.value)}
                                className={selectClassName(false)}
                            >
                                <option value="">{isRTL ? 'اختر المطور' : 'Select developer'}</option>
                                {developers.map(developer => (
                                    <option key={developer.id} value={developer.id}>
                                        {isRTL ? developer.nameAr : developer.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                        {isRTL ? 'التسعير' : 'Pricing'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className={labelClassName}>
                                {isRTL ? 'سعر المطور' : 'Developer Price'} *
                            </label>
                            <input
                                type="text"
                                value={formData.developerPrice}
                                onChange={(e) => handleChange('developerPrice', e.target.value)}
                                className={inputClassName(!!errors.developerPrice)}
                                placeholder="0.00"
                            />
                            {errors.developerPrice && <p className={errorClassName}>{errors.developerPrice}</p>}
                        </div>
                        <div>
                            <label className={labelClassName}>
                                {isRTL ? 'سعر الوسيط' : 'Broker Price'}
                            </label>
                            <input
                                type="text"
                                value={formData.brokerPrice}
                                onChange={(e) => handleChange('brokerPrice', e.target.value)}
                                className={inputClassName(false)}
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className={labelClassName}>
                                {isRTL ? 'الحالة' : 'Status'}
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className={selectClassName(false)}
                            >
                                <option value="available">{isRTL ? 'متاح' : 'Available'}</option>
                                <option value="pending">{isRTL ? 'قيد الانتظار' : 'Pending'}</option>
                                <option value="sold">{isRTL ? 'مباع' : 'Sold'}</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Gallery Section */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                        {isRTL ? 'معرض الصور' : 'Photo Gallery'}
                    </h3>

                    {/* Upload Area */}
                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`
                            relative border-2 border-dashed rounded-xl p-8
                            flex flex-col items-center justify-center gap-3
                            cursor-pointer transition-all duration-200
                            ${dragActive
                                ? 'border-slate-900 bg-slate-100'
                                : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                            }
                        `}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleImageUpload(e.target.files)}
                            className="hidden"
                        />
                        <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center">
                            <Upload className="w-6 h-6 text-slate-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-slate-700">
                                {isRTL ? 'اسحب الصور هنا أو انقر للتحميل' : 'Drag photos here or click to upload'}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                {isRTL ? 'PNG, JPG, WEBP حتى 10 ميجابايت' : 'PNG, JPG, WEBP up to 10MB'}
                            </p>
                        </div>
                    </div>

                    {/* Image Preview Grid */}
                    {formData.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {formData.images.map((image, index) => (
                                <div key={index} className="relative group aspect-square">
                                    <img
                                        src={image}
                                        alt={`Property ${index + 1}`}
                                        className="w-full h-full object-cover rounded-xl border border-slate-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="
                                            absolute top-2 right-2
                                            w-7 h-7 rounded-lg
                                            bg-white/90 backdrop-blur-sm
                                            flex items-center justify-center
                                            text-slate-600 hover:text-red-500 hover:bg-red-50
                                            opacity-0 group-hover:opacity-100
                                            transition-all duration-200
                                            border border-slate-200
                                        "
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    {index === 0 && (
                                        <span className="absolute bottom-2 left-2 px-2 py-1 text-xs font-medium bg-slate-900 text-white rounded-md">
                                            {isRTL ? 'الرئيسية' : 'Main'}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* No images placeholder */}
                    {formData.images.length === 0 && (
                        <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <ImageIcon className="w-5 h-5 text-slate-400" />
                            <p className="text-sm text-slate-500">
                                {isRTL ? 'لم يتم إضافة صور بعد' : 'No photos added yet'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Description Section */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                        {isRTL ? 'الوصف' : 'Description'}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className={labelClassName}>
                                {isRTL ? 'الوصف (إنجليزي)' : 'Description (English)'}
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className={`${inputClassName(false)} min-h-[100px] resize-none`}
                                placeholder={isRTL ? 'أدخل وصف العقار' : 'Enter property description'}
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className={labelClassName}>
                                {isRTL ? 'الوصف (عربي)' : 'Description (Arabic)'}
                            </label>
                            <textarea
                                value={formData.descriptionAr}
                                onChange={(e) => handleChange('descriptionAr', e.target.value)}
                                className={`${inputClassName(false)} min-h-[100px] resize-none`}
                                placeholder={isRTL ? 'أدخل وصف العقار بالعربية' : 'Enter property description in Arabic'}
                                rows={3}
                                dir="rtl"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
