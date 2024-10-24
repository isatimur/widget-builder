import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CustomCSSProps {
  config: string;
  onChange: (css: string) => void;
}

export const CustomCSS: React.FC<CustomCSSProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-2">
      <Label>Custom CSS</Label>
      <Textarea
        value={config}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your custom CSS here..."
        rows={10}
      />
    </div>
  );
};
