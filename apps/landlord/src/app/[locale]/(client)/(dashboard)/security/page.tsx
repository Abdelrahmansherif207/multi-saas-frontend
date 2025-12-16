
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Dashboard.Security' });

    return {
        title: t('meta_title'),
        description: t('meta_description'),
    };
}

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Dashboard.Security' });

    return (
        <div className="space-y-8 p-6 max-w-4xl">
            <h1 className="text-2xl font-bold">{t('heading')}</h1>

            <p className="text-muted-foreground text-sm">
                {t('info')}
            </p>

            <div className="space-y-4">
                <h2 className="text-base font-medium text-foreground">
                    {t('step1')}
                </h2>

                {/* QR Code Placeholder */}
                <div className="p-4 bg-white border rounded-md inline-block">
                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
                        <QrCode className="w-24 h-24 text-gray-400" strokeWidth={1} />
                    </div>
                </div>
            </div>

            <div className="space-y-4 max-w-md">
                <h2 className="text-base font-medium text-foreground">
                    {t('step2')}
                </h2>

                <div className="space-y-2">
                    <Label htmlFor="auth-code" className="text-sm text-muted-foreground">{t('auth_code_label')}</Label>
                    <Input
                        id="auth-code"
                        placeholder={t('auth_code_placeholder')}
                        className="w-full"
                    />
                </div>
            </div>

            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-medium px-6">
                {t('enable_button')}
            </Button>
        </div>
    );
}
