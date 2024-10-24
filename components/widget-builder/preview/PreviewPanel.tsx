import React from 'react';
import { Laptop, Tablet, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useWidgetStore } from '@/store/widgetStore';
import { PreviewWidget } from './PreviewWidget';
import { useWidgetPreview } from '@/hooks/useWidgetPreview';

export const PreviewPanel: React.FC = () => {
  const { currentWidget } = useWidgetStore();
  const { previewDevice, previewScale, setPreviewDevice } = useWidgetPreview();

  return (
    <div className="preview-panel">
      <div className="preview-controls flex justify-center space-x-2 mb-4">
        <Button 
          variant={previewDevice === 'mobile' ? 'default' : 'outline'}
          onClick={() => setPreviewDevice('mobile')}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Mobile
        </Button>
        <Button 
          variant={previewDevice === 'tablet' ? 'default' : 'outline'}
          onClick={() => setPreviewDevice('tablet')}
        >
          <Tablet className="w-4 h-4 mr-2" />
          Tablet
        </Button>
        <Button 
          variant={previewDevice === 'desktop' ? 'default' : 'outline'}
          onClick={() => setPreviewDevice('desktop')}
        >
          <Laptop className="w-4 h-4 mr-2" />
          Desktop
        </Button>
      </div>
      <div className="preview-container overflow-hidden">
        <div
          className="preview-wrapper"
          style={{
            transform: `scale(${previewScale})`,
            transformOrigin: 'top left',
            width: previewDevice === 'mobile' ? '375px' : previewDevice === 'tablet' ? '768px' : '100%',
            height: previewDevice === 'mobile' ? '667px' : previewDevice === 'tablet' ? '1024px' : '100%',
          }}
        >
          <PreviewWidget 
            elements={currentWidget.elements}
            styles={currentWidget.styles}
            behavior={currentWidget.behavior}
            device={previewDevice}
          />
        </div>
      </div>
    </div>
  );
};
