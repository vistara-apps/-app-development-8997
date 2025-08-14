import { useState } from 'react';
import { Brain, Sparkles, Lock } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';
import { LoadingIndicator } from './LoadingIndicator';

export function InsightPrompt({ market, variant = 'userQuery' }) {
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState('');
  const { createInsightPayment } = usePaymentContext();

  const handleGetInsight = async () => {
    setLoading(true);
    try {
      await createInsightPayment();
      setPaid(true);
      
      // Simulate AI insight generation
      setTimeout(() => {
        setInsight(`
          Based on current market sentiment and historical data, this market shows strong momentum in the ${market.odds.yes > market.odds.no ? 'YES' : 'NO'} direction. 
          
          Key factors to consider:
          • Social sentiment is ${market.odds.yes > 60 ? 'bullish' : 'bearish'}
          • Trading volume has increased 23% in the last 24h
          • Similar markets have resolved with ${Math.round(Math.random() * 30 + 50)}% accuracy
          
          Recommendation: Consider the ${market.odds.yes > market.odds.no ? 'YES' : 'NO'} position but limit exposure to 2-3% of portfolio.
        `);
        setLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Payment failed:', error);
      setLoading(false);
    }
  };

  if (variant === 'aiResponse' && paid) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-purple-900 mb-2">AI Market Insight</h4>
            <div className="text-sm text-purple-800 whitespace-pre-line">
              {loading ? (
                <LoadingIndicator 
                  variant="inline" 
                  size="sm" 
                  text="Analyzing market data..." 
                  className="text-purple-800"
                />
              ) : (
                insight
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Brain className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900">Get AI Insights</h4>
            <p className="text-sm text-blue-700">Deep analysis and sentiment data</p>
          </div>
        </div>
        
        <button
          onClick={handleGetInsight}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          aria-label="Purchase AI insight"
        >
          {loading ? (
            <LoadingIndicator variant="button" size="sm" />
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>$0.50</span>
            </>
          )}
        </button>
      </div>
      
      {paid && <InsightPrompt market={market} variant="aiResponse" />}
    </div>
  );
}

