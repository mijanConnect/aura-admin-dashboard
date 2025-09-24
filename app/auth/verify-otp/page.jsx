"use client";

import VerifyOTPForm from "@/components/auth/VerifyOTPForm";
import Logo from "@/public/assets/Logo.png";
import Image from "next/image";

export default function VerifyOTPPage() {
  return (
    <>
      <div className="text-center">
        <Image src={Logo} alt="Logo" className="mx-auto mb-5" />
        <p className="text-gray-50 mb-6 text-[16px]">
          Enter the OTP sent to your registered email or phone number.
        </p>
      </div>
      <VerifyOTPForm />
    </>
  );
}
