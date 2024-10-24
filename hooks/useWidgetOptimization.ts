import { useQuery, useMutation } from '@tanstack/react-query';
import { useWidgetStore } from '@/store/widgetStore';
import { useCompletion } from 'ai/react';
import { fetchAnalyticsInsights, calculateAudienceMetrics, generatePerformanceReport, combineOptimizationData } from '@/utils/optimizationUtils';
import { generateOptimizationPrompt } from '@/utils/aiUtils';
import { OptimizationData } from '@/types';

export const useWidgetOptimization = (widgetId: string) => {
  const { currentWidget, actions } = useWidgetStore();
  
  const { completion, handleSubmit } = useCompletion({
    api: '/api/ai/optimize',
    onFinish: (completion) => {
      try {
        const suggestions = JSON.parse(completion);
        processSuggestions(suggestions);
      } catch (error) {
        console.error('Failed to parse AI suggestions:', error);
      }
    }
  });

  const { data: optimizationData, isLoading, error } = useQuery<OptimizationData, Error>({
    queryKey: ['widget-optimization', currentWidget?.id],
    queryFn: async () => {
      if (!currentWidget) {
        throw new Error('No current widget selected');
      }
      const data = await Promise.all([
        fetchAnalyticsInsights(currentWidget.analytics),
        calculateAudienceMetrics(currentWidget.targeting),
        generatePerformanceReport(currentWidget)
      ]);
      return combineOptimizationData(data);
    },
    refetchInterval: 300000, // 5 minutes
    enabled: !!currentWidget?.id, // Only run the query if we have a widget ID
  });

  const optimizeMutation = useMutation({
    mutationFn: async (optimizationData: OptimizationData) => {
      if (!currentWidget) {
        throw new Error('No current widget selected');
      }
      const prompt = generateOptimizationPrompt(currentWidget, optimizationData);
      await handleSubmit(prompt);
    }
  });

  const processSuggestions = (suggestions: any) => {
    // Implement the logic to process AI suggestions
    console.log('Processing suggestions:', suggestions);
    // Update the widget store or perform other actions based on suggestions
  };

  return {
    optimizationData,
    isLoading,
    error,
    optimize: () => optimizeMutation.mutate(optimizationData),
    isOptimizing: optimizeMutation.isLoading
  };
};
