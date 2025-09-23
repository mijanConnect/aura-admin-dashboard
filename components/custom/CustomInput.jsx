"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error = "",
  className = "", // ✅ custom styles for input
  labelClassName = "", // ✅ custom styles for label
  inputStyle = {}, // ✅ inline styles for input (if needed)
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={id} className={labelClassName}>
          {label}
        </Label>
      )}
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={className} // 👈 pass Tailwind or custom CSS class
        style={inputStyle} // 👈 inline styles if needed
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
