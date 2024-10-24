import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TriggerConfig } from '@/types';

interface InactivitySettingsProps {
    config: TriggerConfig;
    onChange: (updates: Partial<TriggerConfig>) => void;
}

export const InactivitySettings: React.FC<InactivitySettingsProps> = ({ config, onChange }) => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Inactivity time (seconds)</Label>
                <Slider
                    value={[config.settings?.inactivityTime || 30]}
                    min={5}
                    max={300}
                    step={5}
                    onValueChange={([value]) =>
                        onChange({
                            settings: { ...config.settings, inactivityTime: value },
                        })
                    }
                />
                <div className="text-sm text-muted-foreground">
                    Widget will appear after {config.settings?.inactivityTime || 30} seconds of inactivity
                </div>
            </div>
        </div>
    );
};