import React from "react";
import { AlertCircle, Clock, FileText, Code, Eye, Copy, Download } from "lucide-react";

interface ResponsePanelProps {
  status: string;
  time: string;
  size: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: "pretty" | "preview";
  setViewMode: (mode: "pretty" | "preview") => void;
  response: any;
  headers: Record<string, string>;
  cookies: Array<{ name: string; value: string; domain: string; path: string; expires: string; httpOnly: boolean; secure: boolean }>;
  onCopy: () => void;
  onSave: () => void;
}

const ResponsePanel: React.FC<ResponsePanelProps> = ({
  status,
  time,
  size,
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  response,
  headers,
  cookies,
  onCopy,
  onSave,
}) => {
  
  const renderContent = () => {
    if (!response) return <span className="text-gray-400">Click Send to get a response</span>;

    if (viewMode === "pretty") {
      return JSON.stringify(response, null, 2);
    } 
    
    // Preview Mode
    if (typeof response === 'object') {
       return (
        <div className="font-sans">
          <div className="space-y-2">
            {Object.entries(response).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <span className="font-medium text-blue-600">{key}:</span>{' '}
                <span className="text-gray-700">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return String(response);
  };

  return (
    <div className="flex-1 bg-gray-50 border-t flex flex-col min-h-0">
      {/* Response Status Header */}
      <div className="flex items-center px-4 py-2 border-b bg-white justify-between">
        <div className="text-sm font-medium">Response</div>
        <div className="flex gap-2 text-xs items-center">
          {status && (
            <>
              <span className="flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-gray-400" />
                <span className={`${status.includes('500') || status.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                  {status}
                </span>
              </span>
              <span className="flex items-center gap-1 text-gray-500">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{time}</span>
              </span>
              <span className="flex items-center gap-1 text-gray-500">
                <FileText className="w-4 h-4 text-gray-400" />
                <span>{size}</span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Response Tabs */}
      <div className="border-b bg-white flex-shrink-0">
        <div className="flex">
          {["body", "cookies", "headers"].map((tab) => (
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
      </div>

      {/* Response Content Area */}
      <div className="flex-1 p-4 overflow-auto">
        {activeTab === "body" && (
          <>
            <div className="flex justify-start p-2 border-t">
              <div className="flex border rounded overflow-hidden">
                <button
                  onClick={() => setViewMode("pretty")}
                  className={`px-3 py-1 text-xs flex items-center gap-1 ${
                    viewMode === "pretty" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Code className="h-3 w-3" /> Pretty
                </button>
                <button
                  onClick={() => setViewMode("preview")}
                  className={`px-3 py-1 text-xs flex items-center gap-1 border-l ${
                    viewMode === "preview" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Eye className="h-3 w-3" /> Preview
                </button>
              </div>
            </div>
            <div className="bg-white border rounded">
              <div className="flex justify-end p-2 border-b bg-gray-50">
                <div className="flex border rounded overflow-hidden">
                  <button onClick={onCopy} className="px-3 py-1 text-xs flex items-center gap-1 text-gray-600 hover:bg-gray-100">
                    <Copy className="h-3 w-3" /> Copy
                  </button>
                  <button onClick={onSave} className="px-3 py-1 text-xs flex items-center gap-1 border-l text-gray-600 hover:bg-gray-100">
                    <Download className="h-3 w-3" /> Save
                  </button>
                </div>
              </div>
              <pre className="p-4 text-sm overflow-auto max-h-96 font-mono whitespace-pre-wrap">
                {renderContent()}
              </pre>
            </div>
          </>
        )}

        {activeTab === "cookies" && (
          <div className="bg-white border rounded">
            <div className="border-b">
              <div className="grid grid-cols-7 gap-2 bg-gray-50 p-2 text-xs font-medium text-gray-500">
                <div>Name</div><div>Value</div><div>Domain</div><div>Path</div>
                <div>Expires</div><div>HttpOnly</div><div>Secure</div>
              </div>
              {cookies.map((cookie, i) => (
                <div key={i} className="grid grid-cols-7 gap-2 p-2 border-b last:border-b-0 text-sm">
                  <div>{cookie.name}</div><div>{cookie.value}</div><div>{cookie.domain}</div>
                  <div>{cookie.path}</div><div>{cookie.expires}</div>
                  <div>{cookie.httpOnly ? 'true' : 'false'}</div>
                  <div>{cookie.secure ? 'true' : 'false'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "headers" && (
          <div className="bg-white border rounded">
            <div className="border-b">
              <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 text-xs font-medium text-gray-500">
                <div>Key</div><div>Value</div>
              </div>
              {Object.entries(headers).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-2 p-2 border-b last:border-b-0 text-sm">
                  <div className="font-medium">{key}</div>
                  <div>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsePanel;