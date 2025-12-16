import { PagesHeader } from "@/components/client/PagesHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Wajha",
    description: "Get in touch with the Wajha team for support, inquiries, or partnership opportunities.",
    openGraph: {
        title: "Contact Us | Wajha",
        description: "Get in touch with the Wajha team for support, inquiries, or partnership opportunities.",
        type: "website",
        siteName: "Wajha",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us | Wajha",
        description: "Get in touch with the Wajha team for support, inquiries, or partnership opportunities.",
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            <PagesHeader
                title="Contact Us"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Contact Us" }
                ]}
            />

            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Call Us Card */}
                    <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-card border border-border/40 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-6 text-brand-orange group-hover:scale-110 transition-transform duration-300">
                            <Phone className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Call Us</h3>
                        <div className="space-y-2 text-muted-foreground">
                            <p>+881515001050</p>
                            <p>+018714515811</p>
                        </div>
                    </div>

                    {/* Location Card */}
                    <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-card border border-border/40 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-6 text-brand-orange group-hover:scale-110 transition-transform duration-300">
                            <MapPin className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Location</h3>
                        <div className="space-y-2 text-muted-foreground">
                            <p>Darussalam, Mirpur</p>
                            <p>Dhaka-1216</p>
                        </div>
                    </div>

                    {/* Email Card */}
                    <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-card border border-border/40 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-6 text-brand-orange group-hover:scale-110 transition-transform duration-300">
                            <Mail className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Email</h3>
                        <div className="space-y-2 text-muted-foreground">
                            <p>test@gmail.com</p>
                            <p>contact@gmail.com</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 pb-16 md:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Google Map */}
                    <div className="w-full h-[400px] lg:h-auto min-h-[400px] rounded-3xl overflow-hidden shadow-sm border border-border/40">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7290573.081198563!2d26.38029147573934!3d26.844717117183327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14368976c35c36e9%3A0x2c45a00925c4c444!2sEgypt!5e0!3m2!1sen!2seg!4v1647879943245!5m2!1sen!2seg"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    {/* Contact Form */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Send us a message</h2>
                        </div>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Name" className="bg-background" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Your Email</Label>
                                <Input id="email" type="email" placeholder="Your Email" className="bg-background" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="Subject" className="bg-background" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Your Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Your Message"
                                    className="min-h-[150px] bg-background resize-none"
                                />
                            </div>

                            <Button type="submit" size="lg" className="w-40 bg-primary text-primary-foreground hover:bg-primary/90">
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
