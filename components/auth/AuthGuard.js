"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { restoreAuth } from "@/store/slices/authSlice";

export default function AuthGuard({ children, redirectIfAuth = false }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Restore auth from localStorage if token exists
  useEffect(() => {
    if (!isClient) return;

    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
      const mockUser = {
        id: 1,
        email: "admin@example.com",
        name: "John Admin",
        role: "admin",
        avatar:
          "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=50",
      };
      dispatch(restoreAuth({ user: mockUser, token }));
    }
  }, [dispatch, isAuthenticated, isClient]);

  // Redirect logic
  useEffect(() => {
    if (!isClient) return;

    if (!isAuthenticated && !localStorage.getItem("token") && !redirectIfAuth) {
      // Protected route → redirect to login
      router.push("/auth/login");
    } else if (isAuthenticated && redirectIfAuth) {
      // Auth page → redirect logged-in user to dashboard
      router.push("/dashboard");
    }
  }, [isAuthenticated, router, isClient, redirectIfAuth]);

  if (!isClient) return null;

  if (!isAuthenticated && !localStorage.getItem("token") && !redirectIfAuth) {
    return null;
  }

  return <>{children}</>;
}
