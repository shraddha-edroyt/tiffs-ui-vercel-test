import Input from "@/components/ui/Input";

export default function ApiConfiguration() {
  return (
    <div className="space-y-6">
      {/* API Version + Endpoint */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-500 mb-1 block">API Version</label>
          <Input
            placeholder="V1"
            className="bg-white border-gray-100 py-2.5 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500 mb-1 block">Endpoint Name</label>
          <Input
            placeholder="/api/users"
            className="bg-white border-gray-100 py-2.5 rounded-md"
          />
        </div>
      </div>

      {/* HTTP Method */}
      <div>
        <label className="text-sm text-gray-500 mb-2 block">HTTP Method</label>
        <div className="flex gap-6">
          {["GET", "POST", "PUT", "DELETE"].map((method) => (
            <label
              key={method}
              className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
            >
              <input
                type="radio"
                name="method"
                value={method}
                className="accent-purple-600"
                defaultChecked={method === "GET"}
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-gray-500 mb-1 block">Description</label>
        <textarea
          rows={4}
          className="w-full border border-gray-100 rounded-md p-3 text-sm text-gray-600 focus:outline-none"
          placeholder="Retrieves a list of all active users and their basic profile information."
        />
        <p className="text-xs text-gray-400 text-right mt-1">0/100</p>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Primary Table</label>
          <Input
            placeholder="users"
            className="bg-white border-gray-100 py-2.5 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500 mb-1 block">Join Table</label>
          <Input
            placeholder="user_profiles"
            className="bg-white border-gray-100 py-2.5 rounded-md"
          />
        </div>
      </div>

      {/* API Type */}
      <div>
        <label className="text-sm text-gray-500 mb-1 block">API Type</label>
        <Input
          placeholder="Active"
          className="bg-white border-gray-100 py-2.5 rounded-md"
        />
      </div>

      {/* SQL Query */}
      <div>
        <label className="text-sm text-gray-500 mb-1 block">SQL Query</label>
        <textarea
          rows={4}
          className="w-full border border-gray-100 rounded-md p-3 font-mono text-sm text-gray-600 focus:outline-none"
          placeholder="SELECT u.id, u.username, p.first_name, p.last_name FROM users u JOIN user_profiles p ON u.id = p.user_id WHERE u.is_active = TRUE;"
        />
      </div>

      {/* Response Schema */}
      <div>
        <label className="text-sm text-gray-500 mb-1 block">
          Response Schema (JSON)
        </label>
        <textarea
          rows={4}
          className="w-full border border-gray-100 rounded-md p-3 font-mono text-sm text-gray-600 focus:outline-none"
          placeholder={`json\n[\n  { \n    "id": 1,\n    "username": "jdoe"\n  }\n]\n`}
        />
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Updated By</label>
          <Input
            placeholder="Admin User"
            className="bg-white border-gray-100 py-2.5 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500 mb-1 block">Created By</label>
          <Input
            placeholder="Admin User"
            className="bg-white border-gray-100 py-2.5 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500 mb-1 block">Mail</label>
          <Input
            placeholder="Admin@gmail.com"
            className="bg-white border-gray-100 py-2.5 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}