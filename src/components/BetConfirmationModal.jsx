import React from 'react';
import { X, CheckCircle, AlertTriangle, DollarSign } from 'lucide-react';
import { LoadingIndicator } from './LoadingIndicator';

/**
 * Modal for confirming bet details before submission
 */
export function BetConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  betData, 
  market,
  isLoading = false
}) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(betData);
  };

  // Calculate potential payout based on odds
  const odds = betData.prediction === 'yes' ? market.odds.yes : market.odds.no;
  const potentialPayout = (betData.amount / (odds / 100)).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-textPrimary">Confirm Your Bet</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-textSecondary" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Market info */}
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium text-textPrimary mb-1">{market.title}</h4>
            <p className="text-sm text-textSecondary">{market.provider}</p>
          </div>
          
          {/* Bet details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-textSecondary">Your prediction:</span>
              <span className={`font-medium px-3 py-1 rounded-full text-sm ${
                betData.prediction === 'yes' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {betData.prediction.toUpperCase()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-textSecondary">Amount:</span>
              <span className="font-medium text-textPrimary">${betData.amount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-textSecondary">Current odds:</span>
              <span className="font-medium text-textPrimary">{odds}%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-textSecondary">Potential payout:</span>
              <span className="font-medium text-green-600">${potentialPayout}</span>
            </div>
          </div>
          
          {/* Risk warning */}
          <div className="flex items-start space-x-2 bg-yellow-50 p-3 rounded-md text-sm text-yellow-800">
            <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p>
              Prediction markets involve risk. Only bet what you can afford to lose. 
              Outcomes are determined by market resolution.
            </p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="p-4 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center ${
              betData.prediction === 'yes' 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <LoadingIndicator variant="button" size="sm" />
            ) : (
              <>
                <DollarSign className="w-4 h-4 mr-1" />
                <span>Place Bet</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

