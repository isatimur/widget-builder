import React from 'react';
import { motion } from 'framer-motion';
import { ElementRenderer } from '@/components/widget-builder/elements/ElementRenderer';
import { StylesConfig, WidgetElement } from '@/types';

interface PreviewElementsProps {
  elements: WidgetElement[];
  styles: StylesConfig;
  device: string;
}

export const PreviewElements: React.FC<PreviewElementsProps> = ({ elements, styles, device }) => {
  return (
    <>
      {elements.map((element, index) => (
        <motion.div
          key={element.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ElementRenderer
            element={element}
            styles={styles}
            isEditing={false}
          />
        </motion.div>
      ))}
    </>
  );
};
