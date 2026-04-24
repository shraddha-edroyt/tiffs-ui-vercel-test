import { Copy } from "lucide-react";

export default function GeneratedSqlPreview() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mt-4 relative">
      <p className="text-sm text-gray-500 mb-4">Generated SQL Query</p>
      <div className="bg-white border border-gray-100 rounded-md p-6 font-mono text-sm text-gray-400 min-h-[160px] relative">
        SELECT * FROM users WHERE id = ?
        <div className="absolute bottom-4 right-4">
          <button className="border border-gray-200 text-gray-600 rounded-md bg-white hover:bg-gray-50 flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium shadow-sm">
            <Copy className="w-3.5 h-3.5 text-gray-400" /> Copy SQL
          </button>
        </div>
      </div>
    </div>
  );
}