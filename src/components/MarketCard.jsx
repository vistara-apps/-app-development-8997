import { TrendingUp, TrendingDown, Users, DollarSign, Calendar } from 'lucide-react';

export function MarketCard({ market, variant = 'default', onSelect }) {
  const isCompact = variant === 'compact';
  
  // Format the end date
  const formatEndDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Ended';
    if (diffDays === 1) return 'Ends tomorrow';
    if (diffDays < 7) return `Ends in ${diffDays} days`;
    if (diffDays < 30) return `Ends in ${Math.floor(diffDays / 7)} weeks`;
    return `Ends ${date.toLocaleDateString()}`;
  };

  // Category styling
  const getCategoryStyle = (category) => {
    switch (category) {
      case 'crypto':
        return 'bg-blue-100 text-blue-800';
      case 'sports':
        return 'bg-green-100 text-green-800';
      case 'politics':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div 
      className={`bg-surface rounded-lg shadow-card border border-gray-100 p-4 cursor-pointer hover:shadow-lg transition-all duration-200 ${
        isCompact ? 'mb-2' : 'mb-4'
      }`}
      onClick={() => onSelect(market)}
      aria-label={`Market: ${market.title}`}
      tabIndex="0"
      role="button"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className={`font-bold text-textPrimary ${isCompact ? 'text-sm' : 'text-base'} line-clamp-2`}>
            {market.title}
          </h3>
          {!isCompact && (
            <p className="text-sm text-textSecondary mt-1 line-clamp-2">
              {market.description}
            </p>
          )}
        </div>
        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
          getCategoryStyle(market.category)
        }`}>
          {market.category}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1" title="Trading volume">
            <Users className="w-4 h-4 text-textSecondary" />
            <span className="text-sm text-textSecondary">{market.volume}</span>
          </div>
          <div className="flex items-center space-x-1" title="Total value locked">
            <DollarSign className="w-4 h-4 text-textSecondary" />
            <span className="text-sm text-textSecondary">${market.tvl}</span>
          </div>
          {!isCompact && (
            <div className="flex items-center space-x-1" title="End date">
              <Calendar className="w-4 h-4 text-textSecondary" />
              <span className="text-sm text-textSecondary">{formatEndDate(market.endDate)}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {market.odds.yes > market.odds.no ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm font-medium text-textPrimary">
              {Math.max(market.odds.yes, market.odds.no)}%
            </span>
          </div>
        </div>
      </div>
      
      {/* Provider tag */}
      {!isCompact && (
        <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-textSecondary">{market.provider}</span>
          <div className="flex space-x-1">
            <span className={`text-xs px-1.5 py-0.5 rounded-sm ${market.odds.yes > 50 ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
              Yes: {market.odds.yes}%
            </span>
            <span className={`text-xs px-1.5 py-0.5 rounded-sm ${market.odds.no > 50 ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-600'}`}>
              No: {market.odds.no}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

