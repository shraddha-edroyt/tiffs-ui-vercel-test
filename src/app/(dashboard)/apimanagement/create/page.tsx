"use client";

import Breadcrumb from "@/components/layouts/Breadcrumb";
import Button from "@/components/ui/Button";
import TabSwitcher from "@/components/ui/TabSwitcher";
import { Edit2 } from "lucide-react";
import { useState } from "react";

// Import the new components
import QueryConfiguration from "@/features/apimanagement/component/QueryConfiguration";
import GeneratedSqlPreview from "@/features/apimanagement/component/GeneratedSqlPreview";
import ApiConfiguration from "@/features/apimanagement/component/ApiConfiguration";

export default function CreateNewApiPage() {
  const [activeTab, setActiveTab] = useState("query");

  return (
    <div className="space-y-4">
      {/* Header Area */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">API Details</h1>
        <Button
          variant="primary"
          size="md"
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center gap-2 px-4 py-2"
        >
          <Edit2 className="w-4 h-4" /> Edit API
        </Button>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded border border-gray-50 p-6 shadow-sm">
        {/* Tabs */}
        <div className="mb-6 flex">
          <TabSwitcher
            tabs={[
              { id: "query", label: "Query configuration" },
              { id: "api", label: "API Configuration" },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            fullWidth
          />
        </div>

        {/* Render Components based on Tab */}
        {activeTab === "query" && <QueryConfiguration />}
        {activeTab === "api" && <ApiConfiguration />}
      </div>

      {/* Generated SQL query box container */}
      {activeTab === "query" && <GeneratedSqlPreview />}
    </div>
  );
}