"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";

const formSchema = z.object({
    site_logo: z.any().optional(),
    white_site_logo: z.any().optional(),
    favicon: z.any().optional(),
    breadcrumb_left_image: z.any().optional(),
    breadcrumb_right_image: z.any().optional(),
});

interface ImageUploadFieldProps {
    label: string;
    sizeHint: string;
    preview: string | null;
    onUpload: (file: File) => void;
    onRemove: () => void;
    t: any;
}

const ImageUploadField = ({ label, sizeHint, preview, onUpload, onRemove, t }: ImageUploadFieldProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div className="space-y-2">
            <Label className="text-primary font-medium text-sm flex justify-end">{label}</Label>
            <div className="flex flex-col gap-4 items-end">
                <div className="border-2 border-dashed border-border rounded-lg p-4 w-32 h-32 flex items-center justify-center bg-muted/30 relative group overflow-hidden">
                    {preview ? (
                        <>
                            <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-md" />
                            <button
                                type="button"
                                onClick={onRemove}
                                className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </>
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                            <span className="text-xs">{t("change_image")}</span>
                        </div>
                    )}
                </div>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleButtonClick}
                        className="bg-black hover:bg-black/90 hover:text-white dark:bg-white dark:hover:bg-white/90 text-white dark:text-black border-none h-8 text-xs"
                    >
                        {t("change_image")}
                    </Button>
                    <p className="text-[10px] text-muted-foreground mt-1 text-right">{t("image_format", { size: sizeHint })}</p>
                </div>
            </div>
        </div>
    );
};

export function SiteIdentityForm() {
    const t = useTranslations("Admin.GeneralSettings.site_identity");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    // Mock state for images
    const [images, setImages] = useState({
        site_logo: null,
        white_site_logo: null,
        favicon: null,
        breadcrumb_left_image: null,
        breadcrumb_right_image: null,
    });

    const handleUpload = (key: string) => (file: File) => {
        // Handle file upload
    };

    const handleRemove = (key: string) => () => {
        setImages(prev => ({ ...prev, [key]: null }));
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Handle form submission
    }

    return (
        <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ImageUploadField
                            label={t("site_logo")}
                            sizeHint="100*100"
                            preview={images.site_logo}
                            onUpload={handleUpload("site_logo")}
                            onRemove={handleRemove("site_logo")}
                            t={t}
                        />

                        <ImageUploadField
                            label={t("white_site_logo")}
                            sizeHint="100*100"
                            preview={images.white_site_logo}
                            onUpload={handleUpload("white_site_logo")}
                            onRemove={handleRemove("white_site_logo")}
                            t={t}
                        />

                        <ImageUploadField
                            label={t("favicon")}
                            sizeHint="40*40"
                            preview={images.favicon}
                            onUpload={handleUpload("favicon")}
                            onRemove={handleRemove("favicon")}
                            t={t}
                        />

                        <ImageUploadField
                            label={t("breadcrumb_left_image")}
                            sizeHint="261*146"
                            preview={images.breadcrumb_left_image}
                            onUpload={handleUpload("breadcrumb_left_image")}
                            onRemove={handleRemove("breadcrumb_left_image")}
                            t={t}
                        />

                        <ImageUploadField
                            label={t("breadcrumb_right_image")}
                            sizeHint="261*146"
                            preview={images.breadcrumb_right_image}
                            onUpload={handleUpload("breadcrumb_right_image")}
                            onRemove={handleRemove("breadcrumb_right_image")}
                            t={t}
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black font-medium w-full sm:w-auto">
                            {t("save_changes")}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
