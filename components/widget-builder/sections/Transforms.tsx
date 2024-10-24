import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransformsProps {
  config: any;
  onChange: (updates: any) => void;
}

const transformTypes = [
  { value: 'translate', label: 'Translate' },
  { value: 'rotate', label: 'Rotate' },
  { value: 'scale', label: 'Scale' },
  { value: 'skew', label: 'Skew' },
];

export const Transforms: React.FC<TransformsProps> = ({ config, onChange }) => {
  const updateTransform = (type: string, value: string) => {
    onChange({ ...config, [type]: value });
  };

  return (
    <div className="space-y-4">
      <Label>Transforms</Label>
      {transformTypes.map((type) => (
        <div key={type.value} className="space-y-2">
          <Select
            value={config[type.value] ? type.value : ''}
            onValueChange={(value) => updateTransform(type.value, value ? '0' : '')}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Add ${type.label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={type.value}>{type.label}</SelectItem>
            </SelectContent>
          </Select>
          {config[type.value] !== undefined && (
            <Input
              value={config[type.value]}
              onChange={(e) => updateTransform(type.value, e.target.value)}
              placeholder={`e.g., ${type.value}(10px) or ${type.value}(45deg)`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
