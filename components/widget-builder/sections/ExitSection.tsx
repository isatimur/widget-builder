import React from 'react';

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

interface ExitSettingsProps {
    config: {
        sensitivity: number;
        showOnce: boolean;
        resetAfter: number;
    };
    onChange: (updates: any) => void;
}

export const ExitSettings: React.FC<ExitSettingsProps> = ({ config, onChange }) => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Mouse sensitivity (px)</Label>
                <Input
                    type="number"
                    value={config.sensitivity}
                    onChange={(e) => onChange({ sensitivity: parseInt(e.target.value) })}
                    min={0}
                    max={100}
                />
                <div className="text-sm text-muted-foreground">
                    Distance from top of viewport to trigger exit intent
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    checked={config.showOnce}
                    onCheckedChange={(checked) => onChange({ showOnce: checked })}
                />
                <Label>Show only once per session</Label>
            </div>

            {!config.showOnce && (
                <div className="space-y-2">
                    <Label>Reset after (minutes)</Label>
                    <Input
                        type="number"
                        value={config.resetAfter}
                        onChange={(e) => onChange({ resetAfter: parseInt(e.target.value) })}
                        min={1}
                    />
                </div>
            )}
        </div>
    );
};