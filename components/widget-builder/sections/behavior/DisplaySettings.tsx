import React from 'react';
import { DisplayConfig } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DisplaySettingsProps {
    config: DisplayConfig;
    onChange: (updates: Partial<DisplayConfig>) => void;
}

export const DisplaySettings: React.FC<DisplaySettingsProps> = ({ config, onChange }) => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Position</Label>
                <Select
                    value={config.position}
                    onValueChange={(value) => onChange({ position: value as DisplayConfig['position'] })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Add more settings for animation, frequency, etc. */}
        </div>
    );
};