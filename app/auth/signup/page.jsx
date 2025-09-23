// app/auth/signup/page.jsx
"use client";

import AuthLayout from "../layout";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <>
      <div className="text-center">
        <h2 className="text-[30px] font-bold text-gray-50">Sign Up</h2>
        <p className="text-gray-50 mb-6 mt-2 text-[16px]">
          Please fill the form to create your account.
        </p>
      </div>
      <SignupForm />
    </>
  );
}
