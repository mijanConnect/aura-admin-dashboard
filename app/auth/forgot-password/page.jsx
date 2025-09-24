// app/auth/forgot-password/page.jsx
"use client";

import AuthLayout from "../layout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ForgotIcon from "@/public/assets/auth/forgot-icon.png";
import Image from "next/image";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="text-center">
        <Image src={ForgotIcon} alt="Logo" className="mx-auto mb-5" />
        <h2 className="text-[30px] font-bold text-gray-50">Forgot Password</h2>
        <p className="text-gray-50 mb-6 mt-2 text-[16px]">
          Enter your registered email address to reset your password.
        </p>
      </div>
      <ForgotPasswordForm />
    </>
  );
}
