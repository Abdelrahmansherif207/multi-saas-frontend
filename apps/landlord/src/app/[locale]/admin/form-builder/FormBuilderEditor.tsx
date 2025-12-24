"use client";

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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { X, GripVertical } from "lucide-react";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface FormField {
    id: string;
    type: string;
    label: string;
}

interface FormBuilderEditorProps {
    translations: {
        title: string;
        all_form: string;
        new_form: string;
        language: string;
        form_title: string;
        receiving_email: string;
        email_hint: string;
        button_title: string;
        success_message: string;
        save_changes: string;
        available_fields: string;
        fields: {
            text: string;
            email: string;
            tel: string;
            url: string;
            select: string;
            checkbox: string;
            file: string;
            textarea: string;
        };
    };
    isEdit?: boolean;
}

// Sortable field item component
function SortableFieldItem({
    field,
    onRemove,
}: {
    field: FormField;
    onRemove: (id: string) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "flex items-center justify-between bg-card border border-border/40 rounded-xl px-4 py-3 group",
                isDragging && "opacity-50 shadow-lg"
            )}
        >
            <div className="flex items-center gap-3">
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                >
                    <GripVertical className="h-4 w-4" />
                </button>
                <span className="text-primary font-medium">
                    {field.type}: {field.label}
                </span>
            </div>
            <button
                onClick={() => onRemove(field.id)}
                className="text-destructive hover:text-destructive/80 transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

export function FormBuilderEditor({ translations, isEdit = false }: FormBuilderEditorProps) {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const [activeTab, setActiveTab] = useState<"all" | "new">(isEdit ? "all" : "new");
    const [formFields, setFormFields] = useState<FormField[]>([
        { id: "1", type: "Text", label: "Name" },
        { id: "2", type: "Email", label: "Your Email" },
        { id: "3", type: "Text", label: "Subject" },
        { id: "4", type: "Textarea", label: "" },
        { id: "5", type: "Textarea", label: "Your Message" },
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const availableFields = [
        { type: "text", label: translations.fields.text },
        { type: "email", label: translations.fields.email },
        { type: "tel", label: translations.fields.tel },
        { type: "url", label: translations.fields.url },
        { type: "select", label: translations.fields.select },
        { type: "checkbox", label: translations.fields.checkbox },
        { type: "file", label: translations.fields.file },
        { type: "textarea", label: translations.fields.textarea },
    ];

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setFormFields((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const addField = (type: string, label: string) => {
        const newField: FormField = {
            id: Date.now().toString(),
            type: label,
            label: "",
        };
        setFormFields([...formFields, newField]);
    };

    const removeField = (id: string) => {
        setFormFields(formFields.filter((field) => field.id !== id));
    };

    return (
        <div className="space-y-6">
            {/* Header Tabs */}
            <div className="flex items-center justify-between bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2">
                    <Link href="/admin/form-builder">
                        <Button
                            variant={activeTab === "all" ? "default" : "outline"}
                            className={cn(
                                "rounded-xl h-10 font-semibold",
                                activeTab === "all"
                                    ? "bg-primary hover:bg-primary/90"
                                    : "border-border/40"
                            )}
                            onClick={() => setActiveTab("all")}
                        >
                            {translations.all_form}
                        </Button>
                    </Link>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant={activeTab === "new" ? "default" : "outline"}
                                className={cn(
                                    "rounded-xl h-10 font-semibold",
                                    activeTab === "new"
                                        ? "bg-primary hover:bg-primary/90"
                                        : "border-border/40"
                                )}
                            >
                                {translations.new_form}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] rounded-2xl border-border/40 bg-card backdrop-blur-xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold">{translations.new_form}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-5 py-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-foreground">
                                        {translations.form_title}
                                    </Label>
                                    <Input
                                        placeholder="Enter Title"
                                        className="h-11 rounded-xl bg-background/50 border-border/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-foreground">
                                        {translations.receiving_email}
                                    </Label>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        className="h-11 rounded-xl bg-background/50 border-border/40"
                                    />
                                    <p className="text-xs text-muted-foreground">{translations.email_hint}</p>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-foreground">
                                        {translations.button_title}
                                    </Label>
                                    <Input
                                        placeholder="Enter Button Title"
                                        className="h-11 rounded-xl bg-background/50 border-border/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-foreground">
                                        {translations.success_message}
                                    </Label>
                                    <Textarea
                                        placeholder="form submit success message"
                                        className="min-h-[80px] rounded-xl bg-background/50 border-border/40 resize-none"
                                    />
                                </div>
                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <DialogClose asChild>
                                        <Button variant="outline" className="rounded-xl px-6 h-11 font-semibold">
                                            Close
                                        </Button>
                                    </DialogClose>
                                    <Button className="bg-primary hover:bg-primary/90 rounded-xl px-6 h-11 font-semibold">
                                        {translations.save_changes}
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{translations.language}</span>
                    <Select
                        value={currentLocale}
                        onValueChange={(value) => {
                            router.replace(pathname, { locale: value as "en" | "ar" });
                        }}
                    >
                        <SelectTrigger className="w-[120px] h-9 rounded-lg bg-background/50 border-border/40">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg border-border/40">
                            <SelectItem value="en">English (UK)</SelectItem>
                            <SelectItem value="ar">العربية</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Panel - Form Settings */}
                <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-xl font-bold text-foreground">{translations.title}</h2>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-primary">
                            {translations.form_title}
                        </Label>
                        <Input
                            className="h-12 rounded-xl bg-background/50 border-border/40"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-primary">
                            {translations.receiving_email}
                        </Label>
                        <Input
                            className="h-12 rounded-xl bg-background/50 border-border/40"
                            defaultValue="info@example.com"
                        />
                        <p className="text-xs text-muted-foreground">{translations.email_hint}</p>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-primary">
                            {translations.button_title}
                        </Label>
                        <Input
                            className="h-12 rounded-xl bg-background/50 border-border/40"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-primary">
                            {translations.success_message}
                        </Label>
                        <Textarea
                            className="min-h-[80px] rounded-xl bg-background/50 border-border/40 resize-none"
                        />
                    </div>

                    {/* Sortable Form Fields */}
                    <div className="space-y-3">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={formFields.map((f) => f.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {formFields.map((field) => (
                                    <SortableFieldItem
                                        key={field.id}
                                        field={field}
                                        onRemove={removeField}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>

                    <Button className="bg-primary hover:bg-primary/90 rounded-xl px-8 h-12 font-bold transition-all duration-300">
                        {translations.save_changes}
                    </Button>
                </div>

                {/* Right Panel - Available Fields */}
                <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-xl font-bold text-foreground mb-6">
                        {translations.available_fields}
                    </h2>

                    <div className="space-y-2">
                        {availableFields.map((field) => (
                            <button
                                key={field.type}
                                onClick={() => addField(field.type, field.label)}
                                className="w-full text-left px-4 py-3 bg-background/50 border border-border/40 rounded-xl hover:bg-muted/50 hover:border-primary/30 transition-all text-foreground font-medium"
                            >
                                {field.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
