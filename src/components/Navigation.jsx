import { Home, BarChart3, Settings } from 'lucide-react';

export function Navigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'feed', label: 'Markets', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-surface border-t border-gray-100">
      <div className="max-w-xl mx-auto px-4">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center py-3 px-4 transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-textSecondary hover:text-textPrimary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}