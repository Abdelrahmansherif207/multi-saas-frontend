
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Dashboard.Profile' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Dashboard.Profile' });

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="grid gap-5">
              <Label htmlFor="name">{t('labels.name')}</Label>
              <Input id="name" type="text" placeholder="" required />
            </div>
            <div className="grid gap-5">
              <Label htmlFor="phone">{t('labels.phone')}</Label>
              <Input id="phone" type="text" placeholder="" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">{t('labels.country')}</Label>
              <Select>
                <SelectTrigger id="country">
                  <SelectValue placeholder={t('placeholders.select_country')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Egypt">{t('countries.egypt')}</SelectItem>
                    <SelectItem value="USA">{t('countries.usa')}</SelectItem>
                    <SelectItem value="Algeria">{t('countries.algeria')}</SelectItem>
                    <SelectItem value="South Africa">{t('countries.south_africa')}</SelectItem>
                    <SelectItem value="Bahrain">{t('countries.bahrain')}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-5">
              <Label htmlFor="state">{t('labels.state')}</Label>
              <Input id="state" type="text" placeholder="" required />
            </div>
            <div className="grid gap-5">
              <Label htmlFor="email">{t('labels.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-5">
              <Label htmlFor="company">{t('labels.company')}</Label>
              <Input id="company" type="text" placeholder="" required />
            </div>
            <div className="grid gap-5">
              <Label htmlFor="address">{t('labels.address')}</Label>
              <Input id="address" type="text" placeholder="" required />
            </div>
            <div className="grid gap-5">
              <Label htmlFor="city">{t('labels.city')}</Label>
              <Input id="city" type="text" placeholder="" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-end gap-3">
        <Button type="submit" className="w-full sm:w-auto">{t('save_button')}</Button>
      </CardFooter>
    </Card>
  );
}
