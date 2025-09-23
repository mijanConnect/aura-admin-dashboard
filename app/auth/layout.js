"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import AuthBg from "@/public/assets/auth-bg.png";
import LoginImage from "@/public/assets/auth/login.png";
import SignupImage from "@/public/assets/auth/signup.png";
// import ForgotImage from "@/public/assets/auth/forgot.png";

export default function AuthLayout({ children }) {
  const pathname = usePathname();

  // pick image based on route
  const getImageForRoute = () => {
    if (pathname.includes("signup")) return SignupImage;
    if (pathname.includes("forgot")) return LoginImage; // or ForgotImage if you add it
    return LoginImage; // default
  };

  const imageSrc = getImageForRoute();

  return (
    <AuthGuard redirectIfAuth={true}>
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Background Image */}
        <Image
          src={AuthBg}
          alt="Background"
          fill
          className="object-cover -z-10"
          priority
        />

        {/* Content wrapper */}
        <div className="flex flex-col md:flex-row w-full max-w-7xl bg-gray-50/10 border border-white rounded-3xl shadow-lg overflow-hidden">
          {/* Image section (hidden on mobile) */}
          <div className="relative hidden md:block w-1/2 p-6">
            <div className="relative w-full h-[600px]">
              <Image
                src={imageSrc}
                alt="Auth Illustration"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Form section */}
          <div className="flex w-full md:w-1/2 justify-center items-center p-6 sm:p-10">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
