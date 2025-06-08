import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, User, Mail, Clock, Globe, FileText, Sparkles, Moon } from 'lucide-react';
import PlaceAutocomplete from './PlaceAutocomplete';

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

interface FormPageProps {
  onNext: () => void;
}

const FormPage: React.FC<FormPageProps> = ({ onNext }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    gender: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    language: 'English',
    chartStyle: 'North Indian'
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('astrologyForm');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.birthTime) newErrors.birthTime = 'Birth time is required';
    if (!formData.birthPlace.trim()) newErrors.birthPlace = 'Birth place is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Save to localStorage
    localStorage.setItem('astrologyForm', JSON.stringify(formData));
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    onNext();
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto relative z-10">
      <div className="cosmic-card rounded-3xl aurora-glow overflow-hidden">
        {/* Mystical Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-cyan-500/90"></div>
          <div className="relative px-8 py-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Moon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Your Cosmic Blueprint</h2>
                <p className="text-purple-100 flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Share your celestial coordinates to unlock your destiny</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Name */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-purple-200 mb-3">
              <User className="inline h-5 w-5 mr-2 text-cyan-400" />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-6 py-4 rounded-xl cosmic-input text-white placeholder-purple-300 transition-all duration-300 ${
                errors.name ? 'border-pink-400 bg-pink-900/20' : ''
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-pink-400 text-sm mt-2 flex items-center space-x-1">
              <span>✦</span><span>{errors.name}</span>
            </p>}
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-purple-200 mb-3">
              <Mail className="inline h-5 w-5 mr-2 text-cyan-400" />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-6 py-4 rounded-xl cosmic-input text-white placeholder-purple-300 transition-all duration-300 ${
                errors.email ? 'border-pink-400 bg-pink-900/20' : ''
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-pink-400 text-sm mt-2 flex items-center space-x-1">
              <span>✦</span><span>{errors.email}</span>
            </p>}
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-purple-200 mb-3">
              <Sparkles className="inline h-5 w-5 mr-2 text-cyan-400" />
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className={`w-full px-6 py-4 rounded-xl cosmic-input text-white transition-all duration-300 ${
                errors.gender ? 'border-pink-400 bg-pink-900/20' : ''
              }`}
            >
              <option value="" className="bg-slate-800">Select Gender</option>
              <option value="Male" className="bg-slate-800">Male</option>
              <option value="Female" className="bg-slate-800">Female</option>
            </select>
            {errors.gender && <p className="text-pink-400 text-sm mt-2 flex items-center space-x-1">
              <span>✦</span><span>{errors.gender}</span>
            </p>}
          </div>

          {/* Birth Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-purple-200 mb-3">
                <Calendar className="inline h-5 w-5 mr-2 text-cyan-400" />
                Birth Date
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                className={`w-full px-6 py-4 rounded-xl cosmic-input text-white transition-all duration-300 ${
                  errors.birthDate ? 'border-pink-400 bg-pink-900/20' : ''
                }`}
              />
              {errors.birthDate && <p className="text-pink-400 text-sm mt-2 flex items-center space-x-1">
                <span>✦</span><span>{errors.birthDate}</span>
              </p>}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-purple-200 mb-3">
                <Clock className="inline h-5 w-5 mr-2 text-cyan-400" />
                Birth Time
              </label>
              <input
                type="time"
                value={formData.birthTime}
                onChange={(e) => handleInputChange('birthTime', e.target.value)}
                className={`w-full px-6 py-4 rounded-xl cosmic-input text-white transition-all duration-300 ${
                  errors.birthTime ? 'border-pink-400 bg-pink-900/20' : ''
                }`}
              />
              {errors.birthTime && <p className="text-pink-400 text-sm mt-2 flex items-center space-x-1">
                <span>✦</span><span>{errors.birthTime}</span>
              </p>}
            </div>
          </div>

          {/* Birth Place */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-purple-200 mb-3">
              <MapPin className="inline h-5 w-5 mr-2 text-cyan-400" />
              Birth Place
            </label>
            <PlaceAutocomplete
              value={formData.birthPlace}
              onChange={(value) => handleInputChange('birthPlace', value)}
              error={errors.birthPlace}
            />
            {errors.birthPlace && <p className="text-pink-400 text-sm mt-2 flex items-center space-x-1">
              <span>✦</span><span>{errors.birthPlace}</span>
            </p>}
          </div>

          {/* Language and Chart Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-purple-200 mb-3">
                <Globe className="inline h-5 w-5 mr-2 text-cyan-400" />
                Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full px-6 py-4 rounded-xl cosmic-input text-white transition-all duration-300"
              >
                <option value="English" className="bg-slate-800">English</option>
                <option value="Hindi" className="bg-slate-800">Hindi</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-purple-200 mb-3">
                <FileText className="inline h-5 w-5 mr-2 text-cyan-400" />
                Chart Style
              </label>
              <select
                value={formData.chartStyle}
                onChange={(e) => handleInputChange('chartStyle', e.target.value)}
                className="w-full px-6 py-4 rounded-xl cosmic-input text-white transition-all duration-300"
              >
                <option value="North Indian" className="bg-slate-800">North Indian</option>
                <option value="South Indian" className="bg-slate-800">South Indian</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mystical-btn text-white font-bold py-5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 text-lg"
          >
            <Sparkles className="h-6 w-6" />
            <span>{isSubmitting ? 'Channeling cosmic energy...' : 'Enter the Cosmic Realm'}</span>
            <Sparkles className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;