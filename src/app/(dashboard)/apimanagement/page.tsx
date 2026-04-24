// src/app/(dashboard)/apimanagement/page.tsx
"use client";

import Button from "@/components/ui/Button";
import ApiList from "@/features/apimanagement/component/ApiList";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Text } from "@/components/ui/Typography";

export default function ApisPage() {
  const [apiData, setApiData] = useState([
      {
      id: 1,
      version: "V1",
      endpoint: "/api/v1/account",
      method: "GET",
      description: "Account details",
      status: "Active",
      type: "Public",
      createdBy: "Admin"
    }
  ]);

  // Sample data for demonstration
  const sampleApiData = [
    {
      id: 1,
      version: "V1",
      endpoint: "/api/v1/account",
      method: "GET",
      description: "Account details",
      status: "Active",
      type: "Public",
      createdBy: "Admin",
    },
    {
      id: 2,
      version: "V2",
      endpoint: "/api/v1/account",
      method: "GET",
      description: "Account details",
      status: "Active",
      type: "Public",
      createdBy: "Admin",
    },
    {
      id: 3,
      version: "V3",
      endpoint: "/api/v1/acount",
      method: "GET",
      description: "Account details",
      status: "Active",
      type: "Public",
      createdBy: "Admin",
    },
  ];

  return (
    <div className=" ">
      {!apiData.length ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <Image
            src="/icons/noapidata.png"
            alt="No Data"
            width={250}
            height={250}
            className="rounded-full mx-auto grayscale"
          />
          <Text weight="bold" className="text-gray-500 text-sm">
            Your APIs Are Feeling Lonely 👀
          </Text>
          <Text weight="medium" className="text-gray-500 text-sm">
            You're just one step away from smarter workflows. Create your first
            API and begin
          </Text>
          <Text weight="medium" className="text-gray-500 text-sm">
            crafting seamless, secure, and scalable experiences.
          </Text>
          <div className="w-full flex justify-center">
            <Link href="/apimanagement/create">
              <Button type="button" variant="primary" size="md">
                <Plus className="w-4 h-4 mr-2" /> Create New Api
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <ApiList data={sampleApiData} />
      )}
    </div>
  );
}
