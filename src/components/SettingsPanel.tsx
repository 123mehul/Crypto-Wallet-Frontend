import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  Bell, 
  Globe, 
  Moon, 
  Sun,
  Smartphone,
  Lock,
  Eye,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [currency, setCurrency] = useState('USD');

  const settingsGroups = [
    {
      title: 'Security',
      items: [
        {
          icon: Shield,
          label: 'Security Center',
          description: 'Manage your security settings',
          action: () => {},
          hasChevron: true
        },
        {
          icon: Key,
          label: 'Recovery Phrase',
          description: 'View and backup your recovery phrase',
          action: () => {},
          hasChevron: true
        },
        {
          icon: Smartphone,
          label: 'Biometric Authentication',
          description: 'Use fingerprint or face ID',
          action: () => setBiometric(!biometric),
          hasToggle: true,
          toggleValue: biometric
        },
        {
          icon: Lock,
          label: 'Change Password',
          description: 'Update your wallet password',
          action: () => {},
          hasChevron: true
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Transaction and price alerts',
          action: () => setNotifications(!notifications),
          hasToggle: true,
          toggleValue: notifications
        },
        {
          icon: Globe,
          label: 'Currency',
          description: 'USD',
          action: () => {},
          hasChevron: true
        },
        {
          icon: darkMode ? Moon : Sun,
          label: 'Dark Mode',
          description: 'Toggle app appearance',
          action: () => setDarkMode(!darkMode),
          hasToggle: true,
          toggleValue: darkMode
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help Center',
          description: 'Get help and support',
          action: () => {},
          hasChevron: true
        },
        {
          icon: Eye,
          label: 'Privacy Policy',
          description: 'Read our privacy policy',
          action: () => {},
          hasChevron: true
        }
      ]
    }
  ];

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-500' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl font-bold">👤</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-gray-400">john.doe@email.com</p>
        </div>
      </div>

      {settingsGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-300">{group.title}</h3>
          <div className="bg-gray-800 rounded-2xl overflow-hidden">
            {group.items.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <div
                  key={itemIndex}
                  className={`p-4 hover:bg-gray-750 transition-colors cursor-pointer active:scale-98 ${
                    itemIndex !== group.items.length - 1 ? 'border-b border-gray-700' : ''
                  }`}
                  onClick={item.action}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-300" />
                      </div>
                      <div>
                        <p className="font-semibold">{item.label}</p>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {item.hasToggle && (
                        <ToggleSwitch 
                          enabled={item.toggleValue || false} 
                          onToggle={item.action}
                        />
                      )}
                      {item.hasChevron && (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Version Info */}
      <div className="bg-gray-800 rounded-2xl p-4">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-400">CryptoWallet</p>
          <p className="text-sm text-gray-500">Version 1.0.0</p>
        </div>
      </div>

      {/* Logout Button */}
      <button className="w-full bg-red-600 hover:bg-red-700 rounded-2xl p-4 font-semibold transition-colors active:scale-95 flex items-center justify-center space-x-2">
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default SettingsPanel;