import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="h-screen w-64 bg-gray-300 border-r border-gray-200">
        <SidebarHeader className="p-4">
            <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 rounded-md bg-white ring-2 ring-gray-200 items-center justify-center">
                    <AvatarImage className="w-6 h-6" src="../src/assets/react.svg" alt="User Avatar" />
                </Avatar>
                <div>
                    <p className="text-gray-800 font-lato font-bold">Test city</p>
                </div>
            </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
            <SidebarGroup title="Main">
            <Link
                to="/announcements"
                className={`block px-3 py-2 rounded hover:bg-yellow-200 ${
                location.pathname === "/announcements" ? "bg-yellow-100 font-lato rounded-b-md" : ""
                }`}
            >
                Announcements
            </Link>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  );
}
