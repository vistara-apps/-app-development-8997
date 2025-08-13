import { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { MarketCard } from '../components/MarketCard';
import { mockMarkets } from '../data/mockData';

export function MarketFeed({ onMarketSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  const categories = ['all', 'crypto', 'sports', 'politics'];

  const filteredMarkets = mockMarkets.filter(market => {
    const matchesSearch = market.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || market.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (marketId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(marketId)) {
      newFavorites.delete(marketId);
    } else {
      newFavorites.add(marketId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textSecondary" />
          <input
            type="text"
            placeholder="Search markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-textSecondary flex-shrink-0" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-textSecondary hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Market Cards */}
      <div className="space-y-4">
        {filteredMarkets.map(market => (
          <div key={market.id} className="relative">
            <MarketCard
              market={market}
              onSelect={onMarketSelect}
            />
            <button
              onClick={() => toggleFavorite(market.id)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded"
            >
              <Star
                className={`w-4 h-4 ${
                  favorites.has(market.id)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-textSecondary'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {filteredMarkets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-textSecondary">No markets found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}