import React from 'react';
import { XCircle, RefreshCw, ArrowLeft, AlertTriangle, Sparkles, Star, Moon, Zap } from 'lucide-react';

interface FailurePageProps {
  onRetry: () => void;
  onNewOrder: () => void;
}

const FailurePage: React.FC<FailurePageProps> = ({ onRetry, onNewOrder }) => {
  const handleNewOrder = () => {
    localStorage.removeItem('astrologyForm');
    localStorage.removeItem('paymentSuccess');
    localStorage.removeItem('paymentDetails');
    onNewOrder();
  };

  return (
    <div className="max-w-2xl mx-auto relative z-10">
      <div className="cosmic-card rounded-3xl aurora-glow overflow-hidden">
        {/* Mystical Failure Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/90 via-pink-500/90 to-purple-600/90"></div>
          <div className="relative px-8 py-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="p-6 bg-white/20 rounded-full backdrop-blur-sm cosmic-pulse">
                  <XCircle className="h-20 w-20 text-white" />
                </div>
                <AlertTriangle className="absolute -top-2 -right-2 h-8 w-8 text-red-200 animate-pulse" />
                <Star className="absolute -bottom-2 -left-2 h-6 w-6 text-pink-200 animate-pulse" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">Cosmic Disruption Detected</h2>
            <p className="text-red-100 text-lg flex items-center justify-center space-x-2">
              <Moon className="h-5 w-5" />
              <span>The cosmic energies encountered an interference</span>
              <Moon className="h-5 w-5" />
            </p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Failure Message */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
              <Zap className="h-6 w-6 text-red-400" />
              <span>Payment Verification Failed</span>
              <Zap className="h-6 w-6 text-red-400" />
            </h3>
            <p className="text-purple-200 leading-relaxed">
              The cosmic payment channels experienced a disruption during verification. This could be due to a 
              temporary interference in the celestial network or a mismatch in the mystical signatures. 
              Your payment may still be processing in the cosmic realm.
            </p>
          </div>

          {/* What Happened */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-pink-500/20 to-purple-500/20"></div>
            <div className="relative p-6 backdrop-blur-sm border border-red-500/30 rounded-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-4 bg-gradient-to-br from-red-600 via-pink-500 to-purple-500 rounded-xl cosmic-pulse">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">What Happened?</h4>
                  <p className="text-red-300">Cosmic signature verification failed</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-purple-200">
                <p>• The payment signature didn't match our cosmic verification system</p>
                <p>• There might be a temporary disruption in the celestial payment channels</p>
                <p>• Your bank account may or may not have been charged</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="cosmic-card rounded-2xl p-6 border border-purple-500/20">
            <h4 className="font-bold text-white mb-6 flex items-center space-x-2">
              <Star className="h-6 w-6 text-cyan-400" />
              <span>Cosmic Recovery Options:</span>
            </h4>
            <div className="space-y-4">
              {[
                'Check your bank statement for any charges',
                'Wait a few minutes and try the payment again',
                'Contact your bank if amount was debited',
                'Reach out to our cosmic support team for assistance',
                'Try using a different payment method'
              ].map((step, index) => (
                <div key={index} className="flex items-center space-x-4 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-purple-200 group-hover:text-white transition-colors">{step}</span>
                  <Sparkles className="h-4 w-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Support Notice */}
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-500/20"></div>
            <div className="relative p-4 border border-yellow-500/30 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <span className="text-sm font-bold text-yellow-300">Important Notice</span>
              </div>
              <p className="text-sm text-yellow-200">
                If your account was charged but the verification failed, please contact our cosmic support team immediately. 
                We will help resolve the cosmic interference and ensure you receive your reading.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onRetry}
              className="flex-1 mystical-btn text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-3"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Retry Cosmic Payment</span>
              <Sparkles className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleNewOrder}
              className="flex-1 bg-purple-800/50 border border-purple-500/50 text-purple-200 font-semibold py-4 rounded-xl hover:bg-purple-700/50 hover:border-purple-400/50 hover:text-white transition-all duration-300 flex items-center justify-center space-x-3 backdrop-blur-sm"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Start New Reading</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-purple-300 flex items-center justify-center space-x-2">
              <Star className="h-4 w-4" />
              <span>The cosmic energies are always working to align your path</span>
              <Star className="h-4 w-4" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailurePage;