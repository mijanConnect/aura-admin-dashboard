// app/auth/login/page.jsx
"use client";

import AuthLayout from "../layout";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/public/assets/Logo.png";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <div className="text-center">
        <Image src={Logo} alt="Logo" className="mx-auto mb-5" />
        <p className="text-gray-50 mb-6 text-[16px]">
          Welcome back! Please enter your details.
        </p>
      </div>
      <LoginForm />
    </>
  );
}
