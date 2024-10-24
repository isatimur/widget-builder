import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface AdvancedTypographyProps {
  config: any;
  onChange: (updates: any) => void;
}

const fontWeights = [
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi-Bold' },
  { value: '700', label: 'Bold' },
];

const textTransforms = [
  { value: 'none', label: 'None' },
  { value: 'uppercase', label: 'Uppercase' },
  { value: 'lowercase', label: 'Lowercase' },
  { value: 'capitalize', label: 'Capitalize' },
];

export const AdvancedTypography: React.FC<AdvancedTypographyProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Font Weight</Label>
        <Select
          value={config.fontWeight || '400'}
          onValueChange={(value) => onChange({ fontWeight: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontWeights.map((weight) => (
              <SelectItem key={weight.value} value={weight.value}>
                {weight.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Letter Spacing (px)</Label>
        <Slider
          value={[config.letterSpacing || 0]}
          min={-2}
          max={10}
          step={0.1}
          onValueChange={([value]) => onChange({ letterSpacing: value })}
        />
      </div>

      <div>
        <Label>Text Transform</Label>
        <Select
          value={config.textTransform || 'none'}
          onValueChange={(value) => onChange({ textTransform: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {textTransforms.map((transform) => (
              <SelectItem key={transform.value} value={transform.value}>
                {transform.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Text Shadow</Label>
        <Input
          value={config.textShadow || ''}
          onChange={(e) => onChange({ textShadow: e.target.value })}
          placeholder="e.g., 1px 1px 2px rgba(0,0,0,0.5)"
        />
      </div>
    </div>
  );
};
