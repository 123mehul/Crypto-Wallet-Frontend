import React, { useState } from 'react';
import { Eye, EyeOff, TrendingUp, TrendingDown, Plus, ArrowUpRight, ArrowDownLeft, Copy } from 'lucide-react';

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  balance: string;
  usdValue: string;
  change24h: string;
  changePercentage: number;
  icon: string;
}

const WalletDashboard: React.FC = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [assets] = useState<CryptoAsset[]>([
    {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      balance: '0.5234',
      usdValue: '$23,456.78',
      change24h: '+$234.56',
      changePercentage: 2.3,
      icon: '₿'
    },
    {
      id: '2',
      name: 'Ethereum',
      symbol: 'ETH',
      balance: '3.2567',
      usdValue: '$7,890.12',
      change24h: '-$67.89',
      changePercentage: -1.2,
      icon: 'Ξ'
    },
    {
      id: '3',
      name: 'Cardano',
      symbol: 'ADA',
      balance: '1,234.56',
      usdValue: '$543.21',
      change24h: '+$12.34',
      changePercentage: 0.8,
      icon: '₳'
    }
  ]);

  const totalPortfolioValue = '$31,890.11';
  const totalChange = '+$178.01';
  const totalChangePercentage = 1.8;

  const walletAddress = '1A2b3C4d5E6f7G8h9I0j1K2L3M4N5O6P7Q8R9S';

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    // In a real app, you'd show a toast notification
  };

  return (
    <div className="p-6 space-y-6">
      {/* Portfolio Overview */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white/90">Total Balance</h2>
          <button
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            {balanceVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white">
            {balanceVisible ? totalPortfolioValue : '••••••••'}
          </div>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${
              totalChangePercentage >= 0 ? 'text-green-300' : 'text-red-300'
            }`}>
              {totalChangePercentage >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {totalChange} ({totalChangePercentage >= 0 ? '+' : ''}{totalChangePercentage}%)
              </span>
            </div>
            <span className="text-white/60 text-sm">24h</span>
          </div>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="bg-gray-800 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">Wallet Address</p>
            <p className="text-sm font-mono text-white truncate">
              {walletAddress}
            </p>
          </div>
          <button
            onClick={copyAddress}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors ml-3"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 rounded-2xl p-4 flex items-center justify-center space-x-2 transition-colors active:scale-95">
          <ArrowUpRight className="w-5 h-5" />
          <span className="font-semibold">Send</span>
        </button>
        <button className="bg-green-600 hover:bg-green-700 rounded-2xl p-4 flex items-center justify-center space-x-2 transition-colors active:scale-95">
          <ArrowDownLeft className="w-5 h-5" />
          <span className="font-semibold">Receive</span>
        </button>
      </div>

      {/* Assets List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Assets</h3>
          <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-gray-800 rounded-2xl p-4 hover:bg-gray-750 transition-colors cursor-pointer active:scale-98"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {asset.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{asset.name}</p>
                    <p className="text-sm text-gray-400">{asset.symbol}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-white">
                    {balanceVisible ? asset.usdValue : '••••••'}
                  </p>
                  <div className="flex items-center space-x-1">
                    <p className="text-sm text-gray-400">
                      {balanceVisible ? asset.balance : '••••••'} {asset.symbol}
                    </p>
                    <div className={`flex items-center space-x-1 ${
                      asset.changePercentage >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {asset.changePercentage >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span className="text-xs">
                        {asset.changePercentage >= 0 ? '+' : ''}{asset.changePercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;