import React from 'react';
import { CheckCircle, Mail, Clock, Download, ArrowRight, Sparkles, Star, Moon, Zap } from 'lucide-react';

interface SuccessPageProps {
  onNewOrder: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onNewOrder }) => {
  const handleNewOrder = () => {
    localStorage.removeItem('astrologyForm');
    localStorage.removeItem('paymentSuccess');
    onNewOrder();
  };

  const handleDownloadReceipt = () => {
    const receiptData = {
      orderDate: new Date().toLocaleDateString(),
      amount: '₹500',
      service: 'Personalized Cosmic Reading',
      status: 'Cosmic Energy Channeled'
    };
    
    const receiptText = `
✨ COSMIC ASTROLOGY PORTAL ✨
================================
Order Date: ${receiptData.orderDate}
Service: ${receiptData.service}
Amount: ${receiptData.amount}
Status: ${receiptData.status}

🌟 Thank you for your cosmic order! 🌟
Your personalized reading will manifest within 2 celestial hours.

May the stars guide your path! ✨
    `;
    
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cosmic-receipt-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto relative z-10">
      <div className="cosmic-card rounded-3xl aurora-glow overflow-hidden">
        {/* Mystical Success Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/90 via-emerald-400/90 to-cyan-500/90"></div>
          <div className="relative px-8 py-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="p-6 bg-white/20 rounded-full backdrop-blur-sm cosmic-pulse">
                  <CheckCircle className="h-20 w-20 text-white" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-cyan-200 animate-pulse" />
                <Star className="absolute -bottom-2 -left-2 h-6 w-6 text-green-200 animate-pulse" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">Cosmic Energy Channeled!</h2>
            <p className="text-green-100 text-lg flex items-center justify-center space-x-2">
              <Moon className="h-5 w-5" />
              <span>Your celestial reading is being woven by the universe</span>
              <Moon className="h-5 w-5" />
            </p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Success Message */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
              <Zap className="h-6 w-6 text-cyan-400" />
              <span>Thank you, cosmic seeker!</span>
              <Zap className="h-6 w-6 text-cyan-400" />
            </h3>
            <p className="text-purple-200 leading-relaxed">
              The cosmic energies have received your celestial coordinates and your personalized astrology reading is now being 
              channeled by our expert cosmic interpreters. You will receive profound insights about your soul's journey, 
              destiny patterns, relationship harmonies, and future cosmic alignments.
            </p>
          </div>

          {/* Delivery Information */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-500/20 to-pink-500/20"></div>
            <div className="relative p-6 backdrop-blur-sm border border-blue-500/30 rounded-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-4 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 rounded-xl cosmic-pulse">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Cosmic Manifestation Timeline</h4>
                  <p className="text-cyan-300 font-semibold text-lg">Within 2 celestial hours</p>
                </div>
              </div>
              <p className="text-purple-200 text-sm">
                Your complete cosmic reading will materialize in your email realm. 
                Please check both your primary inbox and the mystical spam dimensions.
              </p>
            </div>
          </div>

          {/* What's Included */}
          <div className="cosmic-card rounded-2xl p-6 border border-purple-500/20">
            <h4 className="font-bold text-white mb-6 flex items-center space-x-2">
              <Star className="h-6 w-6 text-cyan-400" />
              <span>Your Cosmic Reading Includes:</span>
            </h4>
            <div className="space-y-4">
              {[
                'Detailed celestial birth chart interpretation',
                'Soul personality traits and cosmic characteristics',
                'Career and abundance manifestation insights',
                'Love and relationship cosmic harmonies',
                'Health and wellness cosmic guidance',
                'Lucky cosmic numbers, colors, and mystical gemstones',
                'Favorable cosmic time periods and future predictions'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-4 group">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-purple-200 group-hover:text-white transition-colors">{feature}</span>
                  <Sparkles className="h-4 w-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-500/20"></div>
            <div className="relative p-4 border border-yellow-500/30 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-2">
                <Mail className="h-6 w-6 text-yellow-400" />
                <span className="text-sm font-bold text-yellow-300">Need Cosmic Assistance?</span>
              </div>
              <p className="text-sm text-yellow-200">
                If your cosmic reading doesn't manifest within 2 celestial hours or you need guidance, 
                please contact our cosmic support guardians.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleNewOrder}
              className="flex-1 mystical-btn text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-3"
            >
              <Sparkles className="h-5 w-5" />
              <span>Channel Another Reading</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleDownloadReceipt}
              className="flex-1 bg-purple-800/50 border border-purple-500/50 text-purple-200 font-semibold py-4 rounded-xl hover:bg-purple-700/50 hover:border-purple-400/50 hover:text-white transition-all duration-300 flex items-center justify-center space-x-3 backdrop-blur-sm"
            >
              <Download className="h-5 w-5" />
              <span>Download Cosmic Receipt</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-purple-300 flex items-center justify-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Cosmic confirmation and receipt have been sent to your email realm</span>
              <Star className="h-4 w-4" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;