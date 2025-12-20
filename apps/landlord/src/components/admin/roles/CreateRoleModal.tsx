"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Plus } from "lucide-react";

export function CreateRoleModal() {
    const [open, setOpen] = useState(false);
    const t = useTranslations('Admin.RoleManage.CreateRole');
    const tRoles = useTranslations('Admin.RoleManage.AllRoles');

    const [formData, setFormData] = useState({
        roleName: "",
        permissions: {
            dashboard: false,
            admins: false,
            roles: false,
            tenants: false,
            reports: false,
            settings: false,
            users_view: false,
            users_manage: false,
            content_view: false,
            content_manage: false,
            billing_view: false,
            billing_manage: false,
            support_view: false,
            support_manage: false,
            audit_logs: false,
        }
    });

    const permissionsList = [
        "dashboard",
        "admins",
        "roles",
        "tenants",
        "reports",
        "settings",
        "users_view",
        "users_manage",
        "content_view",
        "content_manage",
        "billing_view",
        "billing_manage",
        "support_view",
        "support_manage",
        "audit_logs",

    ] as const;

    function handlePermissionChange(key: keyof typeof formData.permissions, checked: boolean) {
        setFormData(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [key]: checked
            }
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("Submitting Role:", formData);
        // TODO: Implement actual API call
        setOpen(false);
        // Reset form or keep properly
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white dark:text-black transition-colors duration-300">
                    <Plus className="mr-2 h-4 w-4" />
                    {tRoles("new_role")}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                    <DialogDescription className="hidden" />
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    {/* Role Name */}
                    <div className="space-y-2">
                        <Label htmlFor="roleName" className="text-base font-semibold">{t('form.role_name')}</Label>
                        <Input
                            id="roleName"
                            placeholder={t('form.role_name_placeholder')}
                            value={formData.roleName}
                            onChange={(e) => setFormData(prev => ({ ...prev, roleName: e.target.value }))}
                            className="h-10"
                        />
                    </div>

                    {/* Permissions List */}
                    <div className="space-y-4">
                        <Label className="text-base font-semibold">{t('form.permissions')}</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-xl p-4 bg-muted/20">
                            {permissionsList.map((key) => (
                                <div key={key} className="flex flex-row items-center justify-between rounded-lg border p-3 bg-card shadow-sm">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium cursor-pointer" htmlFor={`perm-${key}`}>
                                            {t(`form.permission_items.${key}`)}
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground w-6 text-center">
                                            {formData.permissions[key] ? t('form.toggle_yes') : t('form.toggle_no')}
                                        </span>
                                        <Switch
                                            id={`perm-${key}`}
                                            checked={formData.permissions[key]}
                                            onCheckedChange={(checked) => handlePermissionChange(key, checked)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            {t('form.cancel')}
                        </Button>
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                            {t('form.submit')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
