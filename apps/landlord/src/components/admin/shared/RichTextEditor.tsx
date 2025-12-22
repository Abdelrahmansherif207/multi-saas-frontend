"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSidebar } from '../sidebar-context';

interface RichTextEditorProps {
    content?: string;
    onChange?: (content: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ content = '', onChange, placeholder = 'Write something...' }: RichTextEditorProps) {
    const sidebar = useSidebar();
    const editorRef = useRef<any>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex flex-col rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-lg ring-1 ring-black/5 overflow-hidden h-[500px] animate-pulse items-center justify-center text-muted-foreground">
                Initializing Editor...
            </div>
        );
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                .tox-tinymce {
                    border: none !important;
                    box-shadow: none !important;
                    border-radius: 16px !important;
                }
                .tox-tinymce--focused {
                    border: none !important;
                    box-shadow: none !important;
                    outline: none !important;
                }
                .tox-edit-area__iframe {
                    background: transparent !important;
                }
                /* Hide the blue focus ring on the iframe container */
                .tox .tox-edit-area:focus-within {
                    outline: none !important;
                    border: none !important;
                }
                .tox:not([dir=rtl]) .tox-toolbar__group:not(:last-child) {
                    border-right: 1px solid rgba(0,0,0,0.05) !important;
                }
            `}} />
            <Editor
                id="newsletter-rich-text-editor"
                apiKey="i8c8fx0itvxom4b7avwkeu9ugncb72v9z54otnf842z7olwu"
                onInit={(evt, editor) => editorRef.current = editor}
                value={content}
                onEditorChange={(newContent) => onChange?.(newContent)}
                init={{
                    height: 500,
                    menubar: false,
                    placeholder,

                    // Essential plugins
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'table', 'help', 'wordcount'
                    ],

                    // Toolbar
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic underline strikethrough | forecolor backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist | link image table | removeformat | code preview fullscreen',

                    // Email-safe configuration
                    inline_styles: true,
                    convert_urls: false,
                    relative_urls: false,
                    remove_script_host: false,

                    // Visual consistency
                    skin: 'oxide',
                    content_css: 'default',

                    // Internal Iframe Styles
                    content_style: `
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
                            font-size: 14px; 
                            line-height: 1.6; 
                            color: #333 !important;
                            padding: 20px;
                            background-color: #ffffff !important;
                        }
                        /* Completely remove focus outline and border inside iframe */
                        body:focus { outline: none !important; }
                        .mce-content-body:focus { outline: none !important; }
                        
                        /* Aggressive placeholder hiding on focus */
                        body[data-mce-placeholder].mce-edit-focus:before {
                            display: none !important;
                        }
                        
                        /* Ensure placeholder has a consistent color on white bg */
                        body[data-mce-placeholder]:before {
                            color: #999 !important;
                        }

                        img { max-width: 100%; height: auto; }
                        table { border-collapse: collapse; width: 100%; }
                        table td, table th { border: 1px solid #ddd; padding: 8px; }
                        blockquote { border-left: 3px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px; }
                    `,

                    // Layout options
                    branding: false,
                    promotion: false,
                    statusbar: false,
                    highlight_on_focus: false, // Disables the default blue border behavior

                    setup: (editor: any) => {
                        editor.on('init', () => {
                            editor.getDoc().body.style.fontSize = '14px';
                        });

                        // Handle sidebar toggle
                        editor.on('FullscreenStateChanged', (e: any) => {
                            if (sidebar) {
                                if (e.state) {
                                    sidebar.collapseSidebar();
                                } else {
                                    sidebar.expandSidebar();
                                }
                            }
                        });
                    }
                }}
            />
        </>
    );
}
