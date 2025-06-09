import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Check, CreditCard, Shield, Sparkles, Star, Moon } from 'lucide-react';

interface CartPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
  gender: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  language: string;
  chartStyle: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CartPage: React.FC<CartPageProps> = ({ onBack, onSuccess }) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('astrologyForm');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const verifyPayment = async (paymentData: any) => {
    try {
      console.log('Verifying payment:', paymentData);

      const response = await fetch('/api/payment-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_payment_id: paymentData.razorpay_payment_id,
          razorpay_order_id: paymentData.razorpay_order_id,
          razorpay_signature: paymentData.razorpay_signature,
          order_id: paymentData.razorpay_order_id
        })
      });

      if (!response.ok) {
        throw new Error(`Verification failed with status ${response.status}`);
      }

      const verificationResult = await response.json();
      console.log('Verification result:', verificationResult);

      if (verificationResult.verified || verificationResult.success) {
        localStorage.setItem('paymentSuccess', 'true');
        localStorage.setItem('paymentDetails', JSON.stringify(paymentData));
        onSuccess();
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      alert('Payment verification failed. Please contact support if amount was debited.');
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (!formData || !consentChecked) return;

    setIsProcessing(true);

    try {
      const orderData = {
        ...formData,
        currency: 'INR',
        amount: 500,
        consent: true
      };

      console.log('Sending order data to payments API:', orderData);

      const paymentsResponse = await fetch('/api/astrology-payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      console.log('Payments response status:', paymentsResponse.status);

      if (!paymentsResponse.ok) {
        throw new Error(`Payment initialization failed with status ${paymentsResponse.status}`);
      }

      const paymentsText = await paymentsResponse.text();
      console.log('Payments response text:', paymentsText);

      if (!paymentsText.trim()) {
        throw new Error('Payments endpoint returned empty response');
      }

      let paymentsData;
      try {
        paymentsData = JSON.parse(paymentsText);
        console.log('Payments response data:', paymentsData);
      } catch (jsonError) {
        console.error('Failed to parse payments response as JSON:', paymentsText);
        throw new Error('Payments endpoint returned invalid JSON');
      }

      const order_id = paymentsData.order_id || paymentsData.orderId || paymentsData.id;
      const razorpay_key = paymentsData.razorpay_key || paymentsData.key || paymentsData.razorpay_key_id;

      console.log('Extracted order_id:', order_id);
      console.log('Extracted razorpay_key:', razorpay_key);

      if (!order_id) {
        console.error('Full payments response data:', paymentsData);
        throw new Error('No order ID received from payments endpoint');
      }

      if (!razorpay_key) {
        console.error('Full payments response data:', paymentsData);
        throw new Error('No Razorpay key received from payments endpoint');
      }

      console.log('Initializing Razorpay with order_id:', order_id, 'and key:', razorpay_key);
      
      const razorpay = new window.Razorpay({
        key: razorpay_key,
        amount: 50000,
        currency: 'INR',
        order_id: order_id,
        name: 'Cosmic Astrology Portal',
        description: 'Personalized Cosmic Reading',
        handler: function (response: any) {
          console.log('Payment completed, verifying signature...', response);
          verifyPayment(response);
        },
        prefill: {
          name: formData.name,
          email: formData.email
        },
        theme: {
          color: '#8B5CF6'
        },
        modal: {
          ondismiss: function() {
            console.log('Razorpay modal dismissed');
            setIsProcessing(false);
          }
        }
      });

      console.log('Opening Razorpay modal...');
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      
      if (error instanceof Error) {
        alert(`Payment initialization failed: ${error.message}`);
      } else {
        alert('Payment initialization failed. Please try again.');
      }
    }
  };

  if (!formData) {
    return (
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="cosmic-card rounded-3xl aurora-glow p-8 text-center">
          <Moon className="h-16 w-16 text-purple-400 mx-auto mb-4" />
          <p className="text-purple-200 mb-6">No cosmic data found. Please return and share your celestial coordinates.</p>
          <button
            onClick={onBack}
            className="mystical-btn text-white px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Return to Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto relative z-10">
      <div className="cosmic-card rounded-3xl aurora-glow overflow-hidden">
        {/* Mystical Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-cyan-500/90"></div>
          <div className="relative px-8 py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300 group"
              >
                <ArrowLeft className="h-6 w-6 text-white group-hover:text-cyan-200" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Cosmic Order Summary</h2>
                  <p className="text-purple-100 flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Review your celestial reading before unlocking</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Order Details */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-cyan-500/20"></div>
            <div className="relative p-6 backdrop-blur-sm border border-purple-500/30 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400 rounded-xl cosmic-pulse">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Personalized Cosmic Reading</h3>
                    <p className="text-purple-200">Complete astrological analysis channeled from the universe</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">₹500</p>
                  <p className="text-sm text-purple-300">One-time cosmic unlock</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="cosmic-card rounded-2xl p-6 border border-purple-500/20">
            <h4 className="font-bold text-white mb-6 flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <span>Your Cosmic Coordinates</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-300">Name:</span>
                <span className="text-white font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Email:</span>
                <span className="text-white font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Gender:</span>
                <span className="text-white font-medium">{formData.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Language:</span>
                <span className="text-white font-medium">{formData.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Birth Date:</span>
                <span className="text-white font-medium">{new Date(formData.birthDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Birth Time:</span>
                <span className="text-white font-medium">{formData.birthTime}</span>
              </div>
              <div className="md:col-span-2 flex justify-between">
                <span className="text-purple-300">Birth Place:</span>
                <span className="text-white font-medium">{formData.birthPlace}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Chart Style:</span>
                <span className="text-white font-medium">{formData.chartStyle}</span>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="space-y-4">
            <label className="flex items-start space-x-4 cursor-pointer group">
              <div className="flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-purple-400 rounded bg-transparent"
                />
              </div>
              <div className="text-sm text-purple-200 group-hover:text-white transition-colors">
                I consent to the cosmic processing of my celestial data for the purpose of generating my personalized astrology reading. 
                I understand that my birth coordinates will be used to channel accurate astrological insights from the universe.
              </div>
            </label>
          </div>

          {/* Security Notice */}
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-500/20"></div>
            <div className="relative p-4 border border-green-500/30 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="h-6 w-6 text-green-400" />
                <span className="text-sm font-bold text-green-300">Cosmic Security Seal</span>
              </div>
              <p className="text-sm text-green-200">
                Your payment flows through protected cosmic channels with celestial-level encryption and mystical signature verification.
              </p>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={!consentChecked || isProcessing}
            className="w-full mystical-btn text-white font-bold py-5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 text-lg"
          >
            <CreditCard className="h-6 w-6" />
            <span>{isProcessing ? 'Channeling cosmic energy...' : 'Unlock Cosmic Wisdom ₹500'}</span>
            <Sparkles className="h-6 w-6" />
          </button>

          <p className="text-center text-sm text-purple-300 flex items-center justify-center space-x-2">
            <Star className="h-4 w-4" />
            <span>Your cosmic reading will manifest within 2 celestial hours</span>
            <Star className="h-4 w-4" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;