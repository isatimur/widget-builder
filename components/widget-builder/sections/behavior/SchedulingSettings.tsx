import React from 'react';
import { SchedulingConfig } from '@/types';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

interface SchedulingSettingsProps {
  config: SchedulingConfig;
  onChange: (updates: Partial<SchedulingConfig>) => void;
}

export const SchedulingSettings: React.FC<SchedulingSettingsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          checked={config.enabled}
          onCheckedChange={(checked) => onChange({ enabled: checked })}
        />
        <Label>Enable scheduling</Label>
      </div>

      {config.enabled && (
        <>
          <div className="space-y-2">
            <Label>Start Date</Label>
            <DatePicker
              date={config.startDate ? new Date(config.startDate) : undefined}
              onSelect={(date) => onChange({ startDate: date?.toISOString() })}
            />
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <DatePicker
              date={config.endDate ? new Date(config.endDate) : undefined}
              onSelect={(date) => onChange({ endDate: date?.toISOString() })}
            />
          </div>

          {/* Add more settings for timezone, show days, show times, etc. */}
        </>
      )}
    </div>
  );
};