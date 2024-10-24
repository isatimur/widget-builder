import React from 'react';
import { useWidgetOptimization } from '@/hooks/useWidgetOptimization';
import { useWidgetStore } from '@/store/widgetStore';
import { WidgetAIAssistant } from './WidgetAIAssistant';

export const EnhancedWidgetAIAssistant: React.FC = () => {
  const { currentWidget, actions } = useWidgetStore();
  const { optimizationData, optimize, isOptimizing } = useWidgetOptimization(currentWidget.id);

  // Reference existing AI Assistant component
  return (
    <WidgetAIAssistant
      currentWidget={currentWidget}
      onApplySuggestion={actions.applyAISuggestion}
      optimizationData={optimizationData}
      onOptimize={optimize}
      isOptimizing={isOptimizing}
    />
  );
};
