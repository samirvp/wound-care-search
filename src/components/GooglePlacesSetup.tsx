
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Key, Shield, DollarSign } from "lucide-react";

const GooglePlacesSetup = () => {
  return (
    <Card className="p-6 bg-blue-50 border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
        <Key className="w-5 h-5 mr-2" />
        Google Places API Setup Required
      </h3>
      
      <div className="space-y-4 text-sm text-blue-700">
        <p>To enable smart facility autocomplete, you'll need to set up Google Places API:</p>
        
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <span className="font-semibold">1.</span>
            <div>
              <p>Go to Google Cloud Console and create a new project</p>
              <Button variant="outline" size="sm" className="mt-1" asChild>
                <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">
                  Open Google Cloud Console <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <span className="font-semibold">2.</span>
            <p>Enable the "Places API" in your project</p>
          </div>
          
          <div className="flex items-start space-x-2">
            <span className="font-semibold">3.</span>
            <p>Create an API key and replace "YOUR_GOOGLE_PLACES_API_KEY" in the code</p>
          </div>
          
          <div className="flex items-start space-x-2">
            <span className="font-semibold">4.</span>
            <p>Restrict the API key to your domain for security</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-blue-200">
          <h4 className="font-semibold flex items-center mb-2">
            <DollarSign className="w-4 h-4 mr-1" />
            Pricing Information
          </h4>
          <ul className="text-xs space-y-1">
            <li>• $200 free credits per month (≈100,000 autocomplete requests)</li>
            <li>• $2.83 per 1,000 requests after free tier</li>
            <li>• Most small businesses stay within free tier</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-3 border border-blue-200">
          <h4 className="font-semibold flex items-center mb-2">
            <Shield className="w-4 h-4 mr-1" />
            Security Best Practices
          </h4>
          <ul className="text-xs space-y-1">
            <li>• Restrict API key to your domain only</li>
            <li>• Enable only Places API service</li>
            <li>• Monitor usage in Google Cloud Console</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default GooglePlacesSetup;
