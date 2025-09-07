'use client';

import { AppFooter } from '@/components/layout/app-footer';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="dark:bg-background flex flex-1 flex-col gap-4 bg-gray-100 p-4 pt-4 pb-20">
          <div className="flex-1 rounded-xl">
            <div className="p-6">{children}</div>
          </div>
        </main>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
