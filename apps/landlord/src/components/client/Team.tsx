"use client";

import { Facebook, Instagram, Linkedin, Sparkle, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Marvin McKinney",
        role: "CEO",
        image: "https://i.pravatar.cc/400?u=marvin",
    },
    {
        name: "Kristin Watson",
        role: "Project Manager",
        image: "https://i.pravatar.cc/400?u=kristin",
    },
    {
        name: "Jane Cooper",
        role: "UI/UX Designer",
        image: "https://i.pravatar.cc/400?u=jane",
    },
    {
        name: "Ronald Richards",
        role: "Content Writer",
        image: "https://i.pravatar.cc/400?u=ronald",
    },
];

export function Team() {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <div className="relative inline-block">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Expert Team <span className="text-brand-orange">Members</span>
                    </h2>
                    <Sparkle className="absolute -top-6 -right-8 w-8 h-8 text-brand-orange fill-brand-orange animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="group bg-card rounded-3xl overflow-hidden border border-border/40 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                            <p className="text-muted-foreground text-sm mb-4">{member.role}</p>

                            <div className="flex gap-3">
                                <Link
                                    href="#"
                                    className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-brand-orange hover:text-white transition-colors"
                                >
                                    <Facebook className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="#"
                                    className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-brand-orange hover:text-white transition-colors"
                                >
                                    <Twitter className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="#"
                                    className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-brand-orange hover:text-white transition-colors"
                                >
                                    <Instagram className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
