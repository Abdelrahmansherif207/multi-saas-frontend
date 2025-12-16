"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export default function PasswordForm() {
    const t = useTranslations('Dashboard.Password');

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid grid-cols-1 gap-5">
                        <div className="grid gap-5">
                            <Label htmlFor="old-password">{t('labels.old_password')}</Label>
                            <Input
                                id="old-password"
                                type="password"
                                placeholder={t('placeholders.old_password')}
                                required
                            />
                        </div>
                        <div className="grid gap-5">
                            <Label htmlFor="new-password">{t('labels.new_password')}</Label>
                            <Input
                                id="new-password"
                                type="password"
                                placeholder={t('placeholders.new_password')}
                                required
                            />
                        </div>
                        <div className="grid gap-5">
                            <Label htmlFor="confirm-password">{t('labels.confirm_password')}</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder={t('placeholders.confirm_password')}
                                required
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-end gap-3">
                <Button type="submit" className="w-full sm:w-auto">
                    {t('save_button')}
                </Button>
            </CardFooter>
        </Card>
    );
}
