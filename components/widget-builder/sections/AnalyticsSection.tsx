import React, { useState } from 'react';
import { AnalyticsConfig } from '@/types';
import { Eye, MousePointer2, CheckCircle2, X } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { MetricSelector } from './targeting/MetricSelector';
import { AnalyticsOverview } from './analytics/AnalyticsOverview';
import { BehaviorAnalytics } from './analytics/BehaviorAnalytics';
import { GoalsManager } from './analytics/GoalsManager';
import { ReportingSettings } from './analytics/ReportingSettings';

const metricDefinitions = {
    views: {
        label: 'Views',
        description: 'Number of times the widget was displayed',
        icon: Eye,
        color: '#4CAF50',
    },
    clicks: {
        label: 'Clicks',
        description: 'Number of interactions with widget elements',
        icon: MousePointer2,
        color: '#2196F3',
    },
    conversions: {
        label: 'Conversions',
        description: 'Number of successful form submissions or goal completions',
        icon: CheckCircle2,
        color: '#9C27B0',
    },
    bounces: {
        label: 'Bounces',
        description: 'Number of users who dismissed the widget',
        icon: X,
        color: '#F44336',
    },
};

export const AnalyticsSection: React.FC<{
    config: AnalyticsConfig;
    onChange: (updates: Partial<AnalyticsConfig>) => void;
}> = ({ config, onChange }) => {
    const [dateRange, setDateRange] = useState({ from: null, to: null });
    const [selectedMetrics, setSelectedMetrics] = useState(['views', 'conversions']);

    return (
        <Card className="p-6">
            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="behavior">Behavior</TabsTrigger>
                    <TabsTrigger value="goals">Goals</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                <div className="mb-6 flex items-center justify-between">
                    <DatePickerWithRange
                        value={dateRange}
                        onChange={(updates) => setDateRange(updates)}
                        presets={[
                            { label: 'Last 7 days', days: 7 },
                            { label: 'Last 30 days', days: 30 },
                            { label: 'This month', period: 'month' },
                        ]}
                    />
                    <MetricSelector
                        selected={selectedMetrics}
                        onChange={setSelectedMetrics}
                        metrics={metricDefinitions}
                    />
                </div>

                <TabsContent value="overview">
                    <AnalyticsOverview
                        metrics={selectedMetrics}
                        dateRange={dateRange}
                        config={config}
                    />
                </TabsContent>

                <TabsContent value="behavior">
                    <BehaviorAnalytics config={config} />
                </TabsContent>

                <TabsContent value="goals">
                    <GoalsManager
                        config={config}
                        onChange={onChange}
                    />
                </TabsContent>

                <TabsContent value="reports">
                    <ReportingSettings
                        config={config}
                        onChange={onChange}
                    />
                </TabsContent>
            </Tabs>
        </Card>
    );
};
