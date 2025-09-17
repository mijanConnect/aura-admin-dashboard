"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../public/assets/Logo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toggleSidebar } from "@/store/slices/uiSlice";
import {
  LayoutDashboard,
  Calendar,
  Gamepad2,
  Ticket,
  Video,
  Users,
  Store,
  Crown,
  FileText,
  Bell,
  Settings,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Event Management", icon: Calendar, href: "/dashboard/events" },
  { title: "Game Management", icon: Gamepad2, href: "/dashboard/games" },
  { title: "Promo Codes", icon: Ticket, href: "/dashboard/promo-codes" },
  { title: "Video Call Settings", icon: Video, href: "/dashboard/video-calls" },
  { title: "User Management", icon: Users, href: "/dashboard/users" },
  { title: "Shop Management", icon: Store, href: "/dashboard/shop" },
  { title: "Aura+ Package", icon: Crown, href: "/dashboard/aura-package" },
  {
    title: "Community Guidelines",
    icon: FileText,
    href: "/dashboard/guidelines",
  },
  { title: "Push Notifications", icon: Bell, href: "/dashboard/notifications" },
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar({ isMobile }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.ui);

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-gray-400 transition-all duration-300 z-40",
        isMobile
          ? `fixed top-0 left-0 h-full w-64 transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } shadow-lg`
          : sidebarOpen
          ? "w-64"
          : "w-16"
      )}
    >
      {/* Logo - only visible when sidebar is expanded and not mobile */}
      {!isMobile && sidebarOpen && (
        <div className="flex items-center p-6 justify-center h-[200px] border-b border-gray-400">
          <div className="">
            <Image
              src={logo} // imported image
              alt="Company Logo"
              width={220} // adjust as needed
              height={220} // adjust as needed
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={cn(
          "flex-1 p-4 space-y-2 overflow-y-auto",
          isMobile && sidebarOpen ? "bg-gray-600" : ""
        )}
      >
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Button
              key={item.href}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start gap-3 h-10",
                !sidebarOpen && "px-2",
                isActive
                  ? "bg-white text-gray-800 hover:bg-white hover:text-gray-800" // Disable hover effect
                  : "text-white" // Non-active items
              )}
              onClick={() => {
                router.push(item.href);
                if (isMobile) dispatch(toggleSidebar());
              }}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {sidebarOpen && (
                <span className="text-sm font-medium truncate">
                  {item.title}
                </span>
              )}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
