import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, BarChart, PieChart } from '@/components/ui/charts';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Select } from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

interface AnalyticsData {
  views: number;
  interactions: number;
  conversions: number;
  bounces: number;
  timeOnWidget: number;
  deviceBreakdown: Record<string, number>;
  conversionByTime: Record<string, number>;
  abTestResults: ABTestResult[];
}

interface ABTestResult {
  variant: string;
  views: number;
  conversions: number;
  conversionRate: number;
  confidence: number;
}

export const AnalyticsManager: React.FC<{
  widgetId: string;
  dateRange: DateRange;
}> = ({ widgetId, dateRange }) => {
  const { data, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['widget-analytics', widgetId, dateRange],
    queryFn: () => fetchAnalyticsData(widgetId, dateRange),
    refetchInterval: 300000, // 5 minutes
  });

  const [activeMetric, setActiveMetric] = useState<keyof AnalyticsData>('views');
  const [comparisonPeriod, setComparisonPeriod] = useState<'previous' | 'year'>('previous');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Views"
          value={data?.views}
          change={calculateChange(data?.views, historicalData?.views)}
          loading={isLoading}
        />
        <MetricCard
          title="Interactions"
          value={data?.interactions}
          change={calculateChange(data?.interactions, historicalData?.interactions)}
          loading={isLoading}
        />
        <MetricCard
          title="Conversions"
          value={data?.conversions}
          change={calculateChange(data?.conversions, historicalData?.conversions)}
          loading={isLoading}
        />
        <MetricCard
          title="Avg. Time on Widget"
          value={formatTime(data?.timeOnWidget)}
          change={calculateChange(data?.timeOnWidget, historicalData?.timeOnWidget)}
          loading={isLoading}
        />
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Performance Over Time</h3>
          <div className="flex items-center space-x-4">
            <MetricSelector
              value={activeMetric}
              onChange={setActiveMetric}
            />
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
            />
          </div>
        </div>

        <LineChart
          data={data?.[activeMetric]}
          loading={isLoading}
          comparison={comparisonPeriod}
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ABTestingResults
          results={data?.abTestResults}
          loading={isLoading}
        />
        <PerformanceMetrics
          widgetId={widgetId}
          dateRange={dateRange}
        />
      </div>
    </div>
  );
};
