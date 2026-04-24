"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FormField from "@/components/ui/form/FormField";
import Modal from "@/components/ui/Modal/Modal";
import { ROUTES } from "@/config/routes";
import { useLogin } from "../hooks/useAuth";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, isLoading: isPending } = useLogin();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    login(formData, {
      onError: (error: any) => {
        const message = error?.message || "Invalid email or password. Please try again.";
        setErrorMessage(message);
        setShowErrorModal(true);
      },
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username) newErrors.username = "Required";
    if (!formData.password) newErrors.password = "Required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const eyeIcon = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );

  const arrowIcon = (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  return (
    <>
      <div className="text-center mt-2">
        <h1 className="text-[18px] font-semibold text-[#5B21B6] mb-1">
          Welcome Back
        </h1>
        <p className="text-xs text-gray-400 font-medium">
          Log in to access your workspace.
        </p>
      </div>

      <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
        {/* Email */}
        <FormField label="Email" required>
          <Input
            type="email"
            name="username"
            placeholder="Enter your registered email"
            value={formData.username}
            onChange={handleChange}
            disabled={isPending}
            className={errors.username ? "border-red-600 animate-pulse" : ""}
          />
        </FormField>

        {/* Password */}
        <FormField
          label="Password"
          required
          helperText={
            <span className="flex items-center gap-1">
              Password must contain
              <span className="inline-block w-3 h-3 border border-gray-300 rounded-full text-center leading-[10px] text-[10px]">
                i
              </span>
            </span>
          }
        >
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            disabled={isPending}
            icon={eyeIcon}
            iconAction={() => setShowPassword(!showPassword)}
            className={errors.password ? "border-red-600 animate-pulse" : ""}
          />
        </FormField>

        {/* Forgot Password */}
        <div className="text-left">
          <Button
            type="button"
            variant="text"
            size="sm"
            className="p-0"
            onClick={() => router.push(ROUTES.FORGOT_PASSWORD)}
          >
            Forgot Password?
          </Button>
        </div>

        {/* Submit */}
        <Button type="submit" variant="primary" fullWidth icon={arrowIcon}
          disabled={isPending}
          loading={isPending}>
          Login
        </Button>
      </form>

      {/* Error Modal */}
      <Modal
        size="xs"
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={errorMessage || "You have entered incorrect email or password."}
        buttonText="OK"
        buttonClassName="bg-red-600 hover:bg-red-700"
        imageSrc="/icons/error.png"
      />
    </>
  );
};

export default LoginForm;