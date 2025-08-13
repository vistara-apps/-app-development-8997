import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-surface shadow-card border-b border-gray-100">
      <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold text-textPrimary">PredictBase</h1>
        </div>
        <ConnectButton />
      </div>
    </header>
  );
}