import React from 'react';
import { ElementType } from '@/types';

interface ElementPlaceholderProps {
  type: ElementType;
}

export const ElementPlaceholder: React.FC<ElementPlaceholderProps> = ({ type }) => {
  return (
    <div className="element-placeholder" style={{ padding: '20px', background: '#f0f0f0', borderRadius: '4px' }}>
      <p>Loading {type} element...</p>
    </div>
  );
};
