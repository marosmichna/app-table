import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSIdebar";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-6 h-screen overflow-hidden">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
