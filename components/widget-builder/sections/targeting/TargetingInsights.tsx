
import React from 'react';
import { Card } from "@/components/ui/card";
import { TargetingConfig } from '@/types';

interface TargetingInsightsProps {
    config: TargetingConfig;
}

export const TargetingInsights: React.FC<TargetingInsightsProps> = ({ config }) => {
    // This is a placeholder. In a real application, you would generate insights based on the targeting rules.
    const insights = [
        "Your current targeting reaches a broad audience.",
        "Consider adding location-based targeting for more precision.",
        "Time-based targeting could improve engagement rates.",
    ];

    return (
        <Card className="p-4">
            <h4 className="text-sm font-semibold mb-2">Targeting Insights</h4>
            <ul className="list-disc list-inside space-y-2">
                {insights.map((insight, index) => (
                    <li key={index} className="text-sm">{insight}</li>
                ))}
            </ul>
        </Card>
    );
};