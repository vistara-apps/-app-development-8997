import { useState } from 'react';
import { TrendingUp, TrendingDown, Target, DollarSign, Lock } from 'lucide-react';
import { AnalyticsChart } from '../components/AnalyticsChart';
import { mockAnalytics } from '../data/mockData';
import { usePaymentContext } from '../hooks/usePaymentContext';

export function Analytics() {
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createPremiumAccess } = usePaymentContext();

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await createPremiumAccess();
      setHasPremiumAccess(true);
    } catch (error) {
      console.error('Payment failed:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-textPrimary mb-6">Analytics Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface rounded-lg shadow-card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-textSecondary">Win Rate</h3>
            <Target className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-textPrimary">{mockAnalytics.winRate}%</div>
        </div>

        <div className="bg-surface rounded-lg shadow-card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-textSecondary">Total Profit</h3>
            <DollarSign className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            ${mockAnalytics.totalProfit}
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow-card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-textSecondary">Total Bets</h3>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-textPrimary">{mockAnalytics.totalBets}</div>
        </div>

        <div className="bg-surface rounded-lg shadow-card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-textSecondary">Best Category</h3>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="text-sm font-bold text-textPrimary capitalize">
            {mockAnalytics.bestCategory}
          </div>
        </div>
      </div>

      {/* Basic Charts */}
      <div className="space-y-6">
        <AnalyticsChart variant="pie" />
      </div>

      {/* Premium Analytics Paywall */}
      {!hasPremiumAccess ? (
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-purple-900">Premium Analytics</h3>
                <p className="text-sm text-purple-700">
                  Unlock advanced charts, trend analysis, and performance insights
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 mb-4 text-sm text-purple-800">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span>Detailed profit/loss tracking over time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span>Performance breakdown by market category</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span>Trend analysis and prediction accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span>Monthly performance reports</span>
            </div>
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Processing...' : 'Upgrade for $2/month'}
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          <AnalyticsChart variant="line" />
          <AnalyticsChart variant="bar" />
        </div>
      )}
    </div>
  );
}