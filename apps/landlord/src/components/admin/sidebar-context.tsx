"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextType {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    expandSidebar: () => void;
    collapseSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    // Initialize from localStorage if available, defaulting to false
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const stored = localStorage.getItem("sidebar-collapsed");
        if (stored) {
            setIsCollapsed(JSON.parse(stored));
        }
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed((prev) => {
            const newState = !prev;
            localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
            return newState;
        });
    };

    const expandSidebar = () => {
        setIsCollapsed(false);
        localStorage.setItem("sidebar-collapsed", JSON.stringify(false));
    };

    const collapseSidebar = () => {
        setIsCollapsed(true);
        localStorage.setItem("sidebar-collapsed", JSON.stringify(true));
    };

    // Prevent hydration mismatch by returning null or a consistent state strictly for standard rendering if critical, 
    // but here we just render children. If hydration mismatch occurs due to isCollapsed differing on server/client, 
    // we should be careful. 
    // Since we only change classes, it might cause a brief flash.
    // Ideally we don't render differently until mounted, but that causes layout shift.
    // For now, let's accept that default is expanded (false).

    return (
        <SidebarContext.Provider
            value={{ isCollapsed: isMounted ? isCollapsed : false, toggleSidebar, expandSidebar, collapseSidebar }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
