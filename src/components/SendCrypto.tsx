import React, { useState } from 'react';
import { ArrowLeft, QrCode, Scan, Contact, Calculator } from 'lucide-react';

interface SendCryptoProps {}

const SendCrypto: React.FC<SendCryptoProps> = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [gasSpeed, setGasSpeed] = useState('standard');

  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.5234', price: 45000, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', balance: '3.2567', price: 2800, icon: 'Ξ' },
    { symbol: 'ADA', name: 'Cardano', balance: '1234.56', price: 0.44, icon: '₳' }
  ];

  const gasSpeeds = [
    { id: 'slow', name: 'Slow', time: '~5 min', fee: '$0.12' },
    { id: 'standard', name: 'Standard', time: '~2 min', fee: '$0.25' },
    { id: 'fast', name: 'Fast', time: '~30 sec', fee: '$0.50' }
  ];

  const selectedCryptoData = cryptoOptions.find(crypto => crypto.symbol === selectedCrypto);

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (selectedCryptoData && value) {
      const usdValue = (parseFloat(value) * selectedCryptoData.price).toFixed(2);
      setUsdAmount(usdValue);
    } else {
      setUsdAmount('');
    }
  };

  const handleSend = () => {
    if (!recipientAddress || !amount) {
      alert('Please fill in all fields');
      return;
    }
    // In a real app, this would trigger the transaction
    alert(`Sending ${amount} ${selectedCrypto} to ${recipientAddress}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Crypto Selection */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Select Cryptocurrency</h3>
        <div className="grid grid-cols-1 gap-3">
          {cryptoOptions.map((crypto) => (
            <button
              key={crypto.symbol}
              onClick={() => setSelectedCrypto(crypto.symbol)}
              className={`p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                selectedCrypto === crypto.symbol
                  ? 'bg-blue-600/20 border-blue-500'
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                    {crypto.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{crypto.name}</p>
                    <p className="text-sm text-gray-400">{crypto.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{crypto.balance}</p>
                  <p className="text-sm text-gray-400">${(parseFloat(crypto.balance) * crypto.price).toFixed(2)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recipient Address */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Recipient</h3>
        <div className="relative">
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Enter wallet address or scan QR code"
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-4 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-2">
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
              <QrCode className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
              <Contact className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Amount</h3>
        <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">
                {selectedCrypto} Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0.00"
                className="w-full bg-transparent text-2xl font-bold focus:outline-none"
              />
            </div>
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
              <Calculator className="w-4 h-4" />
            </button>
          </div>
          
          {usdAmount && (
            <div className="text-gray-400 text-lg">
              ≈ ${usdAmount} USD
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Available:</span>
            <span>{selectedCryptoData?.balance} {selectedCrypto}</span>
          </div>
        </div>
      </div>

      {/* Gas Speed */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Transaction Speed</h3>
        <div className="space-y-2">
          {gasSpeeds.map((speed) => (
            <button
              key={speed.id}
              onClick={() => setGasSpeed(speed.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                gasSpeed === speed.id
                  ? 'bg-blue-600/20 border-blue-500'
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="font-semibold">{speed.name}</p>
                  <p className="text-sm text-gray-400">{speed.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{speed.fee}</p>
                  <p className="text-sm text-gray-400">Network Fee</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <h4 className="font-semibold">Transaction Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Amount:</span>
            <span>{amount} {selectedCrypto}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Network Fee:</span>
            <span>{gasSpeeds.find(s => s.id === gasSpeed)?.fee}</span>
          </div>
          <div className="border-t border-gray-700 pt-2 flex justify-between font-semibold">
            <span>Total:</span>
            <span>{amount} {selectedCrypto}</span>
          </div>
        </div>
      </div>

      {/* Send Button */}
      <button
        onClick={handleSend}
        disabled={!recipientAddress || !amount}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-2xl p-4 font-semibold transition-colors active:scale-95"
      >
        Send {selectedCrypto}
      </button>
    </div>
  );
};

export default SendCrypto;