import React from 'react';
import { WidgetElement } from '@/types';

interface ElementAnalyticsProps {
  element: WidgetElement;
}

export const ElementAnalytics: React.FC<ElementAnalyticsProps> = ({ element }) => {
  // This component would typically integrate with your analytics system
  // For now, we'll just log interactions to the console
  React.useEffect(() => {
    console.log(`Element ${element.id} viewed`);
    return () => {
      console.log(`Element ${element.id} hidden`);
    };
  }, [element.id]);

  return null; // This component doesn't render anything visible
};
