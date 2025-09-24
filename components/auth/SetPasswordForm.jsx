"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/CustomInput";

export default function SetPasswordForm() {
  const [form, setForm] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.new_password !== form.confirm_password) {
      setError("New password and confirm password do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success, redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to update password. Please try again.");
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

        <FormInput
          id="new_password"
          type="password"
          label="New Password"
          value={form.new_password}
          onChange={handleChange}
          placeholder="Enter new password"
          required
          labelClassName="mr-custom-label"
          className="mr-custom-input"
        />

        <FormInput
          id="confirm_password"
          type="password"
          label="Confirm Password"
          value={form.confirm_password}
          onChange={handleChange}
          placeholder="Confirm new password"
          required
          labelClassName="mr-custom-label"
          className="mr-custom-input"
        />

        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Set Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
