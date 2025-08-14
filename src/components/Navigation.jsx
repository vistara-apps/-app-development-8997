import { Home, BarChart3, Settings } from 'lucide-react';

export function Navigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'feed', label: 'Markets', icon: Home, ariaLabel: 'View markets feed' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, ariaLabel: 'View analytics dashboard' },
    { id: 'settings', label: 'Settings', icon: Settings, ariaLabel: 'View settings' },
  ];

  return (
    <nav className="bg-surface border-t border-gray-100 shadow-lg">
      <div className="max-w-xl mx-auto px-4">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center py-3 px-4 transition-colors relative ${
                  isActive
                    ? 'text-primary'
                    : 'text-textSecondary hover:text-textPrimary'
                }`}
                aria-label={tab.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="text-xs mt-1">{tab.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

