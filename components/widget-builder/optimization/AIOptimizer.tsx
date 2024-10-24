import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useCompletion } from 'ai/react';
import { useQuery } from '@tanstack/react-query';

interface OptimizationMetric {
  name: string;
  value: number;
  trend: number;
  recommendation?: string;
}

interface OptimizationSuggestion {
  id: string;
  type: 'content' | 'design' | 'timing' | 'targeting';
  confidence: number;
  impact: number;
  changes: Partial<WidgetConfig>;
  explanation: string;
}

export const AIOptimizer: React.FC<{
  widgetId: string;
  onApplyOptimization: (changes: Partial<WidgetConfig>) => void;
}> = ({ widgetId, onApplyOptimization }) => {
  const [optimizationStatus, setOptimizationStatus] = useState<'idle' | 'learning' | 'optimizing' | 'complete'>('idle');
  const [currentMetrics, setCurrentMetrics] = useState<OptimizationMetric[]>([]);
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);

  const { completion, handleSubmit } = useCompletion({
    api: '/api/ai/optimize-widget',
    onFinish: (result) => {
      const optimizations = JSON.parse(result);
      setSuggestions(optimizations);
      setOptimizationStatus('complete');
    },
  });

  const { data: performanceData } = useQuery(
    ['widget-performance', widgetId],
    () => fetchWidgetPerformance(widgetId),
    {
      refetchInterval: 60000, // 1 minute
    }
  );

  useEffect(() => {
    if (performanceData) {
      const metrics = analyzePerformance(performanceData);
      setCurrentMetrics(metrics);
    }
  }, [performanceData]);

  const startOptimization = async () => {
    setOptimizationStatus('learning');
    const trainingData = await collectTrainingData(widgetId);
    const model = await trainModel(trainingData);
    
    setOptimizationStatus('optimizing');
    handleSubmit({
      model,
      metrics: currentMetrics,
      constraints: getOptimizationConstraints(),
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">AI Optimization</h3>
          <Button
            onClick={startOptimization}
            disabled={optimizationStatus !== 'idle'}
          >
            Start Optimization
          </Button>
        </div>

        <OptimizationProgress
          status={optimizationStatus}
          metrics={currentMetrics}
        />

        <AnimatePresence>
          {suggestions.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <OptimizationSuggestionCard
                suggestion={suggestion}
                onApply={() => onApplyOptimization(suggestion.changes)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <PerformanceMetrics
          metrics={currentMetrics}
          suggestions={suggestions}
        />
      </div>
    </Card>
  );
};