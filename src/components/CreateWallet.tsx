import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Copy, Check, AlertTriangle } from 'lucide-react';

interface CreateWalletProps {
  onWalletCreated: () => void;
}

const CreateWallet: React.FC<CreateWalletProps> = ({ onWalletCreated }) => {
  const [step, setStep] = useState(1);
  const [seedPhrase] = useState([
    'abandon', 'ability', 'able', 'about', 'above', 'absent',
    'absorb', 'abstract', 'absurd', 'abuse', 'access', 'accident'
  ]);
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [confirmedBackup, setConfirmedBackup] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleCopySeedPhrase = () => {
    navigator.clipboard.writeText(seedPhrase.join(' '));
  };

  const handleCreateWallet = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    if (!agreedToTerms) {
      alert('Please agree to the terms of service');
      return;
    }
    onWalletCreated();
  };

  return (
    <div className="min-h-screen bg-black text-white">
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
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold">Create Wallet</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-gray-900 p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">Secure Your Wallet</h2>
                <p className="text-gray-400 text-base leading-relaxed">
                  You're about to create a new wallet. This will generate a unique recovery phrase that you'll need to keep safe.
                </p>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-400 mb-1">Important</h3>
                    <p className="text-sm text-yellow-200">
                      Your recovery phrase is the only way to restore your wallet. Keep it safe and never share it with anyone.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 hover:bg-blue-700 rounded-2xl p-4 font-semibold transition-colors active:scale-95"
              >
                Generate Recovery Phrase
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Your Recovery Phrase</h2>
                <p className="text-gray-400">
                  Write down these 12 words in order and store them safely
                </p>
              </div>

              <div className="bg-gray-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-300">Recovery Phrase</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                      className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                      {showSeedPhrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={handleCopySeedPhrase}
                      className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {seedPhrase.map((word, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-xl p-3 flex items-center space-x-2"
                    >
                      <span className="text-sm text-gray-400 font-mono w-6">
                        {index + 1}.
                      </span>
                      <span className="font-mono">
                        {showSeedPhrase ? word : '••••••'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={confirmedBackup}
                    onChange={(e) => setConfirmedBackup(e.target.checked)}
                    className="w-5 h-5 bg-gray-700 border-gray-600 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">
                    I have written down my recovery phrase and stored it safely
                  </span>
                </label>

                <button
                  onClick={() => setStep(3)}
                  disabled={!confirmedBackup}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-2xl p-4 font-semibold transition-colors active:scale-95"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Set Password</h2>
                <p className="text-gray-400">
                  Create a strong password to protect your wallet
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-5 h-5 bg-gray-700 border-gray-600 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">
                      I agree to the <span className="text-blue-400">Terms of Service</span> and <span className="text-blue-400">Privacy Policy</span>
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleCreateWallet}
                  disabled={!password || !confirmPassword || !agreedToTerms}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-2xl p-4 font-semibold transition-colors active:scale-95"
                >
                  Create Wallet
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CreateWallet;