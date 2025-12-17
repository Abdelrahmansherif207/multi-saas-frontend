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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function RegisterForm() {
    const t = useTranslations('Auth.Register');

    return (
        <Card className="w-full border-0 shadow-lg bg-card dark:bg-card backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">{t('title')}</CardTitle>
                <CardDescription className="text-center">
                    {t('description')}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">{t('label_name')}</Label>
                    <Input id="name" className="h-11" placeholder={t('placeholder_name')} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="username">{t('label_username')}</Label>
                    <Input id="username" className="h-11" placeholder={t('placeholder_username')} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">{t('label_email')}</Label>
                    <Input id="email" type="email" className="h-11" placeholder={t('placeholder_email')} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">{t('label_phone')}</Label>
                    <Input id="phone" type="tel" className="h-11" placeholder={t('placeholder_phone')} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">{t('label_address')}</Label>
                    <Input id="address" className="h-11" placeholder={t('placeholder_address')} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="country">{t('label_country')}</Label>
                    <Select>
                        <SelectTrigger id="country" className="h-11">
                            <SelectValue placeholder={t('placeholder_country')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="eg">Egypt</SelectItem>
                            <SelectItem value="sa">Saudi Arabia</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">{t('label_password')}</Label>
                    <PasswordInput id="password" className="h-11" placeholder={t('placeholder_password')} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirm-password">{t('label_confirm_password')}</Label>
                    <PasswordInput id="confirm-password" className="h-11" placeholder={t('placeholder_password')} />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                    {t('submit')}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                    {t('has_account')}{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                        {t('login_link')}
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
