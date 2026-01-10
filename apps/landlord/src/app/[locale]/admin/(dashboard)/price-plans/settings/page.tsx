"use client";

import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function PricePlanSettingsPage() {
    const t = useTranslations("Admin.PricePlanManage.Settings");
    const tMenu = useTranslations("Admin.PricePlanManage.menu");

    const [cancelSubscription, setCancelSubscription] = useState(false);
    const [freePackageAutoApprove, setFreePackageAutoApprove] = useState(false);
    const [autoGeneratePassword, setAutoGeneratePassword] = useState(true);

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("settings"), href: "/admin/price-plans/settings" }
            ]}
        >
            <div className="space-y-6">
                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6 space-y-6">
                    {/* Expiration Mail Alert Days */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-primary">
                            {t("expiration_alert")}
                        </Label>
                        <Select defaultValue="3">
                            <SelectTrigger className="w-full max-w-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">One Day</SelectItem>
                                <SelectItem value="3">Three Day</SelectItem>
                                <SelectItem value="7">Seven Days</SelectItem>
                                <SelectItem value="14">Fourteen Days</SelectItem>
                                <SelectItem value="30">Thirty Days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Free Packages Limit */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="free-packages" className="text-sm font-medium text-primary">
                            {t("free_packages_limit")}
                        </Label>
                        <Input
                            id="free-packages"
                            placeholder={t("free_packages_placeholder")}
                            className="max-w-xs"
                        />
                    </div>

                    {/* Cancel Subscription */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-primary">
                            {t("cancel_subscription")}
                        </Label>
                        <div className="flex items-center gap-3">
                            <Switch
                                checked={cancelSubscription}
                                onCheckedChange={setCancelSubscription}
                            />
                            <span className="text-sm text-muted-foreground">
                                {cancelSubscription ? t("yes") : t("no")}
                            </span>
                        </div>
                    </div>

                    {/* Free Package Auto Approve */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-primary">
                            {t("free_package_auto_approve")}
                        </Label>
                        <div className="flex items-center gap-3">
                            <Switch
                                checked={freePackageAutoApprove}
                                onCheckedChange={setFreePackageAutoApprove}
                            />
                            <span className="text-sm text-muted-foreground">
                                {freePackageAutoApprove ? t("yes") : t("no")}
                            </span>
                        </div>
                    </div>

                    {/* Default Theme Set */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-primary">
                            {t("default_theme")}
                        </Label>
                        <Select defaultValue="flavored">
                            <SelectTrigger className="w-full max-w-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="flavored">Flavored</SelectItem>
                                <SelectItem value="agency">Agency</SelectItem>
                                <SelectItem value="article">Article</SelectItem>
                                <SelectItem value="ecommerce">Ecommerce</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-amber-600 dark:text-amber-400">
                            {t("default_theme_hint")}
                        </p>
                    </div>

                    {/* Default Logo */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-primary">
                            {t("default_logo")}
                        </Label>
                        <Input type="file" accept="image/*" className="max-w-md" />
                    </div>

                    {/* Default Admin Username */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="admin-username" className="text-sm font-medium text-primary">
                            {t("admin_username")}
                        </Label>
                        <Input
                            id="admin-username"
                            defaultValue="super_admin"
                            className="max-w-xs"
                        />
                        <p className="text-sm text-amber-600 dark:text-amber-400">
                            {t("admin_username_hint")}
                        </p>
                    </div>

                    {/* Auto Generate Password */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-primary">
                            {t("auto_generate_password")}
                        </Label>
                        <div className="flex items-center gap-3">
                            <Switch
                                checked={autoGeneratePassword}
                                onCheckedChange={setAutoGeneratePassword}
                            />
                            <span className="text-sm text-muted-foreground">
                                {autoGeneratePassword ? t("yes") : t("no")}
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                        {t("update_changes")}
                    </Button>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
