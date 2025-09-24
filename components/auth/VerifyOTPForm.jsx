"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function VerifyOTPForm() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(20); // 30 sec cooldown
  const router = useRouter();

  const inputsRef = useRef([]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 4 digits");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/auth/set-password");
    } catch {
      setError("OTP verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return; // still in cooldown

    try {
      // Simulate resend API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResendCooldown(30); // reset cooldown
      setOtp(["", "", "", ""]); // clear previous OTP
      inputsRef.current[0].focus();
      setError(""); // clear errors
      alert("OTP resent successfully!");
    } catch {
      setError("Failed to resend OTP. Try again later.");
    }
  };

  return (
    <div className="space-y-6 flex justify-center">
      <form onSubmit={handleSubmit} className="space-y-2">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="flex gap-4 justify-center">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>

        <div className="flex text-gray-50 justify-start items-center text-sm pb-4 pt-2">
          If you didn’t receive a code.{' '}
          <span
            className={`text-primary cursor-pointer pl-1 ${
              resendCooldown > 0 ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={handleResend}
          >
            Resend
            {resendCooldown > 0 && (
              <>
                {" "}
                (
                <span className="inline-block w-4 text-center">
                  {resendCooldown}
                </span>
                )
              </>
            )}
          </span>
        </div>

        <div className="">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      </form>
    </div>
  );
}
