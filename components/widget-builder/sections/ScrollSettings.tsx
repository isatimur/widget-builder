import React from 'react';

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ScrollSettingsProps {
  config: {
    type: 'percentage' | 'pixels';
    value: number;
    direction: 'down' | 'up';
  };
  onChange: (updates: any) => void;
}

export const ScrollSettings: React.FC<ScrollSettingsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Trigger type</Label>
          <Select
            value={config.type}
            onValueChange={(value) => onChange({ type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="pixels">Pixels</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Direction</Label>
          <Select
            value={config.direction}
            onValueChange={(value) => onChange({ direction: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="down">Scroll Down</SelectItem>
              <SelectItem value="up">Scroll Up</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          {config.type === 'percentage' ? 'Scroll percentage' : 'Scroll distance (px)'}
        </Label>
        <Slider
          value={[config.value]}
          min={0}
          max={config.type === 'percentage' ? 100 : 2000}
          step={config.type === 'percentage' ? 1 : 10}
          onValueChange={([value]) => onChange({ value })}
        />
        <div className="text-sm text-muted-foreground">
          Widget will appear after scrolling {config.value}
          {config.type === 'percentage' ? '%' : 'px'} {config.direction}
        </div>
      </div>
    </div>
  );
};