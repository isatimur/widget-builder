import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MetricSelectorProps {
    selected: string[];
    onChange: (selected: string[]) => void;
    metrics: Record<string, { label: string; description: string; icon: React.ComponentType; color: string }>;
}

export const MetricSelector: React.FC<MetricSelectorProps> = ({ selected, onChange, metrics }) => {
    const toggleMetric = (metric: string) => {
        if (selected.includes(metric)) {
            onChange(selected.filter(m => m !== metric));
        } else {
            onChange([...selected, metric]);
        }
    };

    return (
        <div className="flex space-x-2">
            {Object.entries(metrics).map(([key, metric]) => (
                <TooltipProvider key={key}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={selected.includes(key) ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleMetric(key)}
                                style={{ backgroundColor: selected.includes(key) ? metric.color : undefined }}
                            >
                                <metric.icon className="w-4 h-4 mr-2" />
                                {metric.label}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{metric.description}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    );
};
