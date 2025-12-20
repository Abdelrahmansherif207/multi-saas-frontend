"use client";

import { useTranslations } from "next-intl";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock Data matching the image
const monthlyData = [
    { name: "January", value: 0 },
    { name: "February", value: 0 },
    { name: "March", value: 0 },
    { name: "April", value: 0 },
    { name: "May", value: 0 },
    { name: "June", value: 0 },
    { name: "July", value: 0 },
    { name: "August", value: 0 },
    { name: "September", value: 0 },
    { name: "October", value: 0 },
    { name: "November", value: 0 },
    { name: "December", value: 0.1 },
];

const dailyData = [
    { name: "Tue, 09 December 2025", value: 0 },
    // Add a few more days to make it look like a chart, or stick to the single point if strict
    // Image shows just one label for the bar, but grids imply more space.
    // I'll add the specific date shown.
];

export function DashboardCharts() {
    const t = useTranslations("Admin.Dashboard.charts");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Amount Per Month Chart */}
            <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-bold text-foreground/80">{t("amount_per_month")}</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    interval={11} // Show only December to match image roughly? Or auto.
                                // The image shows "December" centered.
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    domain={[0, 1.0]}
                                    ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
                                />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Legend
                                    verticalAlign="top"
                                    align="right"
                                    iconType="rect"
                                    formatter={(value) => <span className="text-sm text-gray-500">{value}</span>}
                                />
                                <Bar
                                    dataKey="value"
                                    name={t("amount_received")}
                                    fill="#0EA5E9" // Blue color
                                    radius={[4, 4, 0, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Amount Per Day Chart */}
            <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-bold text-foreground/80">{t("amount_per_day")}</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailyData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    domain={[0, 1.0]}
                                    ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
                                />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Legend
                                    verticalAlign="top"
                                    align="right"
                                    iconType="rect"
                                    formatter={(value) => <span className="text-sm text-gray-500">{value}</span>}
                                />
                                <Bar
                                    dataKey="value"
                                    name={t("amount_received")}
                                    fill="#F97316" // Orange color matching screenshot roughly
                                    radius={[4, 4, 0, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
