import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface AdvancedEffectsProps {
  config: any;
  onChange: (updates: any) => void;
}

const transitionEasings = [
  { value: 'linear', label: 'Linear' },
  { value: 'ease', label: 'Ease' },
  { value: 'ease-in', label: 'Ease In' },
  { value: 'ease-out', label: 'Ease Out' },
  { value: 'ease-in-out', label: 'Ease In Out' },
];

export const AdvancedEffects: React.FC<AdvancedEffectsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Box Shadow</Label>
        <Input
          value={config.boxShadow || ''}
          onChange={(e) => onChange({ boxShadow: e.target.value })}
          placeholder="e.g., 0 4px 6px rgba(0, 0, 0, 0.1)"
        />
      </div>

      <div>
        <Label>Opacity</Label>
        <Slider
          value={[config.opacity || 1]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={([value]) => onChange({ opacity: value })}
        />
      </div>

      <div>
        <Label>Transition Duration (ms)</Label>
        <Input
          type="number"
          value={config.transitionDuration || 300}
          onChange={(e) => onChange({ transitionDuration: Number(e.target.value) })}
        />
      </div>

      <div>
        <Label>Transition Easing</Label>
        <Select
          value={config.transitionEasing || 'ease'}
          onValueChange={(value) => onChange({ transitionEasing: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {transitionEasings.map((easing) => (
              <SelectItem key={easing.value} value={easing.value}>
                {easing.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Filter</Label>
        <Input
          value={config.filter || ''}
          onChange={(e) => onChange({ filter: e.target.value })}
          placeholder="e.g., blur(5px) brightness(0.8)"
        />
      </div>
    </div>
  );
};
