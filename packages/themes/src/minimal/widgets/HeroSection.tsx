import { HeroSectionProps } from '../../real-estate/types';

export function HeroSection({ title, subtitle }: HeroSectionProps) {
    return (
        <section className="py-32 container mx-auto px-4 border-b border-black">
            <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
                {title}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl leading-relaxed text-gray-600">
                {subtitle}
            </p>
        </section>
    );
}
