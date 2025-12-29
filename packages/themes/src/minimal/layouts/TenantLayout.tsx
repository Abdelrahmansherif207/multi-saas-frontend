import { Header } from './Header';
import { Footer } from './Footer';
import { TenantConfig, MenuItem } from '../../real-estate/types';

interface TenantLayoutProps {
    children: React.ReactNode;
    config: TenantConfig;
    menu?: MenuItem[];
}

export function TenantLayout({ children, config, menu }: TenantLayoutProps) {
    return (
        <div className="min-h-screen bg-white text-black font-mono">
            <Header config={config} menu={menu} />
            <main>
                {children}
            </main>
            <Footer config={config} />
        </div>
    );
}
