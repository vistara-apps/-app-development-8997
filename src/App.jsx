import { useState, createContext, useContext } from 'react';
import { useAccount } from 'wagmi';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { MarketFeed } from './pages/MarketFeed';
import { MarketDetails } from './pages/MarketDetails';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Toast } from './components/Toast';
import { useToast } from './hooks/useToast';
import { mockMarkets } from './data/mockData';

// Create a context for toast notifications
export const ToastContext = createContext(null);

// Custom hook to use toast context
export const useToastContext = () => useContext(ToastContext);

function App() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [userBets, setUserBets] = useState([]);
  const toast = useToast();

  const handleMarketSelect = (market) => {
    setSelectedMarket(market);
  };

  const handleBackToFeed = () => {
    setSelectedMarket(null);
  };

  const handlePlaceBet = (betData) => {
    console.log('Placing bet:', betData);
    // In a real app, this would interact with smart contracts
    const newBet = {
      id: Date.now(),
      ...betData,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    setUserBets(prev => [...prev, newBet]);
    
    // Simulate transaction completion
    setTimeout(() => {
      setUserBets(prev => prev.map(bet => 
        bet.id === newBet.id ? { ...bet, status: 'active' } : bet
      ));
      
      // Show success toast
      toast.showSuccess(`Bet placed successfully! ${betData.prediction.toUpperCase()} for $${betData.amount}`);
    }, 2000);
  };

  const renderContent = () => {
    if (selectedMarket) {
      return (
        <MarketDetails
          market={selectedMarket}
          onBack={handleBackToFeed}
          onBet={handlePlaceBet}
        />
      );
    }

    switch (activeTab) {
      case 'feed':
        return <MarketFeed onMarketSelect={handleMarketSelect} />;
      case 'analytics':
        return <Analytics userBets={userBets} />;
      case 'settings':
        return <Settings />;
      default:
        return <MarketFeed onMarketSelect={handleMarketSelect} />;
    }
  };

  // Render toast notifications
  const renderToasts = () => {
    return toast.toasts.map(t => (
      <Toast
        key={t.id}
        type={t.type}
        message={t.message}
        duration={t.duration}
        position={t.position}
        onClose={() => toast.removeToast(t.id)}
      />
    ));
  };

  if (!isConnected) {
    return (
      <ToastContext.Provider value={toast}>
        <div className="min-h-screen bg-bg">
          <Header />
          <div className="max-w-xl mx-auto px-4 py-12 text-center">
            <div className="bg-surface rounded-lg shadow-card p-8">
              <h2 className="text-2xl font-bold text-textPrimary mb-4">
                Welcome to PredictBase
              </h2>
              <p className="text-textSecondary mb-6">
                Navigate and profit from the Base prediction market landscape. 
                Connect your wallet to get started.
              </p>
              <div className="space-y-4">
                <div className="text-sm text-textSecondary">
                  ✨ Curated market discovery<br />
                  📊 Advanced analytics<br />
                  🤖 AI-powered insights<br />
                  📱 Simplified betting interface
                </div>
              </div>
            </div>
          </div>
          {renderToasts()}
        </div>
      </ToastContext.Provider>
    );
  }

  return (
    <ToastContext.Provider value={toast}>
      <div className="min-h-screen bg-bg flex flex-col">
        <Header />
        <main className="flex-1 pb-20">
          {renderContent()}
        </main>
        {!selectedMarket && (
          <div className="fixed bottom-0 left-0 right-0 z-10">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        )}
        {renderToasts()}
      </div>
    </ToastContext.Provider>
  );
}

export default App;

