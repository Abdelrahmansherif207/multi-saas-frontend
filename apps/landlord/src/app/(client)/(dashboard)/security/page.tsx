"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode } from "lucide-react"; // Using an icon as a placeholder for the QR code

export default function SecurityPage() {
    return (
        <div className="space-y-8 p-6 max-w-4xl">
            <h1 className="text-2xl font-bold">Two Factor Authentication Settings</h1>

            <p className="text-muted-foreground text-sm">
                Two factor authentication (2FA) strengthens access security by requiring two methods (also referred to as factors) to verify your identity.
            </p>

            <div className="space-y-4">
                <h2 className="text-base font-medium text-foreground">
                    1. Scan this QR code with your Google Authenticator App.
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
                    2. Enter the pin from Google Authenticator app:
                </h2>

                <div className="space-y-2">
                    <Label htmlFor="auth-code" className="text-sm text-muted-foreground">Authenticator Code</Label>
                    <Input
                        id="auth-code"
                        placeholder="input code:"
                        className="w-full"
                    />
                </div>
            </div>

            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-medium px-6">
                Enable 2FA
            </Button>
        </div>
    );
}
