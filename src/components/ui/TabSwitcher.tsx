import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  fullWidth?: boolean;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, activeTab, onTabChange, fullWidth = false }) => {
  return (
    <div className={`flex ${fullWidth ? 'w-full' : 'justify-center'}`}>
      <div className={`flex bg-[#F3F4F6]/50 p-1 rounded-xl border border-gray-100 ${fullWidth ? 'w-full' : 'w-fit'}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`${
              fullWidth ? 'flex-1 text-center px-4' : 'px-8'
            } py-1 text-sm font-semibold rounded-sm transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-800 shadow-md'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSwitcher;