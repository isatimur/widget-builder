import React from 'react';
import { WidgetElement, StylesConfig } from '@/types';

interface TextElementProps {
    element: WidgetElement;
    styles: StylesConfig;
}

export const TextElement: React.FC<TextElementProps> = ({ element, styles }) => {
    return (
        <p style={{
            ...styles.typography,
            ...element.settings.styles,
        }}>
            {element.content}
        </p>
    );
};
