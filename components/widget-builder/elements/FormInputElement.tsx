import React from 'react';
import { WidgetElement, StylesConfig } from '@/types';

interface FormInputElementProps {
  element: WidgetElement;
  styles: StylesConfig;
}

export const FormInputElement: React.FC<FormInputElementProps> = ({ element, styles }) => {
  return (
    <input
      type={element.settings.inputType || 'text'}
      placeholder={element.settings.placeholder || ''}
      style={{
        ...styles.inputs,
        ...element.settings.styles,
      }}
      onChange={(e) => {
        // Handle input change
        console.log('Input changed:', e.target.value);
      }}
    />
  );
};
