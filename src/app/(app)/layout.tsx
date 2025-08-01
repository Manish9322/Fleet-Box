import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
           <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:hidden">
            <SidebarTrigger />
            <div className="relative flex-1 md:grow-0" />
          </header>
          <SidebarInset>
            <div className="p-4 sm:p-6 lg:p-8 h-full flex-1">
              {children}
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
