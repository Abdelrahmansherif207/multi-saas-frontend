"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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

const registerSchema = z.object({
    name: z.string().min(2),
    username: z.string().min(2),
    email: z.string().email(),
    mobile: z.string().optional(),
    address: z.string().optional(),
    country: z.string().optional(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
})

type RegisterValues = z.infer<typeof registerSchema>

export function RegisterForm() {
    const t = useTranslations('Auth.Register');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [rootError, setRootError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            mobile: "",
            address: "",
            country: "",
            password: "",
            password_confirmation: "",
        },
    })

    async function onSubmit(data: RegisterValues) {
        setIsLoading(true);
        setRootError(null);

        try {
            await axios.post('/api/auth/register', data);

            // Redirect to home page (since registration logs them in)
            router.push('/');
            router.refresh();
        } catch (err: any) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                const serverErrors = err.response.data.errors;
                Object.keys(serverErrors).forEach((key) => {
                    setError(key as keyof RegisterValues, {
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
        <Card className="w-full border-0 shadow-lg bg-card dark:bg-card backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">{t('title')}</CardTitle>
                <CardDescription className="text-center">
                    {t('description')}
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="grid gap-4">
                    {rootError && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md">
                            {rootError}
                        </div>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="name">{t('label_name')}</Label>
                        <Input
                            id="name"
                            className="h-11"
                            placeholder={t('placeholder_name')}
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">{errors.name.message || t('error_name_required')}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">{t('label_username')}</Label>
                        <Input
                            id="username"
                            className="h-11"
                            placeholder={t('placeholder_username')}
                            {...register("username")}
                        />
                        {errors.username && (
                            <p className="text-xs text-red-500">{errors.username.message || t('error_username_required')}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('label_email')}</Label>
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
                        <Label htmlFor="mobile">{t('label_phone')}</Label>
                        <Input
                            id="mobile"
                            type="tel"
                            className="h-11"
                            placeholder={t('placeholder_phone')}
                            {...register("mobile")}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="address">{t('label_address')}</Label>
                        <Input
                            id="address"
                            className="h-11"
                            placeholder={t('placeholder_address')}
                            {...register("address")}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="country">{t('label_country')}</Label>
                        <Select onValueChange={(value) => setValue("country", value)}>
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
                        <PasswordInput
                            id="password"
                            className="h-11"
                            placeholder={t('placeholder_password')}
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">{errors.password.message || t('error_password_required')}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password">{t('label_confirm_password')}</Label>
                        <PasswordInput
                            id="confirm-password"
                            className="h-11"
                            placeholder={t('placeholder_password')}
                            {...register("password_confirmation")}
                        />
                        {errors.password_confirmation && (
                            <p className="text-xs text-red-500">{errors.password_confirmation.message || t('error_password_mismatch')}</p>
                        )}
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
                        {t('has_account')}{" "}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            {t('login_link')}
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}
