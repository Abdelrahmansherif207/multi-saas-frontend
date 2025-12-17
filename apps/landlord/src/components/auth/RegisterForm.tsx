"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Link } from "@/i18n/routing"

export function RegisterForm() {
    return (
        <Card className="w-full border-0 shadow-xl bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                <CardDescription className="text-center">
                    Enter your information to get started with your landlord dashboard
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" className="h-11" placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" className="h-11" placeholder="johndoe" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="h-11" placeholder="m@example.com" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" className="h-11" placeholder="+1234567890" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" className="h-11" placeholder="123 Main St" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Select>
                        <SelectTrigger id="country" className="h-11">
                            <SelectValue placeholder="Select A Country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="eg">Egypt</SelectItem>
                            <SelectItem value="sa">Saudi Arabia</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput id="password" className="h-11" placeholder="••••••••" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <PasswordInput id="confirm-password" className="h-11" placeholder="••••••••" />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                    Register
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                        Login
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
