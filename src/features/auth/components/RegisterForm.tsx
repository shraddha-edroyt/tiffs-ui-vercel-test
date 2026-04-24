"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FormField from "@/components/ui/form/FormField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReusableDropdown from "@/components/ui/ReusableDropdown";
import Modal from "@/components/ui/Modal/Modal";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { registerApi } from "@/features/auth/services/authService";
import type { RegisterRequest } from "@/types/api.types";
import toast from "react-hot-toast";


const companies = [
  "Tiffs",
  "HDFC",
  "Icici",
];

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload: RegisterRequest = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      gender: formData.gender,
      email: formData.email,
      phoneNumber: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      companyName: formData.company,
    };

    setIsPending(true);
    try {
      const result = await registerApi(payload);
      setShowSuccessModal(true);
    } catch (error: any) {
      const message = error?.message || "Registration failed. Please try again.";
      setErrorMessage(message);
      setShowErrorModal(true);
    } finally {
      setIsPending(false);
    }
  };

  // --- Password Validation Logic ---
  const password = formData.password;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasValidLength = /^.{8,10}$/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const validationItems = [
    { text: "At least 1 special character", valid: hasSpecialChar },
    { text: "At least 1 number", valid: hasNumber },
    { text: "Min. 8-10 characters", valid: hasValidLength },
    { text: "At least 1 Capital Character", valid: hasUpperCase },
  ];

  const passedCount = validationItems.filter((item) => item.valid).length;

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

  const checkIcon = (
    <svg
      className="w-3.5 h-3.5 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName) newErrors.firstName = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";
    if (!formData.email) newErrors.email = "Required";
    if (!formData.phone) newErrors.phone = "Required";
    if (!formData.gender) newErrors.gender = "Required";
    if (!formData.company) newErrors.company = "Required";
    if (!formData.password) newErrors.password = "Required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Required";

    // Password match validation
    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleRedirect = () => {
    router.push("/login");
  };
  return (
    <>
      <div className="text-center mt-2 ">
        <p className="text-xs font-(--font-quicksand) text-gray-400 ">
          Join your workspace. Start building simulations effortlessly.
        </p>
      </div>

      <form className="space-y-1 mt-6" onSubmit={handleSubmit}>
        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-3">
          <FormField label="First Name" required>
            <Input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? "border-red-600 animate-pulse" : ""}
            />
          </FormField>

          <FormField label="Last Name" required>
            <Input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? "border-red-600 animate-pulse" : ""}
            />
          </FormField>
        </div>

        {/* Email */}
        <FormField label="Email" required>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            disabled={isPending}
            className={errors.email ? "border-red-600 animate-pulse" : ""}
          />
        </FormField>

        {/* Phone + Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <FormField label="Phone Number" required>
            <PhoneInput
              country={"in"}
              value={formData.phone}
              onChange={(phone) => {
                setFormData((prev) => ({ ...prev, phone }));

                if (errors.phone) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.phone;
                    return newErrors;
                  });
                }
              }}
              containerClass="w-full scrollbar-hide"
              // inputClass="!w-full !text-black !py-2 !border !border-gray-100 !bg-gray-50 scrollbar-hide"
              inputClass={`!w-full !text-black !py-2 !border !bg-gray-50 scrollbar-hide ${errors.phone
                ? "!border-red-600 animate-pulse"
                : "!border-gray-100"
                }`}
              buttonClass="!border !border-gray-100 !bg-gray-50 "
            />
          </FormField>

          <FormField label="Gender" required>
            {/* <div className="flex flex-wrap items-center gap-4 text-sm text-black"> */}
            <div
              className={`flex flex-wrap items-center gap-4 text-sm text-black p-2 rounded-sm ${errors.gender ? "border border-red-600 animate-pulse" : ""
                }`}
            >
              {["Male", "Female", "Other"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                  />

                  {g}
                </label>
              ))}
            </div>
          </FormField>
        </div>

        {/* Company */}
        <FormField label="Company" required>
          <ReusableDropdown
            options={companies}
            value={formData.company}
            onChange={(company) => {
              setFormData((prev) => ({ ...prev, company }));

              if (errors.company) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.company;
                  return newErrors;
                });
              }
            }}
            placeholder="Select your Company"
            className={
              errors.company
                ? "!border-red-600 animate-pulse !ring-1 !ring-red-600"
                : ""
            }
          />
        </FormField>

        {/* Password */}
        <div className="grid grid-cols-2 gap-3">
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

            {/* Custom Password Validation UI */}
            {password.length > 0 && (
              <div className="mt-2 space-y-2">
                {/* Strength Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strengthInfo.color}`}
                      style={{ width: strengthInfo.width }}
                    ></div>
                  </div>{" "}
                  <span className="text-xs font-semibold text-gray-600">
                    {strengthInfo.label}
                  </span>
                </div>

                {/* Validation Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {validationItems.map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-1 bg-white py-0.5 px-1.5 rounded-xl border border-gray-100 shadow-sm"
                    >
                      <div className="w-3 h-3 flex items-center justify-center">
                        <div
                          className={`w-3 h-3 rounded-full flex items-center justify-center border ${item.valid
                            ? "bg-green-600 border-green-600 text-white"
                            : "border-gray-300"
                            }`}
                        >
                          {item.valid &&
                            React.cloneElement(checkIcon, {
                              className: "text-white w-2 h-2",
                            })}
                        </div>
                      </div>

                      <span
                        className={`text-[10px] leading-tight ${item.valid ? "text-green-600" : "text-gray-500"
                          }`}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </FormField>

          <FormField
            label="Confirm Password"
            required
            helperText="Same as password you entered"
          >
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={eyeIcon}
              iconAction={() => setShowConfirmPassword(!showConfirmPassword)}
              className={
                errors.confirmPassword ? "border-red-600 animate-pulse" : ""
              }
            />
          </FormField>
        </div>

        <Button type="submit" variant="primary" fullWidth icon={arrowIcon}
          disabled={isPending}
          loading={isPending}>
          Register
        </Button>
      </form>

      {/* Error Modal */}
      <Modal
        size="xs"
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={errorMessage || "Registration failed. Please try again."}
        buttonText="OK"
        buttonClassName="bg-red-600 hover:bg-red-700"
        imageSrc="/icons/error.png"
      />

      {/* Success Modal */}
      <Modal
        size="xs"
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onButtonClick={() => {
          setShowSuccessModal(false);
          router.push(ROUTES.LOGIN);
        }}
        message="you are successfully registered ! Please log in."
        buttonText="Continue"
        buttonClassName="bg-green-600 hover:bg-green-700"
        imageSrc="/icons/success.png"
      />
    </>
  );
};

export default RegisterForm;
