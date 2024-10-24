import { useState, useCallback, useEffect } from 'react';
import { useWidgetStore } from '@/store/widgetStore';

type PreviewDevice = 'mobile' | 'tablet' | 'desktop';

export const useWidgetPreview = () => {
  const { currentWidget } = useWidgetStore();
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewScale, setPreviewScale] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const deviceDimensions = {
    desktop: { width: 1200, height: 800 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 667 },
  };

  const updatePreviewScale = useCallback(() => {
    const containerWidth = 300; // Preview container width
    const deviceWidth = deviceDimensions[previewDevice].width;
    setPreviewScale(Math.min(1, containerWidth / deviceWidth));
  }, [previewDevice]);

  useEffect(() => {
    updatePreviewScale();
    window.addEventListener('resize', updatePreviewScale);
    return () => window.removeEventListener('resize', updatePreviewScale);
  }, [updatePreviewScale]);

  const generatePreviewHTML = useCallback(() => {
    // Generate the widget HTML based on current state
    const { elements, styles } = currentWidget;
    // Implementation details...
  }, [currentWidget]);

  return {
    previewDevice,
    setPreviewDevice,
    previewScale,
    isAnimating,
    setIsAnimating,
    generatePreviewHTML,
  };
};
