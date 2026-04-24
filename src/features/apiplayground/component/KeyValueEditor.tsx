import React from "react";
import { Plus } from "lucide-react";

type Row = { key: string; value: string; enabled: boolean };

interface KeyValueEditorProps {
  rows: Row[];
  onChange: (rows: Row[]) => void;
  title?: string;
}

const KeyValueEditor: React.FC<KeyValueEditorProps> = ({ rows, onChange, title = "Rows" }) => {
  
  const updateRow = (index: number, field: keyof Row, value: string | boolean) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addRow = () => {
    onChange([...rows, { key: "", value: "", enabled: true }]);
  };

  const removeRow = (index: number) => {
    const updated = rows.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div>
      {title && <div className="text-sm text-gray-500 mb-2">{title}</div>}
      <div className="border rounded">
        <div className="grid grid-cols-3 gap-2 bg-gray-50 p-2 border-b text-xs font-medium text-gray-500">
          <div>Key</div>
          <div>Value</div>
          <div></div>
        </div>
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 p-2 border-b last:border-b-0">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={row.enabled}
                onChange={(e) => updateRow(i, "enabled", e.target.checked)}
                className="rounded"
              />
              <input
                value={row.key}
                onChange={(e) => updateRow(i, "key", e.target.value)}
                placeholder="key"
                className="border rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <input
              value={row.value}
              onChange={(e) => updateRow(i, "value", e.target.value)}
              placeholder="value"
              className="border rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex items-center">
              <button
                onClick={() => removeRow(i)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={addRow}
        className="text-blue-600 text-sm mt-2 flex items-center gap-1"
      >
        <Plus className="h-4 w-4" /> Add Row
      </button>
    </div>
  );
};

export default KeyValueEditor;