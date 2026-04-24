"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ReusableDropdown from "@/components/ui/ReusableDropdown";
import FormField from "@/components/ui/form/FormField";
import { Calendar } from "lucide-react";
import Modal from "@/components/ui/Modal/Modal";
import { useSaveUserProfile } from "@/features/usermanagement/hooks/useSaveUserProfile";
import { useFetchRoleApprovers } from "@/features/usermanagement/hooks/useFetchRoleApprovers";
import UserProfileSubmitWarning from "@/components/ui/Modal/UserProfileSubmitWarningProps";
import type { UserProfileSave } from "@/types/api.types";

interface UserInfoFormState extends Omit<UserProfileSave, "employeeId"> {
  employeeId: string;
}

interface UserInfoFormProps {
  profileData: any;
  user: any;
}

export default function UserInfoForm({ profileData, user }: UserInfoFormProps) {
  // Check if profileData exists to determine starting mode (view vs edit)
  const isProfileComplete = Boolean(profileData?.role && profileData?.employeeId);
  const [isEditing, setIsEditing] = useState(!isProfileComplete);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [initialData, setInitialData] = useState<UserInfoFormState | null>(null);

  const { mutateAsync: saveUserProfile, isPending } = useSaveUserProfile();
  const { data: approversList, isLoading: isApproversLoading } = useFetchRoleApprovers();

  const [errors, setErrors] = useState<Partial<Record<keyof UserInfoFormState, string>>>({});

  const [formData, setFormData] = useState<UserInfoFormState>({
    userFullName: "",
    department: "",
    approverFullName: "",
    role: "",
    employeeId: "",
    jobTitle: "",
    dob: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    if (profileData) {
      const data: UserInfoFormState = {
        userFullName: profileData.userFullName || formData.userFullName,
        role: profileData.role || formData.role,
        jobTitle: profileData.jobTitle || formData.jobTitle,
        employeeId: profileData.employeeId?.toString() || formData.employeeId,
        department: profileData.department || formData.department,
        dob: profileData.dob || formData.dob,
        addressLine1: profileData.addressLine1 || formData.addressLine1,
        addressLine2: profileData.addressLine2 || formData.addressLine2,
        city: profileData.city || formData.city,
        postalCode: profileData.postalCode || formData.postalCode,
        state: profileData.state || formData.state,
        country: profileData.country || formData.country,
        approverFullName: profileData.approverFullName || formData.approverFullName,
      };
      setFormData(data);
      setInitialData(data);
      if (data.role && data.employeeId) {
        setIsEditing(false); // Set to read-only if data exists
      }
    } else if (user) {
      setFormData((prev) => ({
        ...prev,
        userFullName: prev.userFullName || [user.firstName, user.lastName].filter(Boolean).join(" "),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof UserInfoFormState, string>> = {};
    if (!formData.role) newErrors.role = "Role is required";
    
    if (!formData.employeeId || String(formData.employeeId).trim() === "") {
      newErrors.employeeId = "Employee ID is required";
    } else if (isNaN(Number(formData.employeeId))) {
      newErrors.employeeId = "Employee ID must be a valid number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowWarning(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      const payload: UserProfileSave = {
        userFullName: formData.userFullName,
        dob: formData.dob,
        role: formData.role,
        jobTitle: formData.jobTitle,
        employeeId: Number(formData.employeeId),
        department: formData.department,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2 || undefined,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        approverFullName: formData.approverFullName,
      };
      await saveUserProfile(payload);

      setShowWarning(false);
      setShowSuccess(true);
      setInitialData(formData);
      setIsEditing(false); // Switch to read-only UX
    } catch (error) {
      setShowWarning(false);
    }
  };

  const handleCancelClick = () => {
    if (initialData) setFormData(initialData);
    setIsEditing(false);
  };

  const renderReadonlyField = (label: string, value: string) => (
    <div className="flex flex-col gap-1 w-full mb-2">
      <span className="text-[13px] text-gray-500 font-medium">{label}</span>
      <span className="text-[14px] font-semibold text-gray-800">{value || "-"}</span>
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4">
        {!isEditing ? (
          // Read-only Mode (Matches UX Mockup Design)
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 pt-2 pb-6">
            {renderReadonlyField("Role", formData.role)}
            {renderReadonlyField("Employee Id", formData.employeeId)}
            
            {renderReadonlyField("Job Title", formData.jobTitle)}
            {renderReadonlyField("Date of Birth", formData.dob)}
            
            {renderReadonlyField("Address Line 1", formData.addressLine1)}
            {renderReadonlyField("Address Line 2", formData.addressLine2 || "-")}
            
            {renderReadonlyField("City", formData.city)}
            {renderReadonlyField("Postal Code", formData.postalCode)}
            
            {renderReadonlyField("State", formData.state)}
            {renderReadonlyField("Country", formData.country)}

            {renderReadonlyField("Department", formData.department)}
            {renderReadonlyField("Approver", formData.approverFullName)}
          </div>
        ) : (
          // Edit Mode
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Full Name">
                <Input
                  name="userFullName"
                  value={formData.userFullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                />
              </FormField>

              <FormField label="Department">
                <ReusableDropdown
                  options={[
                    "Engineering", "Human Resources", "Sales", "Marketing",
                    "Finance", "Operations", "Product", "Design", "IT Support"
                  ]}
                  value={formData.department}
                  onChange={(v: string) => {
                    setFormData((prev) => ({ ...prev, department: v }));
                    setErrors((prev) => ({ ...prev, department: undefined }));
                  }}
                  placeholder="Select department"
                />
              </FormField>

              <FormField label="Approver Full Name">
                <ReusableDropdown
                  options={approversList || []}
                  value={formData.approverFullName}
                  onChange={(v: string) => {
                    setFormData((prev) => ({ ...prev, approverFullName: v }));
                    setErrors((prev) => ({ ...prev, approverFullName: undefined }));
                  }}
                  placeholder={isApproversLoading ? "Loading approvers..." : "Select approver"}
                  disabled={isApproversLoading}
                />
              </FormField>

              <FormField label="Role" required error={errors.role}>
                <ReusableDropdown
                  options={[
                    "System Admin", "Simulator Admin", "API Designer",
                    "Developer", "API Tester / QA", "Business Analyst",
                    "Product Owner", "Approver (Mgr/Compliance)", "Auditor", "Support"
                  ]}
                  value={formData.role}
                  onChange={(v: string) => {
                    setFormData((prev) => ({ ...prev, role: v }));
                    setErrors((prev) => ({ ...prev, role: undefined }));
                  }}
                  placeholder="Select your role"
                  className={errors.role ? "border-red-400" : ""}
                />
              </FormField>

              <FormField label="Employee Id" required error={errors.employeeId}>
                <Input
                  name="employeeId"
                  type="number"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="Enter employee id"
                  className={errors.employeeId ? "border-red-400" : ""}
                />
              </FormField>

              <FormField label="Job Title">
                <Input
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Enter job title"
                />
              </FormField>

              <FormField label="Date of Birth">
                <Input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-2">
              <FormField label="Address Line 1">
                <Input
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Enter your address line 1"
                />
              </FormField>

              <FormField label="Address Line 2">
                <Input
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Enter your address line 2"
                />
              </FormField>

              <FormField label="City">
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </FormField>

              <FormField label="Postal Code">
                <Input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Enter your postal code"
                />
              </FormField>

              <FormField label="State">
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                />
              </FormField>

              <FormField label="Country">
                <Input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                />
              </FormField>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-6 border-t mt-6">
          {!isEditing ? (
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto"
            >
              Edit Details
            </Button>
          ) : (
            <>
              {isProfileComplete && (
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={handleCancelClick}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isPending}
                className="w-full sm:w-auto"
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </>
          )}
        </div>
      </form>

      {/* <Modal
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        title="Submit Warning"
        message="You can submit your Role and Employee ID only once. After submission, these details cannot be edited or updated. Your manager will be notified to approve your role."
        closeOnBackdrop={false}
        showButton={false}
        footer={
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setShowWarning(false)}
              className="flex-1 px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSubmit}
              disabled={isPending}
              className={`flex-1 px-4 py-2 bg-purple-600 text-white font-medium hover:bg-purple-700 rounded-lg transition ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        }
      /> */}


  <UserProfileSubmitWarning
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        onSubmit={handleConfirmSubmit}
     
        isSubmitting={isPending}
      />
      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Profile Submitted"
        message="Approval request has been sent to manager"
        buttonText="Ok"
        onButtonClick={() => setShowSuccess(false)}
      />
    </>
  );
}
