"use client";

import SetPasswordForm from "@/components/auth/SetPasswordForm";
import Logo from "@/public/assets/auth/forgot-icon.png";
import Image from "next/image";

export default function SetPasswordPage() {
  return (
    <>
      <div className="text-center">
        <Image src={Logo} alt="Logo" className="mx-auto mb-5" />
        <p className="text-gray-50 mb-6 text-[16px]">
          Please set your new password to secure your account.
        </p>
      </div>
      <SetPasswordForm />
    </>
  );
}
