import { TrendingUp, TrendingDown, Users, DollarSign } from 'lucide-react';

export function MarketCard({ market, variant = 'default', onSelect }) {
  const isCompact = variant === 'compact';
  
  return (
    <div 
      className={`bg-surface rounded-lg shadow-card border border-gray-100 p-4 cursor-pointer hover:shadow-lg transition-all duration-200 ${
        isCompact ? 'mb-2' : 'mb-4'
      }`}
      onClick={() => onSelect(market)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className={`font-bold text-textPrimary ${isCompact ? 'text-sm' : 'text-base'}`}>
            {market.title}
          </h3>
          {!isCompact && (
            <p className="text-sm text-textSecondary mt-1 line-clamp-2">
              {market.description}
            </p>
          )}
        </div>
        <span className={`px-2 py-1 rounded-sm text-xs font-medium ${
          market.category === 'crypto' ? 'bg-blue-100 text-blue-800' :
          market.category === 'sports' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {market.category}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-textSecondary" />
            <span className="text-sm text-textSecondary">{market.volume}</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4 text-textSecondary" />
            <span className="text-sm text-textSecondary">${market.tvl}</span>
          </div>
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
    </div>
  );
}