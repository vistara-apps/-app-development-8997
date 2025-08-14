import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-surface shadow-card border-b border-gray-100 sticky top-0 z-20">
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-1.5 rounded-full">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-textPrimary">PredictBase</h1>
        </div>
        
        <div className="flex items-center">
          <ConnectButton 
            showBalance={false}
            chainStatus="icon"
            accountStatus="avatar"
          />
        </div>
      </div>
    </header>
  );
}

