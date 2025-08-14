import { useState } from 'react';
import { ArrowLeft, Calendar, Users, DollarSign, ExternalLink } from 'lucide-react';
import { BettingButton } from '../components/BettingButton';
import { InsightPrompt } from '../components/InsightPrompt';
import { BetConfirmationModal } from '../components/BetConfirmationModal';
import { useToastContext } from '../App';

export function MarketDetails({ market, onBack, onBet }) {
  const [selectedBet, setSelectedBet] = useState(null);
  const [betData, setBetData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToastContext();

  const handleBetClick = (type) => {
    setSelectedBet(type);
  };

  const handlePlaceBet = (data) => {
    setBetData(data);
    setShowConfirmation(true);
  };

  const handleConfirmBet = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate transaction time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the parent onBet function
      onBet(data);
      
      // Reset state
      setSelectedBet(null);
      setBetData(null);
      setShowConfirmation(false);
      
      // Show success toast
      toast.showSuccess(`Bet placed successfully! ${data.prediction.toUpperCase()} for $${data.amount}`);
    } catch (error) {
      console.error('Bet failed:', error);
      toast.showError('Failed to place bet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-textPrimary">Market Details</h1>
      </div>

      {/* Market Info */}
      <div className="bg-surface rounded-lg shadow-card p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold text-textPrimary leading-tight">
            {market.title}
          </h2>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            market.category === 'crypto' ? 'bg-blue-100 text-blue-800' :
            market.category === 'sports' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {market.category}
          </span>
        </div>

        <p className="text-textSecondary mb-6">
          {market.description}
        </p>

        {/* Market Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-textSecondary" />
            </div>
            <div className="text-sm font-medium text-textPrimary">{market.volume}</div>
            <div className="text-xs text-textSecondary">Volume</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="w-4 h-4 text-textSecondary" />
            </div>
            <div className="text-sm font-medium text-textPrimary">${market.tvl}</div>
            <div className="text-xs text-textSecondary">TVL</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="w-4 h-4 text-textSecondary" />
            </div>
            <div className="text-sm font-medium text-textPrimary">
              {new Date(market.endDate).toLocaleDateString()}
            </div>
            <div className="text-xs text-textSecondary">Ends</div>
          </div>
        </div>

        {/* Provider */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-textSecondary">Powered by {market.provider}</span>
          <ExternalLink className="w-4 h-4 text-textSecondary" />
        </div>
      </div>

      {/* Current Odds */}
      <div className="bg-surface rounded-lg shadow-card p-6 mb-6">
        <h3 className="text-lg font-bold text-textPrimary mb-4">Current Odds</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{market.odds.yes}%</div>
            <div className="text-sm text-green-700">YES</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{market.odds.no}%</div>
            <div className="text-sm text-red-700">NO</div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mb-6">
        <InsightPrompt market={market} />
      </div>

      {/* Betting Interface */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <h3 className="text-lg font-bold text-textPrimary mb-4">Place Your Bet</h3>
        
        {selectedBet ? (
          <BettingButton
            variant="amountInput"
            market={market}
            onBet={handlePlaceBet}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <BettingButton
              variant="yes"
              market={market}
              onBet={handlePlaceBet}
            />
            <BettingButton
              variant="no"
              market={market}
              onBet={handlePlaceBet}
            />
          </div>
        )}
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            💡 Tip: Start with small amounts to test your prediction skills. 
            Consider market volume and time remaining before placing larger bets.
          </p>
        </div>
      </div>

      {/* Bet Confirmation Modal */}
      <BetConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmBet}
        betData={betData}
        market={market}
        isLoading={isSubmitting}
      />
    </div>
  );
}

