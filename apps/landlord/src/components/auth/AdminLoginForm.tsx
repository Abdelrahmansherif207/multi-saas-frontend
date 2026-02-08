"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSearchParams } from "next/navigation"
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
import { Link, useRouter } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import axios from "axios"

const adminLoginSchema = z.object({
    credential: z.string().min(1, "Email or username is required"),
    password: z.string().min(1),
})

type AdminLoginValues = z.infer<typeof adminLoginSchema>

export function AdminLoginForm() {
    const t = useTranslations('Auth.Login');
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AdminLoginValues>({
        resolver: zodResolver(adminLoginSchema),
        defaultValues: {
            credential: "",
            password: "",
        },
    })

    async function onSubmit(data: AdminLoginValues) {
        setIsLoading(true);
        setError(null);

        try {
            await axios.post('/api/admin/auth/login', data);

            // Redirect to admin dashboard or original destination
            const redirect = searchParams.get('redirect') || '/admin';
            router.push(redirect);
            router.refresh(); // Refresh to update middleware state
        } catch (err: any) {
            setError(err.response?.data?.message || t('error_generic'));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full border-0 shadow-xl bg-card dark:bg-card backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">{t('admin_title')}</CardTitle>
                <CardDescription className="text-center">
                    {t('admin_description')}
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
                <CardContent className="grid gap-4">
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md">
                            {error}
                        </div>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="credential">{t('label_email_username')}</Label>
                        <Input
                            id="credential"
                            type="text"
                            className="h-11"
                            placeholder={t('placeholder_email_username')}
                            {...register("credential")}
                        />
                        {errors.credential && (
                            <p className="text-xs text-red-500">{t('error_credential_required')}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">{t('label_password')}</Label>
                        <PasswordInput
                            id="password"
                            className="h-11"
                            placeholder={t('placeholder_password')}
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">{t('error_password_required')}</p>
                        )}
                        <div className="flex justify-end">
                            <Link
                                href="/admin/forgot-password"
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                {t('forgot_password')}
                            </Link>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button
                        type="submit"
                        className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? t('loading') : t('submit')}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
