import React from 'react';
import { WidgetElement } from '@/types';
import { Button } from '@/components/ui/button';
import { Trash2, Move, Settings } from 'lucide-react';

interface ElementControlsProps {
  element: WidgetElement;
  onUpdate: (updates: Partial<WidgetElement>) => void;
}

export const ElementControls: React.FC<ElementControlsProps> = ({ element, onUpdate }) => {
  return (
    <div className="element-controls" style={{ position: 'absolute', top: 0, right: 0 }}>
      <Button size="sm" variant="ghost" onClick={() => console.log('Move element')}>
        <Move size={16} />
      </Button>
      <Button size="sm" variant="ghost" onClick={() => console.log('Open settings')}>
        <Settings size={16} />
      </Button>
      <Button size="sm" variant="ghost" onClick={() => onUpdate({ id: element.id, deleted: true })}>
        <Trash2 size={16} />
      </Button>
    </div>
  );
};
