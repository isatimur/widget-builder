import React from 'react';
import { Card } from "@/components/ui/card";
import { TargetingConfig } from '@/types';
import { formatNumber } from '@/lib/utils';


interface AudiencePreviewProps {
    config: TargetingConfig;
}

export const AudiencePreview: React.FC<AudiencePreviewProps> = ({ config }) => {
    // This is a placeholder. In a real application, you would calculate these values based on the targeting rules.
    const audienceSize = 1000000;
    const totalAudience = 10000000;
    const percentage = (audienceSize / totalAudience) * 100;

    return (
        <Card className="p-4">
            <h4 className="text-sm font-semibold mb-2">Audience Preview</h4>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-2xl font-bold">{formatNumber(audienceSize)}</p>
                    <p className="text-sm text-muted-foreground">Estimated audience size</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold">{percentage.toFixed(1)}%</p>
                    <p className="text-sm text-muted-foreground">of total audience</p>
                </div>
            </div>
        </Card>
    );
};