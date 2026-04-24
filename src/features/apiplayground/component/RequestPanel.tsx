import React from "react";
import KeyValueEditor from "./KeyValueEditor";

type Row = { key: string; value: string; enabled: boolean };

interface RequestPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  params: Row[];
  headers: Row[];
  body: string;
  setParams: (rows: Row[]) => void;
  setHeaders: (rows: Row[]) => void;
  setBody: (body: string) => void;
}

const RequestPanel: React.FC<RequestPanelProps> = ({
  activeTab,
  setActiveTab,
  params,
  headers,
  body,
  setParams,
  setHeaders,
  setBody,
}) => {
  const tabs = ["params", "authorization", "headers", "body"];

  return (
    <div className="border-b flex-shrink-0">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 overflow-y-auto flex-shrink-0">
        {activeTab === "params" && (
          <KeyValueEditor 
            title="Query Params" 
            rows={params} 
            onChange={setParams} 
          />
        )}

        {activeTab === "authorization" && (
          <div className="text-sm text-gray-500 p-4 text-center border rounded">
            Authorization settings (Bearer Token, Basic Auth, etc.)
          </div>
        )}

        {activeTab === "headers" && (
          <KeyValueEditor 
            rows={headers} 
            onChange={setHeaders} 
          />
        )}

        {activeTab === "body" && (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border rounded p-3 text-sm font-mono h-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Request body (JSON)"
          />
        )}
      </div>
    </div>
  );
};

export default RequestPanel;