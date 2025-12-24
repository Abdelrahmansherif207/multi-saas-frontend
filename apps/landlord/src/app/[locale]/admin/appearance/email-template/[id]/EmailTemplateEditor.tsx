"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/admin/shared/RichTextEditor";

interface EmailTemplateEditorProps {
    id: string;
    translations: {
        edit_title: string;
        subject: string;
        message: string;
        update_changes: string;
    };
}

export function EmailTemplateEditor({ id, translations }: EmailTemplateEditorProps) {
    const [subject, setSubject] = useState("Verify Mail to Admin");
    const [message, setMessage] = useState("<p>Hello Admin,</p><p>A new user has registered...</p><p>Thanks, System.</p>");

    return (
        <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">{translations.edit_title}</h2>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.subject}</Label>
                    <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.message}</Label>
                    <RichTextEditor
                        content={message}
                        onChange={setMessage}
                    />
                    <p className="text-xs text-muted-foreground">Shortcodes: [name], [email], [link], etc.</p>
                </div>

                <div className="pt-4">
                    <Button className="bg-primary hover:bg-primary/90 rounded-lg w-full sm:w-auto px-8">
                        {translations.update_changes}
                    </Button>
                </div>
            </div>
        </div>
    );
}
