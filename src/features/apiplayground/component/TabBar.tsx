import React from "react";

interface Tab {
  id: string;
  name: string;
  method: string;
  url: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  removeTab: (id: string) => void;
  addTab: () => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, setActiveTab, removeTab, addTab }) => {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'POST': return 'text-green-600';
      case 'GET': return 'text-blue-600';
      case 'PUT': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  return (
    <div className="flex border-b bg-gray-50 overflow-x-auto flex-shrink-0">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 border-r cursor-pointer min-w-[150px] ${
            activeTab === tab.id
              ? "bg-white text-blue-600 border-b-2 border-b-blue-600"
              : "text-gray-600"
          }`}
        >
          <span className={`text-xs font-mono ${getMethodColor(tab.method)}`}>
            {tab.method}
          </span>
          <span className="text-sm flex-1 truncate">{tab.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeTab(tab.id);
            }}
            className="text-gray-400 hover:text-gray-600 text-lg flex-shrink-0"
          >
            ×
          </button>
        </div>
      ))}
      <button 
        onClick={addTab} 
        className="px-3 text-xl text-blue-600 hover:bg-gray-100 flex-shrink-0"
      >
        +
      </button>
    </div>
  );
};

export default TabBar;