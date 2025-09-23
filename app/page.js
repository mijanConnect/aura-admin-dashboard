"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function RootRedirect() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (isAuthenticated || token) {
      // User is logged in → go to dashboard
      router.replace("/dashboard");
    } else {
      // User not logged in → go to login
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  // Optional: render nothing or a loading state while redirecting
  return null;
}
