"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function LoginForm() {
    const t = useTranslations('Auth.Login');

    return (
        <Card className="w-full border-0 shadow-xl bg-card dark:bg-card backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">{t('title')}</CardTitle>
                <CardDescription className="text-center">
                    {t('description')}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">{t('label_email_username')}</Label>
                    <Input id="email" className="h-11" placeholder={t('placeholder_email')} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">{t('label_password')}</Label>
                    <PasswordInput id="password" className="h-11" placeholder={t('placeholder_password')} />
                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            {t('forgot_password')}
                        </Link>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                    {t('submit')}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                    {t('no_account')}{" "}
                    <Link href="/register" className="text-primary hover:underline font-medium">
                        {t('register_link')}
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
