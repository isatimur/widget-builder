import React, { useEffect, useRef } from 'react';
import { useWidgetRenderer } from '@/hooks/useWidgetRenderer';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

export const LivePreview: React.FC<{
  widget: any;
  device: 'desktop' | 'tablet' | 'mobile';
  scale?: number;
}> = ({ widget, device, scale = 1 }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const controls = useAnimation();
  const { renderWidget, previewError } = useWidgetRenderer();
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  useEffect(() => {
    if (frameRef.current) {
      const preview = renderWidget(widget, device);
      updatePreviewFrame(frameRef.current, preview);
    }
  }, [widget, device]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="preview-container"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left'
      }}
    >
      {previewError ? (
        <PreviewError error={previewError} />
      ) : (
        <iframe
          ref={frameRef}
          className="preview-frame"
          title="Widget Preview"
          sandbox="allow-scripts"
          srcDoc={getPreviewTemplate()}
        />
      )}
      
      <PreviewControls
        device={device}
        scale={scale}
        widget={widget}
      />
    </motion.div>
  );
};
