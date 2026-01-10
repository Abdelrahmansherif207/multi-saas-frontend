"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const smtpFormSchema = z.object({
  mailer: z.string().optional(),
  host: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  port: z.string().optional(),
  encryption: z.enum(["none", "ssl", "tls"]).optional(),
  from_email: z.string().optional(),
  from_name: z.string().optional(),
});

const testFormSchema = z.object({
  test_email: z.string().email().optional(),
});

export default function SmtpSettingsPage() {
  const t = useTranslations("Admin.GeneralSettings.smtp_settings");

  const smtpForm = useForm<z.infer<typeof smtpFormSchema>>({
    resolver: zodResolver(smtpFormSchema) as any,
    defaultValues: {
      mailer: "smtp",
      host: "",
      username: "",
      password: "",
      port: "465",
      encryption: "ssl",
      from_email: "",
      from_name: "",
    },
  });

  const testForm = useForm<z.infer<typeof testFormSchema>>({
    resolver: zodResolver(testFormSchema) as any,
    defaultValues: {
      test_email: "",
    },
  });

  function onSubmitSMTP(values: z.infer<typeof smtpFormSchema>) {
    console.log(values);
  }

  function onSendTest(values: z.infer<typeof testFormSchema>) {
    console.log(values);
  }

  return (
    <AdminPageWrapper
      title={t("title")}
      breadcrumbs={[{ label: t("title"), href: "/admin/general-settings/smtp-settings" }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8 lg:col-span-1">
          <Form {...testForm}>
            <form onSubmit={testForm.handleSubmit(onSendTest)} className="space-y-4">
              <h3 className="text-right text-base font-semibold">{t("test_email_title")}</h3>
              <p className="text-[10px] text-muted-foreground text-right">{t("test_email_help")}</p>

              <FormField
                control={testForm.control}
                name="test_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-end">{t("test_email_title")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("test_email_placeholder")} {...field} className="text-right" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-2">
                <Button type="submit" className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black font-medium w-full sm:w-auto">
                  {t("send_test_email")}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8 lg:col-span-2">
          <Form {...smtpForm}>
            <form onSubmit={smtpForm.handleSubmit(onSubmitSMTP)} className="space-y-6">
              <div className="space-y-6">
                <FormField
                  control={smtpForm.control}
                  name="mailer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-end">{t("mailer")}</FormLabel>
                      <FormControl>
                        <Input placeholder="smtp" {...field} className="text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={smtpForm.control}
                  name="host"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-end">{t("host")}</FormLabel>
                      <FormControl>
                        <Input placeholder="smtp.gmail.com" {...field} className="text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={smtpForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-end">{t("username")}</FormLabel>
                      <FormControl>
                        <Input placeholder="mailaccount@your.site" {...field} className="text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={smtpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-end">{t("password")}</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="********" {...field} className="text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={smtpForm.control}
                  name="port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-end">{t("port")}</FormLabel>
                      <FormControl>
                        <Input placeholder="465" {...field} className="text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={smtpForm.control}
                  name="encryption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-end">{t("encryption")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-right flex-row-reverse">
                            <SelectValue placeholder={t("encryption_none")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent align="end">
                          <SelectItem value="none">{t("encryption_none")}</SelectItem>
                          <SelectItem value="ssl">{t("encryption_ssl")}</SelectItem>
                          <SelectItem value="tls">{t("encryption_tls")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={smtpForm.control}
                  name="from_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-end">{t("from_email")}</FormLabel>
                      <FormControl>
                        <Input placeholder="no-reply@your.site" {...field} className="text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={smtpForm.control}
                  name="from_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-end">{t("from_name")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Wajha" {...field} className="text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black font-medium w-full sm:w-auto">
                  {t("save_changes")}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AdminPageWrapper>
  );
}
