import { Header } from './Header';
import { Footer } from './Footer';
import { TenantLayoutProps } from '../types';

export function TenantLayout({ children, config, menu, localization }: TenantLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col font-real-estate">
            <Header config={config} menu={menu} localization={localization} />
            <main className="flex-1">
                {children}
            </main>
            <Footer config={config} />
        </div>
    );
}
