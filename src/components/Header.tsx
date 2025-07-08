
import { useState } from 'react';
import { User, LogIn, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚽</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-800">Match Predictor</h1>
              <p className="text-xs text-gray-500">Rewards</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#matches" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Matches
            </a>
            <a href="#leaderboard" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Leaderboard
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              How it Works
            </a>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-xs text-green-600">125 Points</p>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => setIsLoggedIn(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="space-y-3">
              <a href="#matches" className="block py-2 text-gray-600 hover:text-green-600 font-medium">
                Matches
              </a>
              <a href="#leaderboard" className="block py-2 text-gray-600 hover:text-green-600 font-medium">
                Leaderboard
              </a>
              <a href="#how-it-works" className="block py-2 text-gray-600 hover:text-green-600 font-medium">
                How it Works
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
