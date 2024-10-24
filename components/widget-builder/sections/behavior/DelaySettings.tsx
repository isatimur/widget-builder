import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface DelaySettingsProps {
  config: {
    delay: number;
    resetOnClose: boolean;
  };
  onChange: (updates: any) => void;
}

export const DelaySettings: React.FC<DelaySettingsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Delay (seconds)</Label>
        <Slider
          value={[config.delay]}
          min={0}
          max={30}
          step={1}
          onValueChange={([value]) => onChange({ delay: value })}
        />
        <div className="text-sm text-muted-foreground">
          Widget will appear after {config.delay} seconds
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={config.resetOnClose}
          onCheckedChange={(checked) => onChange({ resetOnClose: checked })}
        />
        <Label>Reset delay when widget is closed</Label>
      </div>
    </div>
  );
};
