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

// Map server validation keys to user-friendly messages
const validationMessages: Record<string, string> = {
    'validation.password.mixed': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    'validation.password.letters': 'Password must contain at least one letter',
    'validation.password.symbols': 'Password must contain at least one special character',
    'validation.password.numbers': 'Password must contain at least one number',
    'validation.password.uncompromised': 'This password has been compromised. Please choose a different one',
};

function translateValidationMessage(message: string): string {
    return validationMessages[message] || message;
}

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginForm() {
    const t = useTranslations('Auth.Login');
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [rootError, setRootError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: LoginValues) {
        setIsLoading(true);
        setRootError(null);

        try {
            await axios.post('/api/auth/login', data);

            // Redirect to home or original destination
            const redirect = searchParams.get('redirect') || '/';
            router.push(redirect);
            router.refresh(); // Refresh to update middleware state
        } catch (err: any) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                const serverErrors = err.response.data.errors;
                Object.keys(serverErrors).forEach((key) => {
                    setError(key as keyof LoginValues, {
                        type: "server",
                        message: translateValidationMessage(serverErrors[key][0])
                    });
                });
            } else {
                setRootError(err.response?.data?.message || t('error_generic'));
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full border-0 shadow-xl bg-card dark:bg-card backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">{t('title')}</CardTitle>
                <CardDescription className="text-center">
                    {t('description')}
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
                <CardContent className="grid gap-4">
                    {rootError && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md">
                            {rootError}
                        </div>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('label_email_username')}</Label>
                        <Input
                            id="email"
                            type="email"
                            className="h-11"
                            placeholder={t('placeholder_email')}
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">{errors.email.message || t('error_email_required')}</p>
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
                            <p className="text-xs text-red-500">{errors.password.message || t('error_password_required')}</p>
                        )}
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
                    <Button
                        type="submit"
                        className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? t('loading') : t('submit')}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                        {t('no_account')}{" "}
                        <Link href="/register" className="text-primary hover:underline font-medium">
                            {t('register_link')}
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}
