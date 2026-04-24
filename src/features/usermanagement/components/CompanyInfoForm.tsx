"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { useFetchCompanyProfile } from "@/features/usermanagement/hooks/useFetchCompanyProfile";

export default function CompanyInfoForm() {
  const { data: companyProfile, isLoading: isFetching, isError, refetch } = useFetchCompanyProfile();

  if (isFetching) {
    return <div className="p-4 text-sm text-gray-500 text-center animate-pulse mt-4">Loading company details...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500 flex flex-col items-center gap-2 mt-4 rounded-lg bg-red-50">
        <p>Failed to load company details.</p>
        <Button variant="secondary" size="sm" onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  const renderReadonlyField = (label: string, value: string | undefined) => (
    <div className="flex flex-col gap-1 w-full mb-2">
      <span className="text-[13px] text-gray-500 font-medium">{label}</span>
      <span className="text-[14px] font-semibold text-gray-800">{value || "-"}</span>
    </div>
  );

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 pt-2 pb-6">
        {renderReadonlyField("Company Name", companyProfile?.companyName)}
        {renderReadonlyField("Department", companyProfile?.companyDepartment)}
        
        {renderReadonlyField("Company Address 1", companyProfile?.companyAddress1)}
        {renderReadonlyField("Company Address 2", companyProfile?.companyAddress2)}
        
        {renderReadonlyField("Job Title", companyProfile?.companyJobTitle)}
        {renderReadonlyField("Company Pincode", companyProfile?.companyPincode)}
        
        {renderReadonlyField("City", companyProfile?.companyCity)}
        {renderReadonlyField("Country", companyProfile?.companyCountry)}
      </div>
    </div>
  );
}
