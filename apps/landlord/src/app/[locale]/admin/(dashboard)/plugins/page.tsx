"use client";

import { useState } from "react";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface Plugin {
    id: string;
    name: string;
    version: string;
    description: string;
    isCore: boolean;
    isActive: boolean;
}

export default function PluginsManagePage() {
    const t = useTranslations("Admin");
    const [plugins, setPlugins] = useState<Plugin[]>([
        {
            id: "badge",
            name: "Badge",
            version: "1.0.0",
            description: "Badge is a Core Plugin developed by Core Team to enhance platform features",
            isCore: true,
            isActive: true,
        },
        {
            id: "attributes",
            name: "Attributes",
            version: "1.0.0",
            description: "Attributes is a Core Plugin developed by Core Team to enhance platform features",
            isCore: true,
            isActive: true,
        },
        {
            id: "appointment",
            name: "Appointment",
            version: "1.0.0",
            description: "Appointment is a Core Plugin developed by Core Team to enhance platform features",
            isCore: true,
            isActive: true,
        },
        {
            id: "country-manage",
            name: "Country Manage",
            version: "1.0.0",
            description: "Country Manage is a Core Plugin developed by Core Team to enhance platform features",
            isCore: true,
            isActive: true,
        },
        {
            id: "campaign",
            name: "Campaign",
            version: "1.0.0",
            description: "Campaign is a Core Plugin developed by Core Team to enhance platform features",
            isCore: true,
            isActive: true,
        },
        {
            id: "blog",
            name: "Blog",
            version: "1.0.0",
            description: "Blog is a Core Plugin developed by Core Team to enhance platform features",
            isCore: true,
            isActive: true,
        },
        {
            id: "email-template",
            name: "Email Template",
            version: "1.0.0",
            description: "Email Template is a Core Plugin developed by Core Team to enhance platform features",
            isCore: true,
            isActive: true,
        },
        {
            id: "donation",
            name: "Donation",
            version: "1.0.0",
            description: "Donation is a Core Plugin developed by Core Team to enhance platform features",
            isCore: true,
            isActive: true,
        },
        {
            id: "coupon-manage",
            name: "Coupon Manage",
            version: "1.0.0",
            description: "Coupon Manage is a Core Plugin developed by Core Team to enhance platform features",
            isCore: true,
            isActive: true,
        },
    ]);

    const [deactivateDialog, setDeactivateDialog] = useState<{
        open: boolean;
        plugin: Plugin | null;
    }>({
        open: false,
        plugin: null,
    });

    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        plugin: Plugin | null;
    }>({
        open: false,
        plugin: null,
    });

    const [errorDialog, setErrorDialog] = useState<{
        open: boolean;
        message: string;
    }>({
        open: false,
        message: "",
    });

    const handleDeactivate = (plugin: Plugin) => {
        if (plugin.isCore) {
            setDeactivateDialog({ open: true, plugin });
        } else {
            // For non-core plugins, deactivate directly
            togglePluginStatus(plugin.id);
        }
    };

    const confirmDeactivate = () => {
        if (deactivateDialog.plugin) {
            // Show error for core plugins
            setErrorDialog({
                open: true,
                message: t("Plugins.error.cannot_delete_core"),
            });
            setDeactivateDialog({ open: false, plugin: null });
        }
    };

    const togglePluginStatus = (pluginId: string) => {
        setPlugins(
            plugins.map((p) =>
                p.id === pluginId ? { ...p, isActive: !p.isActive } : p
            )
        );
    };

    const handleDelete = (plugin: Plugin) => {
        if (plugin.isCore) {
            setErrorDialog({
                open: true,
                message: t("Plugins.error.cannot_delete_core"),
            });
        } else {
            setDeleteDialog({ open: true, plugin });
        }
    };

    const confirmDelete = () => {
        if (deleteDialog.plugin) {
            setPlugins(plugins.filter((p) => p.id !== deleteDialog.plugin!.id));
            setDeleteDialog({ open: false, plugin: null });
        }
    };

    return (
        <AdminPageWrapper
            title={t("Plugins.title")}
            breadcrumbs={[
                { label: t("Plugins.breadcrumbs.admin"), href: "/admin" },
                { label: t("Plugins.breadcrumbs.plugins"), href: "/admin/plugins-manage" },
            ]}
        >
            <div className="space-y-6">
                {/* Header Info */}
                <div className="text-sm text-muted-foreground text-right">
                    {t("Plugins.manage_info")}
                </div>

                {/* Plugins Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plugins.map((plugin) => (
                        <Card
                            key={plugin.id}
                            className="border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden"
                        >
                            {/* Plugin Header */}
                            <div className="bg-muted  p-4 flex items-center justify-between">
                                <h3 className="font-semibold text-lg">{plugin.name}</h3>
                                <Badge className="bg-white text-cyan-600 hover:bg-white/90 font-semibold">
                                    {plugin.version}
                                </Badge>
                            </div>

                            <CardContent className="p-6 space-y-4">
                                {/* Core Plugin Badge */}
                                {plugin.isCore && (
                                    <div className="flex justify-center">
                                        <Badge className="bg-primary hover:bg-cyan-600  px-4 py-1 text-sm">
                                            {t("Plugins.core_plugin")}
                                        </Badge>
                                    </div>
                                )}

                                {/* Description */}
                                <p className="text-sm text-muted-foreground text-center min-h-[60px]">
                                    {plugin.description}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex gap-3 justify-center pt-2">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="bg-brand-orange hover:bg-brand-orange/90  px-6"
                                        onClick={() => handleDeactivate(plugin)}
                                        disabled={!plugin.isActive}
                                    >
                                        {t("Plugins.deactivate")}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="bg-red-500 hover:bg-red-600 px-6"
                                        onClick={() => handleDelete(plugin)}
                                    >
                                        {t("Plugins.delete")}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Deactivate Confirmation Dialog */}
            <Dialog
                open={deactivateDialog.open}
                onOpenChange={(open) =>
                    setDeactivateDialog({ open, plugin: deactivateDialog.plugin })
                }
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="items-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-orange-500" />
                        </div>
                        <DialogTitle className="text-center text-xl">
                            {t("Plugins.dialog.deactivate.title", {
                                plugin: deactivateDialog.plugin?.name || "",
                            })}
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            {t("Plugins.dialog.deactivate.description", {
                                plugin: deactivateDialog.plugin?.name || "",
                            })}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex-row gap-3 justify-center sm:justify-center">
                        <Button
                            variant="destructive"
                            onClick={confirmDeactivate}
                            className="bg-red-500 hover:bg-red-600  px-8"
                        >
                            {t("Plugins.dialog.deactivate.confirm")}
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => setDeactivateDialog({ open: false, plugin: null })}
                            className="bg-blue-500 hover:bg-blue-600  px-8"
                        >
                            {t("Plugins.dialog.deactivate.cancel")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialog.open}
                onOpenChange={(open) =>
                    setDeleteDialog({ open, plugin: deleteDialog.plugin })
                }
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="items-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <DialogTitle className="text-center text-xl">
                            {t("Plugins.dialog.delete.title", {
                                plugin: deleteDialog.plugin?.name || "",
                            })}
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            {t("Plugins.dialog.delete.description")}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex-row gap-3 justify-center sm:justify-center">
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600 px-8"
                        >
                            {t("Plugins.dialog.delete.confirm")}
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => setDeleteDialog({ open: false, plugin: null })}
                            className="bg-blue-500 hover:bg-blue-600 px-8"
                        >
                            {t("Plugins.dialog.delete.cancel")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Error Dialog */}
            <Dialog
                open={errorDialog.open}
                onOpenChange={(open) => setErrorDialog({ open, message: errorDialog.message })}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="items-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                            <XCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <DialogTitle className="text-center text-xl">
                            {t("Plugins.dialog.error.title")}
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            {errorDialog.message}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="justify-center sm:justify-center">
                        <Button
                            onClick={() => setErrorDialog({ open: false, message: "" })}
                            className="bg-purple-500 hover:bg-purple-600  px-8"
                        >
                            {t("Plugins.dialog.error.ok")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminPageWrapper>
    );
}