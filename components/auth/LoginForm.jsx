"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/CustomInput";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "admin@example.com",
    password: "admin123",
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
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (form.email === "admin@example.com" && form.password === "admin123") {
        // Successful login
        dispatch({
          type: "auth/setCredentials",
          payload: {
            user: { email: form.email, name: "Admin" },
            token: "demo-token",
          },
        });
        localStorage.setItem("token", "demo-token");
        router.push("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-gray-50/30 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <FormInput
          id="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          placeholder="admin@example.com"
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
          placeholder="admin123"
          required
          labelClassName="mr-custom-label" // 👈 custom label CSS
          className="mr-custom-input" // 👈 custom input CSS
          inputStyle={{}} // inline styles if needed
        />

        <div className="pt-6">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>
    </div>
  );
}
