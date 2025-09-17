"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AuthGuard from "@/components/auth/AuthGuard";
import { toggleSidebar } from "@/store/slices/uiSlice";

export default function DashboardLayout({ children }) {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);

  // Ref to track previous screen type
  const prevIsMobile = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);

      // Only auto-toggle if switching between mobile/desktop
      if (mobile !== prevIsMobile.current) {
        if (mobile && sidebarOpen) {
          dispatch(toggleSidebar()); // collapse on mobile
        } else if (!mobile && !sidebarOpen) {
          dispatch(toggleSidebar()); // expand on desktop
        }
        prevIsMobile.current = mobile;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, sidebarOpen]);

  return (
    <AuthGuard>
      <div
        className="flex min-h-screen relative"
        style={{
          background:
            "var(--G-1, linear-gradient(149deg, #6E8591 0%, #2D373E 95.87%))",
        }}
      >
        {/* Sidebar */}
        <Sidebar isMobile={isMobile} />

        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30"
            onClick={() => dispatch(toggleSidebar())}
          />
        )}

        {/* Right content */}
        <div className={`flex-1 flex flex-col transition-all duration-300`}>
          <Header />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
