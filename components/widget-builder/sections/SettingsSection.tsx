import React from 'react';
import { SettingsConfig } from '../types';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from './GeneralSettings';
import { PerformanceSettings } from './PerformanceSettings';
import { AccessibilitySettings } from './AccessibilitySettings';
import { SecuritySettings } from './SecuritySettings';

export const SettingsSection: React.FC<{
    config: SettingsConfig;
    onChange: (updates: Partial<SettingsConfig>) => void;
}> = ({ config, onChange }) => {
    return (
        <Card className="p-6">
            <Tabs defaultValue="general">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <GeneralSettings config={config.general} onChange={(updates) =>
                        onChange({ general: { ...config.general, ...updates } })}
                    />
                </TabsContent>

                <TabsContent value="performance">
                    <PerformanceSettings config={config.performance} onChange={(updates) =>
                        onChange({ performance: { ...config.performance, ...updates } })}
                    />
                </TabsContent>

                <TabsContent value="accessibility">
                    <AccessibilitySettings config={config.accessibility} onChange={(updates) =>
                        onChange({ accessibility: { ...config.accessibility, ...updates } })}
                    />
                </TabsContent>

                <TabsContent value="security">
                    <SecuritySettings config={config.security} onChange={(updates) =>
                        onChange({ security: { ...config.security, ...updates } })}
                    />
                </TabsContent>
            </Tabs>
        </Card>
    );
};
