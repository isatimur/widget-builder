import React from 'react';
import { WidgetElement, StylesConfig } from '@/types';

interface ImageElementProps {
  element: WidgetElement;
  styles: StylesConfig;
}

export const ImageElement: React.FC<ImageElementProps> = ({ element, styles }) => {
  return (
    <img
      src={element.content}
      alt={element.settings.alt || ''}
      style={{
        ...styles.images,
        ...element.settings.styles,
      }}
    />
  );
};
