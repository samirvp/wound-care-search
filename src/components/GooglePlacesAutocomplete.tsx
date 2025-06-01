
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface GooglePlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: { name: string; address: string; zipCode: string }) => void;
  placeholder?: string;
}

// Mock healthcare facilities data
const mockFacilities = [
  {
    name: "Wound Care Center of Excellence",
    address: "123 Medical Plaza, Beverly Hills, CA 90210",
    zipCode: "90210"
  },
  {
    name: "Advanced Wound Healing Institute",
    address: "456 Healthcare Blvd, Los Angeles, CA 90028",
    zipCode: "90028"
  },
  {
    name: "Wound Treatment Specialists",
    address: "789 Wellness Ave, Santa Monica, CA 90401",
    zipCode: "90401"
  },
  {
    name: "Comprehensive Wound Care Clinic",
    address: "321 Recovery St, Pasadena, CA 91101",
    zipCode: "91101"
  },
  {
    name: "Wound Health Medical Center",
    address: "654 Healing Way, Burbank, CA 91502",
    zipCode: "91502"
  },
  {
    name: "Pacific Wound Care Associates",
    address: "987 Ocean View Dr, Malibu, CA 90265",
    zipCode: "90265"
  }
];

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Start typing facility name..."
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredFacilities, setFilteredFacilities] = useState<typeof mockFacilities>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = mockFacilities.filter(facility =>
        facility.name.toLowerCase().includes(value.toLowerCase()) ||
        facility.address.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFacilities(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFacilitySelect = (facility: typeof mockFacilities[0]) => {
    onChange(facility.name);
    onPlaceSelect(facility);
    setShowDropdown(false);
  };

  const handleInputFocus = () => {
    if (value.length > 0 && filteredFacilities.length > 0) {
      setShowDropdown(true);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="pl-12 h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-green-400 transition-colors bg-gray-50"
        />
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            {filteredFacilities.map((facility, index) => (
              <div
                key={index}
                onClick={() => handleFacilitySelect(facility)}
                className="flex items-start space-x-3 p-3 hover:bg-green-50 rounded-lg cursor-pointer transition-colors group"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 group-hover:bg-green-200 transition-colors">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm truncate group-hover:text-green-700 transition-colors">
                    {facility.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {facility.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Powered by Google footer */}
          <div className="border-t border-gray-100 p-3 bg-gray-50 rounded-b-xl">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xs text-gray-500">Powered by</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-semibold text-blue-600">G</span>
                <span className="text-xs font-semibold text-red-500">o</span>
                <span className="text-xs font-semibold text-yellow-500">o</span>
                <span className="text-xs font-semibold text-blue-600">g</span>
                <span className="text-xs font-semibold text-green-500">l</span>
                <span className="text-xs font-semibold text-red-500">e</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GooglePlacesAutocomplete;
