"use client";

import CountUp from "react-countup";

export function Stats() {
    const stats = [
        {
            value: 38,
            suffix: "+",
            label: "Years in the industry",
        },
        {
            value: 1300,
            suffix: "+",
            label: "Employees working",
        },
        {
            value: 20,
            suffix: "k",
            label: "Active registered users",
        },
        {
            value: 22,
            suffix: "+",
            label: "Active registered users",
        },
    ];

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <span className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                <CountUp
                                    end={stat.value}
                                    duration={2.5}
                                    separator=","
                                    enableScrollSpy
                                    scrollSpyOnce
                                />
                                {stat.suffix}
                            </span>
                            <span className="text-muted-foreground font-medium">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
