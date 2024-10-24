import { useCallback } from 'react';
import { WidgetElement } from '@/types';

export const useElementInteractions = (
  element: WidgetElement,
  onUpdate?: (updates: Partial<WidgetElement>) => void
) => {
  const handleInteraction = useCallback((interactionType: 'click' | 'hover') => {
    console.log(`Element ${element.id} ${interactionType}ed`);
    
    // You can add more complex interaction handling here
    // For example, updating analytics or triggering specific actions

    if (onUpdate) {
      onUpdate({
        id: element.id,
        lastInteraction: {
          type: interactionType,
          timestamp: new Date().toISOString(),
        },
      });
    }
  }, [element.id, onUpdate]);

  return { handleInteraction };
};

