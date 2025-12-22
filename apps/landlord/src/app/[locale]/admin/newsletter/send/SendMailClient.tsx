"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/admin/shared/RichTextEditor";
import { useState } from "react";

interface SendMailClientProps {
    translations: {
        send_to_all: string;
        subject: string;
        subject_placeholder: string;
        message: string;
        send_mail: string;
    }
}

export function SendMailClient({ translations: t }: SendMailClientProps) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSend = () => {
        console.log("Sending mail:", { subject, message });
        // API call would go here
    };

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6 space-y-6">
                <h3 className="text-lg font-semibold">{t.send_to_all}</h3>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="subject" className="text-sm font-medium">
                        {t.subject}
                    </Label>
                    <Input
                        id="subject"
                        placeholder={t.subject_placeholder}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>

                {/* Message Editor */}
                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">
                        {t.message}
                    </Label>
                    <RichTextEditor
                        content={message}
                        onChange={setMessage}
                    />
                </div>

                {/* Send Button */}
                <Button
                    className="bg-primary hover:bg-primary/90 text-white dark:text-black"
                    onClick={handleSend}
                >
                    {t.send_mail}
                </Button>
            </div>
        </div>
    );
}
