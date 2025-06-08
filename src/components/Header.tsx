import React from 'react';
import { Stars, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative z-20 border-b border-purple-500/20 backdrop-blur-md">
      <div className="cosmic-card border-0 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400 rounded-xl cosmic-pulse">
                <Stars className="h-8 w-8 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Cosmic Astrology Portal
              </h1>
              <p className="text-purple-200/80 text-sm font-light">
                ✨ Unveiling the mysteries of the universe through your stars ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;