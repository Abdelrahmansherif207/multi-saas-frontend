import { Header } from './Header';
import { Footer } from './Footer';
import { TenantLayoutProps } from '../types';

export function TenantLayout({ children, config, menu }: TenantLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header config={config} menu={menu} />
            <main className="flex-1">
                {children}
            </main>
            <Footer config={config} />
        </div>
    );
}
