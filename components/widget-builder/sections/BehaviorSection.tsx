import React from 'react';
import { BehaviorConfig } from '@/types';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TriggerSettings } from './behavior/TriggerSettings';
import { DisplaySettings } from './behavior/DisplaySettings';
import { SchedulingSettings } from './behavior/SchedulingSettings';

interface BehaviorSectionProps {
    config: BehaviorConfig;
    onChange: (updates: Partial<BehaviorConfig>) => void;
}

export const BehaviorSection: React.FC<BehaviorSectionProps> = ({ config, onChange }) => {
    return (
        <Card className="p-6">
            <Tabs defaultValue="trigger" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="trigger">Trigger</TabsTrigger>
                    <TabsTrigger value="display">Display</TabsTrigger>
                    <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                </TabsList>

                <TabsContent value="trigger" className="mt-4 space-y-4">
                    <TriggerSettings
                        config={config.trigger}
                        onChange={(updates) => onChange({ trigger: { ...config.trigger, ...updates } })}
                    />
                </TabsContent>

                <TabsContent value="display" className="mt-4 space-y-4">
                    <DisplaySettings
                        config={config.display}
                        onChange={(updates) => onChange({ display: { ...config.display, ...updates } })}
                    />
                </TabsContent>

                <TabsContent value="scheduling" className="mt-4 space-y-4">
                    <SchedulingSettings
                        config={config.scheduling}
                        onChange={(updates) => onChange({ scheduling: { ...config.scheduling, ...updates } })}
                    />
                </TabsContent>
            </Tabs>
        </Card>
    );
};