// app/auth/forgot-password/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/CustomInput";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({ email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      // ⏳ Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(
        "If an account exists for this email, a reset link has been sent."
      );

      // 👉 Optional: redirect after some delay
      setTimeout(() => {
        router.push("/auth/verify-otp");
      }, 2500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
            {success}
          </div>
        )}
        <FormInput
          id="email"
          type="email"
          label="Email Address"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          labelClassName="mr-custom-label" // 👈 custom label CSS
          className="mr-custom-input" // 👈 custom input CSS
          inputStyle={{}} // inline styles if needed
        />

        <div className="pt-6">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
