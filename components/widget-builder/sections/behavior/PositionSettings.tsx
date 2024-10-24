import React from 'react';
import { BehaviorConfig } from '@/types';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ResponsivePositioning } from './ResponsivePositioning';
import { motion } from 'framer-motion';

export const PositionSettings: React.FC<{
  config: BehaviorConfig['position'];
  onChange: (updates: BehaviorConfig['position']) => void;
}> = ({ config, onChange }) => {
  const positions = [
    ['top-left', 'top-center', 'top-right'],
    ['center-left', 'center-center', 'center-right'],
    ['bottom-left', 'bottom-center', 'bottom-right'],
  ];

  return (
    <div className="space-y-6">
      <div className="aspect-video relative border rounded-lg p-4">
        <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full">
          {positions.map((row, i) =>
            row.map((pos, j) => (
              <motion.button
                key={pos}
                className={cn(
                  'rounded-md border-2 transition-colors',
                  isSelectedPosition(pos, config)
                    ? 'border-primary bg-primary/10'
                    : 'border-transparent hover:border-primary/50'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  onChange({
                    vertical: pos.split('-')[0] as any,
                    horizontal: pos.split('-')[1] as any,
                  })
                }
              />
            ))
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Offset X (px)</Label>
          <Slider
            value={[config.offsetX || 0]}
            min={-100}
            max={100}
            step={1}
            onValueChange={([value]) =>
              onChange({ ...config, offsetX: value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Offset Y (px)</Label>
          <Slider
            value={[config.offsetY || 0]}
            min={-100}
            max={100}
            step={1}
            onValueChange={([value]) =>
              onChange({ ...config, offsetY: value })
            }
          />
        </div>

        <ResponsivePositioning config={config} onChange={onChange} />
      </div>
    </div>
  );
};
