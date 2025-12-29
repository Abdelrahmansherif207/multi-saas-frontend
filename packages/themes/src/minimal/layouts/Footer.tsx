import { TenantConfig } from '../../real-estate/types';

interface FooterProps {
    config: TenantConfig;
}

export function Footer({ config }: FooterProps) {
    return (
        <footer className="bg-black text-white py-20 mt-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-black mb-6">{config.name}</h2>
                <div className="flex justify-center gap-8 mb-12">
                    <a href="#" className="uppercase tracking-widest text-sm hover:underline">Instagram</a>
                    <a href="#" className="uppercase tracking-widest text-sm hover:underline">Twitter</a>
                    <a href="#" className="uppercase tracking-widest text-sm hover:underline">LinkedIn</a>
                </div>
                <p className="text-gray-500 uppercase text-xs tracking-widest">
                    © {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    );
}
