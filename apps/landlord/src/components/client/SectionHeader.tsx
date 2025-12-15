import { Sparkle } from "lucide-react";
interface SectionHeaderProps {
  prefix: string;
  highlight: string;
  suffix?: string;
  highlightClass?: string;
}

export default function SectionHeader({
  prefix,
  highlight,
  suffix,
  highlightClass = "text-brand-orange",
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center mb-16 space-y-4">
      <div className="relative inline-block">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight capitalize">
          {prefix} <span className={highlightClass}>{highlight}</span>{suffix}
        </h2>
        <Sparkle className="absolute -top-6 -right-8 w-8 h-8 text-brand-orange fill-brand-orange animate-pulse" />
      </div>
    </div>
  );
}
