import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default async function page() {
    const tmenu = await getTranslations("Admin.PaymentManage.menu");
    const t = await getTranslations("Admin.PaymentManage.form");
    const tc = await getTranslations("Admin.PaymentManage.form.currencies");

    const paymentGateways = [
        { label: "Stripe", value: "stripe" },
        { label: "PayPal", value: "paypal" },
        { label: "Manual", value: "manual" },
    ]
    return (
        <AdminPageWrapper title={tc("site_global_currency")} breadcrumbs={[
            { label: tmenu("title"), href: "/admin/payments" },
            { label: tmenu("currencies"), href: "/admin/payments/currencies" },
        ]}>
            <div className="space-y-6">
                {/* Site Global Currency */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="siteGlobalCurrency">{tc("site_global_currency")}</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder={tc("select_currency")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                            <SelectItem value="gbp">GBP</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* Currency Symbol Position */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="currencySymbolPosition">{tc("currency_symbol_position")}</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder={tc("select_position")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="left">{tc("left")}</SelectItem>
                            <SelectItem value="right">{tc("right")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Custom Currency Symbol */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="customCurrencySymbol">{tc("custom_currency_symbol")}</label>
                    <Input type="text" id="customCurrencySymbol" placeholder={tc("custom_currency_symbol")} />
                    <span className="text-xs text-muted-foreground">{tc("custom_currency_symbol_help")}</span>
                </div>

                {/* Amount Decimal Mode */}
                <div className="border border-border/40 p-4 rounded-2xl">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="amountDecimalMode">{tc("amount_decimal_mode")}</label>
                        <Switch id="amountDecimalMode" className="data-[state=unchecked]:dark:bg-white/40" />
                    </div>
                </div>

                {/* Coupon Apply */}
                <div className="border border-border/40 p-4 rounded-2xl">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="couponApply">{tc("coupon_apply")}</label>
                        <Switch id="couponApply" className="data-[state=unchecked]:dark:bg-white/40" defaultChecked />
                    </div>
                </div>

                {/* Default Payment Gateway */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="defaultPaymentGateway">{tc("default_payment_gateway")}</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder={tc("select_gateway")} />
                        </SelectTrigger>
                        <SelectContent>
                            {paymentGateways.map((gateway) => (
                                <SelectItem key={gateway.value} value={gateway.value}>
                                    {gateway.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* USD to IDR Exchange Rate */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="usdToIdr">USD to IDR Exchange Rate</label>
                    <Input type="text" id="usdToIdr" placeholder={tc("custom_currency_symbol")} />
                    <span className="text-xs text-muted-foreground">{tc("exchange_rate_help", { currency: "IDR" })}</span>
                </div>

                {/* USD to INR Exchange Rate */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="usdToInrExchangeRate">USD to INR Exchange Rate</label>
                    <Input type="text" id="usdToInrExchangeRate" placeholder={tc("custom_currency_symbol")} />
                    <span className="text-xs text-muted-foreground">{tc("exchange_rate_help", { currency: "INR" })}</span>
                </div>

                {/* USD to NGN Exchange Rate */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="usdToNgnExchangeRate">USD to NGN Exchange Rate</label>
                    <Input type="text" id="usdToNgnExchangeRate" placeholder={tc("custom_currency_symbol")} />
                    <span className="text-xs text-muted-foreground">{tc("exchange_rate_help", { currency: "NGN" })}</span>
                </div>

                {/* USD to ZAR Exchange Rate */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="usdToZarExchangeRate">USD to ZAR Exchange Rate</label>
                    <Input type="text" id="usdToZarExchangeRate" placeholder={tc("custom_currency_symbol")} />
                    <span className="text-xs text-muted-foreground">{tc("exchange_rate_help", { currency: "ZAR" })}</span>
                </div>

                {/* USD to BRL Exchange Rate */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="usdToBrlExchangeRate">USD to BRL Exchange Rate</label>
                    <Input type="text" id="usdToBrlExchangeRate" placeholder={tc("custom_currency_symbol")} />
                    <span className="text-xs text-muted-foreground">{tc("exchange_rate_help", { currency: "BRL" })}</span>
                </div>

                {/* USD to MYR Exchange Rate */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="usdToMyrExchangeRate">USD to MYR Exchange Rate</label>
                    <Input type="text" id="usdToMyrExchangeRate" placeholder={tc("custom_currency_symbol")} />
                    <span className="text-xs text-muted-foreground">{tc("exchange_rate_help", { currency: "MYR" })}</span>
                </div>
                <Button className="mt-4">{t("update_changes")}</Button>
            </div>
        </AdminPageWrapper>
    )
}
