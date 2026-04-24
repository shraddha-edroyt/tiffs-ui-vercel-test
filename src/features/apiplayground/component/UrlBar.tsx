import React from "react";
import { Play } from "lucide-react";
import Input from "@/components/ui/Input";

interface UrlBarProps {
  method: string;
  url: string;
  onMethodChange: (method: string) => void;
  onUrlChange: (url: string) => void;
  onSend: () => void;
}

const UrlBar: React.FC<UrlBarProps> = ({ method, url, onMethodChange, onUrlChange, onSend }) => {
  return (
    <div className="flex gap-2 p-4 border-b items-center flex-shrink-0">
      <select
        value={method}
        onChange={(e) => onMethodChange(e.target.value)}
        className="border rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
      </select>

      {/* Using the custom Input component here */}
      <Input
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="Enter URL"
        className="flex-1" // Override default w-full if necessary or ensure parent handles layout
      />

      <button
        onClick={onSend}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center gap-2"
      >
        <Play className="h-4 w-4" />
        Send
      </button>
    </div>
  );
};

export default UrlBar;