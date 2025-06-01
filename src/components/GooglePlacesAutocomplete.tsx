
import React, { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface GooglePlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: { name: string; address: string; zipCode: string }) => void;
  placeholder?: string;
}

declare global {
  interface Window {
    google: any;
    initGooglePlaces: () => void;
  }
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Start typing facility name..."
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Google API Key - This should be set as a public environment variable
  const GOOGLE_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY"; // Replace with actual key

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      initializeAutocomplete();
      setIsLoaded(true);
      return;
    }

    // Load Google Maps Places API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&callback=initGooglePlaces`;
    script.async = true;
    script.defer = true;

    // Set up callback
    window.initGooglePlaces = () => {
      initializeAutocomplete();
      setIsLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const initializeAutocomplete = () => {
    if (!inputRef.current || !window.google) return;

    // Create autocomplete instance with healthcare-focused options
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['establishment'],
      fields: ['name', 'formatted_address', 'address_components', 'place_id', 'types'],
      componentRestrictions: { country: 'us' } // Restrict to US
    });

    // Set up place selection handler
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace();
      
      if (!place || !place.name) return;

      // Filter for healthcare-related establishments
      const healthcareTypes = ['hospital', 'doctor', 'health', 'dentist', 'pharmacy', 'physiotherapist'];
      const isHealthcare = place.types?.some((type: string) => 
        healthcareTypes.some(healthType => type.toLowerCase().includes(healthType))
      ) || place.name.toLowerCase().includes('wound') || 
          place.name.toLowerCase().includes('clinic') ||
          place.name.toLowerCase().includes('medical') ||
          place.name.toLowerCase().includes('health');

      // Extract zip code from address components
      let zipCode = '';
      if (place.address_components) {
        const zipComponent = place.address_components.find((component: any) =>
          component.types.includes('postal_code')
        );
        zipCode = zipComponent?.long_name || '';
      }

      // Update parent component
      onChange(place.name);
      onPlaceSelect({
        name: place.name,
        address: place.formatted_address || '',
        zipCode: zipCode
      });
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
      <Input
        ref={inputRef}
        type="text"
        placeholder={isLoaded ? placeholder : "Loading Google Places..."}
        value={value}
        onChange={handleInputChange}
        disabled={!isLoaded}
        className="pl-12 h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-green-400 transition-colors bg-gray-50"
      />
      {!isLoaded && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default GooglePlacesAutocomplete;
