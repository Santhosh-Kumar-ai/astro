import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, AlertCircle, Sparkles } from 'lucide-react';

interface PlaceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

interface Place {
  description: string;
}

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({ value, onChange, error }) => {
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const searchPlaces = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      setApiError(null);
      return;
    }

    setIsLoading(true);
    setApiError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('/api/places-autocomplete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        
        let places: Place[] = [];
        
        if (Array.isArray(data) && data.length > 0 && data[0].predictions) {
          places = data[0].predictions;
        }
        else if (data.predictions && Array.isArray(data.predictions)) {
          places = data.predictions;
        }
        else if (Array.isArray(data)) {
          places = data;
        }
        else if (data.results && Array.isArray(data.results)) {
          places = data.results;
        } else if (data.places && Array.isArray(data.places)) {
          places = data.places;
        }
        
        const formattedPlaces = places.map(place => {
          if (typeof place === 'string') {
            return { description: place };
          } else if (place.description) {
            return place;
          } else if (place.name) {
            return { description: place.name };
          } else if (place.formatted_address) {
            return { description: place.formatted_address };
          } else {
            return { description: String(place) };
          }
        });
        
        setSuggestions(formattedPlaces);
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
      setSuggestions([]);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setApiError('Request timed out. Please try again.');
        } else {
          setApiError('Unable to load suggestions. You can still type manually.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        searchPlaces(value);
      } else {
        setApiError(null);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(true);
    if (newValue.length < 3) {
      setApiError(null);
    }
  };

  const handleSuggestionClick = (suggestion: Place) => {
    onChange(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);
    setApiError(null);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (value.length >= 3 && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className={`w-full px-6 py-4 pl-14 rounded-xl cosmic-input text-white placeholder-purple-300 transition-all duration-300 ${
            error ? 'border-pink-400 bg-pink-900/20' : ''
          }`}
          placeholder="Start typing your birth place..."
        />
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-cyan-400 border-t-transparent"></div>
          ) : (
            <MapPin className="h-5 w-5 text-cyan-400" />
          )}
        </div>
      </div>

      {/* API Error Message */}
      {apiError && (
        <div className="mt-3 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-xl backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <span className="text-sm text-yellow-200">{apiError}</span>
          </div>
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-2 cosmic-card rounded-xl border border-purple-500/30 max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-6 py-4 text-left hover:bg-purple-600/20 focus:bg-purple-600/20 focus:outline-none border-b border-purple-500/20 last:border-b-0 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0 group-hover:text-pink-400 transition-colors" />
                <span className="text-purple-100 truncate group-hover:text-white transition-colors">{suggestion.description}</span>
                <Sparkles className="h-3 w-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaceAutocomplete;