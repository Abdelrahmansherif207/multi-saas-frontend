"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, Upload, Globe, Facebook, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    excerpt: z.string().max(191, "Excerpt must be at most 191 characters").optional(),
    category: z.string().min(1, "Please select a category"),
    tags: z.string().optional(),
    visibility: z.string().min(1, "Please select visibility"),
    status: z.string().min(1, "Please select status"),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    fbTitle: z.string().optional(),
    fbDescription: z.string().optional(),
    twitterTitle: z.string().optional(),
    twitterDescription: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewBlogPage() {
    const [activeTab, setActiveTab] = useState<"general" | "facebook" | "twitter">("general");
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            excerpt: "",
            category: "",
            tags: "",
            visibility: "public",
            status: "draft",
            seoTitle: "",
            seoDescription: "",
            fbTitle: "",
            fbDescription: "",
            twitterTitle: "",
            twitterDescription: "",
        },
    });

    function onSubmit(values: FormValues) {
        console.log(values);
        // Handle submission
    }

    return (
        <AdminPageWrapper
            title="New Blog Post"
            breadcrumbs={[
                { label: "Admin", href: "/admin" },
                { label: "Blogs", href: "/admin/blogs" },
                { label: "New Blog Post", href: "/admin/blogs/new-blog" },
            ]}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column - Sidebar */}
                        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
                            <Card className="border-border/40 bg-card/60 backdrop-blur-xl shadow-sm">
                                <CardContent className="p-6 space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="programming">Programming</SelectItem>
                                                        <SelectItem value="design">Design</SelectItem>
                                                        <SelectItem value="marketing">Marketing</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="tags"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tags</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter tags separated by commas" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="visibility"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Visibility</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select visibility" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="public">Public</SelectItem>
                                                        <SelectItem value="private">Private</SelectItem>
                                                        <SelectItem value="hidden">Hidden</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="draft">Draft</SelectItem>
                                                        <SelectItem value="published">Published</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-2">
                                        <Label>Featured Image</Label>
                                        <div className="relative aspect-video rounded-lg border-2 border-dashed border-border/60 bg-muted/30 flex flex-col items-center justify-center overflow-hidden group">
                                            {previewImage ? (
                                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center p-4">
                                                    <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                                                    <p className="text-xs text-muted-foreground">
                                                        Recommended: 1920 x 1280 px
                                                    </p>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button type="button" variant="secondary" size="sm" className="gap-2">
                                                    <Upload className="w-4 h-4" />
                                                    Upload Image
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                                        Submit New Post
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Main Content */}
                        <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
                            <Card className="border-border/40 bg-card/60 backdrop-blur-xl shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold">New Blog Post</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter blog title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Blog Content</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Write your blog content here..."
                                                        className="min-h-[300px] resize-y"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="excerpt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Excerpt</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Brief summary of the post"
                                                        className="min-h-[80px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-right text-xs">
                                                    max. 191 characters
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* SEO Section */}
                            <Card className="border-border/40 bg-card/60 backdrop-blur-xl shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-brand-orange" />
                                        SEO Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex border-b border-border/40 mb-6">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("general")}
                                            className={cn(
                                                "px-4 py-2 text-sm font-medium transition-colors relative",
                                                activeTab === "general" ? "text-brand-orange" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            General
                                            {activeTab === "general" && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("facebook")}
                                            className={cn(
                                                "px-4 py-2 text-sm font-medium transition-colors relative",
                                                activeTab === "facebook" ? "text-brand-orange" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            Facebook
                                            {activeTab === "facebook" && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("twitter")}
                                            className={cn(
                                                "px-4 py-2 text-sm font-medium transition-colors relative",
                                                activeTab === "twitter" ? "text-brand-orange" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            Twitter
                                            {activeTab === "twitter" && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {activeTab === "general" && (
                                            <div className="space-y-4 animate-in fade-in-50 duration-300">
                                                <FormField
                                                    control={form.control}
                                                    name="seoTitle"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>SEO Title</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter SEO title" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="seoDescription"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>SEO Description</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder="Enter SEO description" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}

                                        {activeTab === "facebook" && (
                                            <div className="space-y-4 animate-in fade-in-50 duration-300">
                                                <div className="flex items-center gap-2 text-blue-600 mb-2">
                                                    <Facebook className="w-5 h-5" />
                                                    <span className="font-semibold">Facebook Meta Information</span>
                                                </div>
                                                <FormField
                                                    control={form.control}
                                                    name="fbTitle"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Facebook Title</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter Facebook title" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="fbDescription"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Facebook Description</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder="Enter Facebook description" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}

                                        {activeTab === "twitter" && (
                                            <div className="space-y-4 animate-in fade-in-50 duration-300">
                                                <div className="flex items-center gap-2 text-sky-500 mb-2">
                                                    <Twitter className="w-5 h-5" />
                                                    <span className="font-semibold">Twitter Meta Information</span>
                                                </div>
                                                <FormField
                                                    control={form.control}
                                                    name="twitterTitle"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Twitter Title</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter Twitter title" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="twitterDescription"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Twitter Description</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder="Enter Twitter description" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>
        </AdminPageWrapper>
    );
}
