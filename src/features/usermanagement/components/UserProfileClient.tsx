"use client";

import React, { useState } from "react";
import TabSwitcher from "@/components/ui/TabSwitcher";
import ProfileDetailRow from "@/components/ui/ProfileDetailRow";
import { useFetchUserProfile } from "@/features/usermanagement/hooks/useFetchUserProfile";
import { useAuthStore } from "@/features/auth/store/authStore";
import UserInfoForm from "./UserInfoForm";
import CompanyInfoForm from "./CompanyInfoForm";

export default function UserProfileClient() {
  const { user } = useAuthStore();
  const { data: profileData, isLoading: isProfileLoading } = useFetchUserProfile();

  const [activeTab, setActiveTab] = useState<"userInfo" | "companyInfo">("userInfo");

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: "userInfo", label: "User Info" },
    { id: "companyInfo", label: "Company Info" },
  ];

  const handleTabChange = (tabId: "userInfo" | "companyInfo") => {
    setActiveTab(tabId);
  };

  return (
    <div className="space-y-0">
      <div className="grid gap-6 lg:grid-cols-10">
        <div className="lg:col-span-7 rounded-lg bg-white shadow-sm border border-border p-6 flex flex-col">
          <TabSwitcher
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId: string) => handleTabChange(tabId as "userInfo" | "companyInfo")}
            fullWidth
          />

          {activeTab === "userInfo" && (
            <UserInfoForm profileData={profileData} user={user} />
          )}

          {activeTab === "companyInfo" && (
            <CompanyInfoForm profileData={profileData} user={user} />
          )}
        </div>

        <div className="lg:col-span-3 space-y-5 ">
          <div className="rounded-2xl bg-white shadow-sm border border-[#E5E5E5] p-6 flex flex-col items-center text-center font-tertiary">
            <div className="w-[80px] h-[80px] flex items-center justify-center ">
              <img src="/avatar/Avatar.png" alt="Avatar" className="w-[60px] h-[60px] object-cover" />
            </div>
            <h2 className="text-lg font-normal text-[#4A4A4A]">
              {profileData?.userFullName || (user?.firstName ? `${user.firstName} ${user.lastName || ''}` : ((user as any)?.user_name || "Guest"))}
            </h2>
            <p className="text-[11px] text-[#A1A1A1] mt-0.5 font-medium">
              Employee ID: {profileData?.employeeId || "NA"}
            </p>

            <div className="w-full mt-2 text-left">
              <h3 className="text-[#6c6c6c] text-[13px] mb-2 font-medium">Details</h3>
              <hr className="border-[#F1F1F1] mb-5 w-full" />
              
              <div className="space-y-2">
                <ProfileDetailRow label="Email" value={user?.email || "Not provided"} />
                <ProfileDetailRow label="Phone" value={(user as any)?.phone_number || "Not provided"} />
                <ProfileDetailRow label="Gender" value={(user as any)?.gender || "Not specified"} />
                <ProfileDetailRow label="Company" value={profileData?.companyName || (user as any)?.companyName || "Not specified"} />
                <ProfileDetailRow 
                  label="Status" 
                  value={
                    <span className={`px-3 py-[2px] rounded font-semibold text-[10px] ${
                      profileData?.accountStatus === 'VERIFIED' ? 'bg-[#D1FAE5] text-[#059669]' :
                      profileData?.accountStatus === 'REJECTED' ? 'bg-[#FEE2E2] text-[#DC2626]' :
                      'bg-[#FFECCC] text-[#F39C12]'
                    }`}>
                      {profileData?.accountStatus || "Pending"}
                    </span>
                  } 
                />
              </div>
            </div>
          </div>

          <div 
            className="rounded-2xl text-white p-5 shadow-md"
            style={{ background: "linear-gradient(247.5deg, #0B2A6D -33.44%, #651C96 48.2%, #FF9AFC 104.93%)" }}
          >
            <h3 className="text-[15px] font-semibold mb-3">Submit Warning</h3>
            <p className="text-[13px] text-white/90 leading-snug mb-3 text-left">Please make sure all the information you have entered is correct.</p>
            <div className="flex items-center gap-2 text-[13px] text-white/90 text-left">
              <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>You can submit this form only once.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
