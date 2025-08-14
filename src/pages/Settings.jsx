import { useState } from 'react';
import { Bell, Shield, HelpCircle, ExternalLink, Lock } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';
import { PremiumFeatureCard } from '../components/PremiumFeatureCard';
import { useToastContext } from '../App';

export function Settings() {
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [hasAlertAccess, setHasAlertAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createMarketAlerts } = usePaymentContext();
  const toast = useToastContext();

  const handleAlertsUpgrade = async () => {
    setLoading(true);
    try {
      await createMarketAlerts();
      setHasAlertAccess(true);
      setAlertsEnabled(true);
      toast.showSuccess('Market alerts subscription activated successfully!');
    } catch (error) {
      console.error('Payment failed:', error);
      toast.showError('Failed to process payment. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-textPrimary mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Market Alerts */}
        {!hasAlertAccess ? (
          <PremiumFeatureCard
            title="Market Alerts"
            description="Get notified about trending markets and opportunities"
            icon={Bell}
            price="$1/week"
            ctaText="Subscribe"
            onUpgrade={handleAlertsUpgrade}
            isLoading={loading}
            gradientFrom="from-blue-50"
            gradientTo="to-indigo-50"
            borderColor="border-blue-200"
            primaryColor="blue"
            features={[
              "Price movement alerts (±10%)",
              "High volume markets",
              "New market launches",
              "Personalized opportunity notifications"
            ]}
          />
        ) : (
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-medium text-textPrimary">Market Alerts</h3>
                  <p className="text-sm text-textSecondary">
                    Get notified about trending markets and opportunities
                  </p>
                </div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={alertsEnabled}
                  onChange={(e) => setAlertsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="space-y-3 mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="price-alerts" className="rounded" />
                <label htmlFor="price-alerts" className="text-sm text-blue-800">
                  Price movement alerts (±10%)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="volume-alerts" className="rounded" />
                <label htmlFor="volume-alerts" className="text-sm text-blue-800">
                  High volume markets
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="new-markets" className="rounded" />
                <label htmlFor="new-markets" className="text-sm text-blue-800">
                  New market launches
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Privacy & Security */}
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-textPrimary">Privacy & Security</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-textSecondary">Data Analytics</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-textSecondary">Performance Tracking</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-textPrimary">Help & Support</h3>
          </div>
          
          <div className="space-y-3">
            <button className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-sm text-textSecondary">How to use PredictBase</span>
              <ExternalLink className="w-4 h-4 text-textSecondary" />
            </button>
            
            <button className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-sm text-textSecondary">Understanding prediction markets</span>
              <ExternalLink className="w-4 h-4 text-textSecondary" />
            </button>
            
            <button className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-sm text-textSecondary">Contact support</span>
              <ExternalLink className="w-4 h-4 text-textSecondary" />
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-surface rounded-lg shadow-card p-6">
          <h3 className="font-medium text-textPrimary mb-3">About PredictBase</h3>
          <div className="space-y-2 text-sm text-textSecondary">
            <div className="flex justify-between">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Network</span>
              <span>Base</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

