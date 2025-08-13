import { useState } from 'react';
import { Check, X, DollarSign } from 'lucide-react';

export function BettingButton({ variant, market, onBet }) {
  const [amount, setAmount] = useState('');
  const [showAmountInput, setShowAmountInput] = useState(false);

  const handleBetClick = () => {
    if (variant === 'amountInput') return;
    setShowAmountInput(true);
  };

  const handleConfirmBet = () => {
    if (amount && parseFloat(amount) > 0) {
      onBet({
        marketId: market.id,
        prediction: variant,
        amount: parseFloat(amount)
      });
      setAmount('');
      setShowAmountInput(false);
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
          />
        </div>
        <button
          onClick={handleConfirmBet}
          disabled={!amount || parseFloat(amount) <= 0}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm
        </button>
      </div>
    );
  }

  if (showAmountInput) {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-textSecondary" />
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleConfirmBet}
            disabled={!amount || parseFloat(amount) <= 0}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
              variant === 'yes' 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Bet {variant.toUpperCase()} - ${amount || '0'}
          </button>
          <button
            onClick={() => setShowAmountInput(false)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
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
    >
      {variant === 'yes' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      <span>{variant === 'yes' ? 'YES' : 'NO'}</span>
      <span className="text-sm opacity-80">
        {variant === 'yes' ? market.odds.yes : market.odds.no}%
      </span>
    </button>
  );
}