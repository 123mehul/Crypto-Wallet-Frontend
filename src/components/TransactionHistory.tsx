import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock, Check, X, Filter } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  status: 'pending' | 'confirmed' | 'failed';
  amount: string;
  currency: string;
  usdValue: string;
  address: string;
  timestamp: string;
  hash: string;
  fee?: string;
}

const TransactionHistory: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'send' | 'receive'>('all');
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'receive',
      status: 'confirmed',
      amount: '0.0234',
      currency: 'BTC',
      usdValue: '$1,053.00',
      address: '1A2b3C4d5E6f7G8h9I0j1K2L3M4N5O6P7Q8R9S',
      timestamp: '2 hours ago',
      hash: '2f8e9d1c3a4b5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c',
      fee: '$0.25'
    },
    {
      id: '2',
      type: 'send',
      status: 'confirmed',
      amount: '1.5678',
      currency: 'ETH',
      usdValue: '$4,389.84',
      address: '0x742D35Cc6b398AaE532D4d40e6c9EF1f8e9C4F7B',
      timestamp: '1 day ago',
      hash: '3g9f0e2d4c5b6a7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',
      fee: '$12.45'
    },
    {
      id: '3',
      type: 'send',
      status: 'pending',
      amount: '250.00',
      currency: 'ADA',
      usdValue: '$110.00',
      address: 'DdzFFzCqrhsyp3fUNNPxAh9xGhUVkqvRPPCNqfH3BYrW5oLg9WmZj4sYKBAmHbT8MFt8oL7pxAhvNhsE1qKnCjPgWvfSoMmVqB8S',
      timestamp: '5 minutes ago',
      hash: '4h0g1f3e5d6c7b8a9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2',
      fee: '$0.18'
    },
    {
      id: '4',
      type: 'receive',
      status: 'confirmed',
      amount: '0.0089',
      currency: 'BTC',
      usdValue: '$400.50',
      address: '1A2b3C4d5E6f7G8h9I0j1K2L3M4N5O6P7Q8R9S',
      timestamp: '3 days ago',
      hash: '5i1h2g4f6e7d8c9b0a1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',
      fee: '$0.15'
    }
  ]);

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Transaction History</h2>
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'send' | 'receive')}
            className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="send">Sent</option>
            <option value="receive">Received</option>
          </select>
          <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-gray-800 rounded-2xl p-4 hover:bg-gray-750 transition-colors cursor-pointer active:scale-98"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'send' 
                    ? 'bg-red-500/20 text-red-500' 
                    : 'bg-green-500/20 text-green-500'
                }`}>
                  {transaction.type === 'send' ? (
                    <ArrowUpRight className="w-5 h-5" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5" />
                  )}
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold capitalize">
                      {transaction.type} {transaction.currency}
                    </p>
                    {getStatusIcon(transaction.status)}
                  </div>
                  <p className="text-sm text-gray-400">
                    {transaction.address.slice(0, 8)}...{transaction.address.slice(-8)}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'send' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {transaction.type === 'send' ? '-' : '+'}
                  {transaction.amount} {transaction.currency}
                </p>
                <p className="text-sm text-gray-400">{transaction.usdValue}</p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{transaction.timestamp}</span>
                <div className="flex items-center space-x-3">
                  <span className={`capitalize ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                  {transaction.fee && (
                    <span className="text-gray-400">Fee: {transaction.fee}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-400">No transactions found</p>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;