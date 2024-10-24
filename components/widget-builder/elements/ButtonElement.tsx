import React from 'react';
import { WidgetElement, StylesConfig } from '@/types';

interface ButtonElementProps {
  element: WidgetElement;
  styles: StylesConfig;
}

export const ButtonElement: React.FC<ButtonElementProps> = ({ element, styles }) => {
  return (
    <button
      style={{
        ...styles.buttons,
        ...element.settings.styles,
      }}
      onClick={() => {
        // Handle button click action
        console.log('Button clicked:', element.id);
      }}
    >
      {element.content}
    </button>
  );
};
