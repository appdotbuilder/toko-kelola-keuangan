import { SidebarProvider } from '@/components/ui/sidebar';
import { FlashMessages } from '@/components/flash-messages';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">
                <div className="container mx-auto p-6">
                    <FlashMessages />
                    {children}
                </div>
            </div>
        );
    }

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <div className="flex min-h-screen w-full">
                {children}
            </div>
        </SidebarProvider>
    );
}
