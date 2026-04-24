

"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal/Modal";
import { Heading } from "@/components/ui/Typography";
import FormField from "@/components/ui/form/FormField";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";

export default function ResetPasswordClient() {
  const router = useRouter();

  // Form Data
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Modal States
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // --- Password Validation Logic ---
  const password = formData.password;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasValidLength = /^.{8,10}$/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()/-=\,.?":{}|<>]/.test(password);

  const validationItems = [
    { text: "At least 1 special character", valid: hasSpecialChar },
    { text: "At least 1 number", valid: hasNumber },
    { text: "Min. 8-10 characters", valid: hasValidLength },
    { text: "At least 1 Capital Character", valid: hasUpperCase },
  ];

  const passedCount = validationItems.filter((item) => item.valid).length;
  const isPasswordValid = passedCount === validationItems.length;

  const getStrengthInfo = () => {
    if (password.length === 0)
      return { label: "", color: "bg-gray-200", width: "0%" };
    if (passedCount <= 1)
      return { label: "Weak", color: "bg-red-500", width: "25%" };
    if (passedCount <= 3)
      return { label: "Medium", color: "bg-yellow-500", width: "75%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  };

  const strengthInfo = getStrengthInfo();

  // --- Handlers ---

  // Updated to handle Form Event
  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload on Enter

    // 1. Empty Check
    if (!formData.password || !formData.confirmPassword) {
      setErrorMessage("Confirm Password is required.");
      setIsErrorModalOpen(true);
      return;
    }

    // 2. Mismatch Check
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsErrorModalOpen(true);
      return;
    }

    setLoading(true);
    // Simulate network call
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    // 3. Success Logic
    setIsSuccessModalOpen(true);
  };

  // Icons
  const eyeIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
  const checkIcon = (
    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[url('/bg/forgetpassword.png')] bg-cover bg-center overflow-auto">
      {/* logo at top-left */}
      <img src="/logo.png" alt="UPNIX logo" className="fixed top-8 left-28 w-36 h-auto z-50" />

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        {/* Header Section */}
        <div className="mb-6">
          <Heading level={2} className="text-lg font-semibold mb-2 font-secondary">
            Set Your Password
          </Heading>
        </div>

        {/* Form Section - Wrapped in <form> tag */}
        <form onSubmit={handleReset} className="space-y-4">
          <FormField label="Password" required>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              icon={eyeIcon}
              iconAction={() => setShowPassword(!showPassword)}
              className={errors.password ? "border-red-600 animate-pulse" : ""}
            />

            {/* Password Validation UI */}
            {password.length > 0 && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strengthInfo.color}`}
                      style={{ width: strengthInfo.width }}
                    ></div>
                  </div>
                  <span className="text-xs font-semibold text-gray-600">{strengthInfo.label}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {validationItems.map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-1 bg-white py-0.5 px-1.5 rounded-xl border border-gray-100 shadow-sm"
                    >
                      <div className="w-3 h-3 flex items-center justify-center">
                        <div
                          className={`w-3 h-3 rounded-full flex items-center justify-center border ${
                            item.valid ? "bg-green-600 border-green-600 text-white" : "border-gray-300"
                          }`}
                        >
                          {item.valid && React.cloneElement(checkIcon, { className: "text-white w-2 h-2" })}
                        </div>
                      </div>
                      <span className={`text-[10px] leading-tight ${item.valid ? "text-green-600" : "text-gray-500"}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </FormField>

          <FormField label="Confirm Password" required helperText="Same as password you entered">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={eyeIcon}
              iconAction={() => setShowConfirmPassword(!showConfirmPassword)}
              className={errors.confirmPassword ? "border-red-600 animate-pulse" : ""}
            />
          </FormField>

          {/* Submit Button - Added type="submit" */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            className="mt-6 font-tertiary text-sm font-medium"
            disabled={!isPasswordValid || loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
            {!loading && (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </Button>
        </form>
      </div>

      {/* Success Modal */}
      <Modal
        size="xs"
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onButtonClick={() => {
          setIsSuccessModalOpen(false);
          router.push(ROUTES.LOGIN);
        }}
        message="Password reset successfully! Please log in."
        buttonText="Continue"
        buttonClassName="bg-green-600 hover:bg-green-700"
        imageSrc="/icons/success.png"
      />

      {/* Error Modal */}
      <Modal
        size="xs"
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        onButtonClick={() => setIsErrorModalOpen(false)}
        message={errorMessage || "An error occurred."}
        buttonText="OK"
        buttonClassName="bg-red-600 hover:bg-red-700"
        imageSrc="/icons/error.png"
      />
    </div>
  );
}