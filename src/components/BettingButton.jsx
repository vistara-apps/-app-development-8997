import { useState } from 'react';
import { Check, X, DollarSign } from 'lucide-react';
import { LoadingIndicator } from './LoadingIndicator';

export function BettingButton({ variant, market, onBet }) {
  const [amount, setAmount] = useState('');
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quickAmounts] = useState([5, 10, 25, 50]);

  const handleBetClick = () => {
    if (variant === 'amountInput') return;
    setShowAmountInput(true);
  };

  const handleQuickAmountSelect = (value) => {
    setAmount(value.toString());
  };

  const handleConfirmBet = async () => {
    if (amount && parseFloat(amount) > 0) {
      setIsLoading(true);
      try {
        // Simulate transaction time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        onBet({
          marketId: market.id,
          prediction: variant,
          amount: parseFloat(amount)
        });
        
        setAmount('');
        setShowAmountInput(false);
      } catch (error) {
        console.error('Bet failed:', error);
        // Error handling would be managed by Toast component
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (variant === 'amountInput') {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <input
            type="number"
            placeholder="Amount in USDC"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Bet amount"
          />
        </div>
        <button
          onClick={handleConfirmBet}
          disabled={!amount || parseFloat(amount) <= 0 || isLoading}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Confirm bet"
        >
          {isLoading ? <LoadingIndicator variant="button" size="sm" /> : 'Confirm'}
        </button>
      </div>
    );
  }

  if (showAmountInput) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-textSecondary" />
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
            aria-label="Bet amount"
          />
        </div>
        
        {/* Quick amount buttons */}
        <div className="flex justify-between">
          {quickAmounts.map((value) => (
            <button
              key={value}
              onClick={() => handleQuickAmountSelect(value)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
            >
              ${value}
            </button>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleConfirmBet}
            disabled={!amount || parseFloat(amount) <= 0 || isLoading}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
              variant === 'yes' 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label={`Bet ${variant.toUpperCase()}`}
          >
            {isLoading ? (
              <LoadingIndicator variant="button" size="sm" />
            ) : (
              `Bet ${variant.toUpperCase()} - $${amount || '0'}`
            )}
          </button>
          <button
            onClick={() => setShowAmountInput(false)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleBetClick}
      className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-md font-medium transition-colors ${
        variant === 'yes' 
          ? 'bg-green-500 hover:bg-green-600 text-white' 
          : 'bg-red-500 hover:bg-red-600 text-white'
      }`}
      aria-label={`Select ${variant.toUpperCase()} option`}
    >
      {variant === 'yes' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      <span>{variant === 'yes' ? 'YES' : 'NO'}</span>
      <span className="text-sm opacity-80">
        {variant === 'yes' ? market.odds.yes : market.odds.no}%
      </span>
    </button>
  );
}

