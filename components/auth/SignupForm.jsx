"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/CustomInput";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch({
        type: "auth/setCredentials",
        payload: {
          user: { email: form.email, name: form.name },
          token: "demo-token",
        },
      });
      localStorage.setItem("token", "demo-token");
      router.push("/dashboard");
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <FormInput
          id="name"
          label="Name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          labelClassName="mr-custom-label" // 👈 custom label CSS
          className="mr-custom-input" // 👈 custom input CSS
          inputStyle={{}} // inline styles if needed
        />
        <FormInput
          id="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          labelClassName="mr-custom-label" // 👈 custom label CSS
          className="mr-custom-input" // 👈 custom input CSS
          inputStyle={{}} // inline styles if needed
        />
        <FormInput
          id="password"
          type="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          placeholder="********"
          required
          labelClassName="mr-custom-label" // 👈 custom label CSS
          className="mr-custom-input" // 👈 custom input CSS
          inputStyle={{}} // inline styles if needed
        />
        <FormInput
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="********"
          required
          labelClassName="mr-custom-label" // 👈 custom label CSS
          className="mr-custom-input" // 👈 custom input CSS
          inputStyle={{}} // inline styles if needed
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}
