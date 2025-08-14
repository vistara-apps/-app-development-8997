import { useState, useEffect } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { MarketCard } from '../components/MarketCard';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { mockMarkets } from '../data/mockData';

export function MarketFeed({ onMarketSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [markets, setMarkets] = useState([]);

  const categories = ['all', 'crypto', 'sports', 'politics'];

  useEffect(() => {
    // Simulate loading markets from API
    const loadMarkets = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMarkets(mockMarkets);
      } catch (error) {
        console.error('Failed to load markets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMarkets();
  }, []);

  const filteredMarkets = markets.filter(market => {
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
            aria-label="Search markets"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
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
              aria-pressed={selectedCategory === category}
              aria-label={`Filter by ${category}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <LoadingIndicator 
          variant="skeleton" 
          count={5} 
          className="my-4"
          aria-label="Loading markets"
        />
      ) : (
        <>
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
                  aria-label={favorites.has(market.id) ? "Remove from favorites" : "Add to favorites"}
                  aria-pressed={favorites.has(market.id)}
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
        </>
      )}
    </div>
  );
}

