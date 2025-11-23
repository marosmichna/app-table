import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSIdebar";
import { AnnouncementProvider } from "@/contexts/AnnouncementContext";

export default function MainLayout() {
  return (
    <AnnouncementProvider> 
      <div className="h-screen w-screen">
        <SidebarProvider>
          <div className="h-full w-full flex">
            <AppSidebar />
            <main className="flex-1 min-h-screen overflow-y-auto">
              <div className="w-full max-w-6xl mx-auto p-4">
                <Outlet />
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </AnnouncementProvider>
  );
}