import React, { useState } from 'react';
import { Wallet, Send, History, Settings, QrCode, Plus } from 'lucide-react';
import WalletDashboard from './components/WalletDashboard';
import SendCrypto from './components/SendCrypto';
import TransactionHistory from './components/TransactionHistory';
import SettingsPanel from './components/SettingsPanel';
import CreateWallet from './components/CreateWallet';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hasWallet, setHasWallet] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Wallet', icon: Wallet },
    { id: 'send', label: 'Send', icon: Send },
    { id: 'history', label: 'Activity', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleWalletCreated = () => {
    setHasWallet(true);
    setActiveTab('dashboard');
  };

  if (!hasWallet) {
    return <CreateWallet onWalletCreated={handleWalletCreated} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <WalletDashboard />;
      case 'send':
        return <SendCrypto />;
      case 'history':
        return <TransactionHistory />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <WalletDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Status Bar Simulation */}
        <div className="h-11 bg-black flex items-center justify-between px-6 text-white text-sm font-medium">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-4 h-2 bg-white rounded-sm"></div>
              <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
              <div className="w-4 h-2 bg-white rounded-sm opacity-30"></div>
            </div>
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-4 h-1 bg-green-500 rounded-sm m-0.5"></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <header className="px-6 py-4 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold">Wallet</h1>
            </div>
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
              <QrCode className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-gray-900 overflow-y-auto pb-20">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-around px-4 py-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'text-blue-400 bg-blue-400/10' 
                        : 'text-gray-500 hover:text-gray-300 active:scale-95'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;