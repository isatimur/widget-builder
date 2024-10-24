import React from 'react';
import { BehaviorConfig } from '../../types';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface BlackoutDatesProps {
  config: BehaviorConfig['scheduling'];
  onChange: (updates: Partial<BehaviorConfig['scheduling']>) => void;
}

export const BlackoutDates: React.FC<BlackoutDatesProps> = ({ config, onChange }) => {
  const addBlackoutDate = () => {
    onChange({
      blackoutDates: [...(config.blackoutDates || []), { start: null, end: null }]
    });
  };

  const removeBlackoutDate = (index: number) => {
    const newDates = [...(config.blackoutDates || [])];
    newDates.splice(index, 1);
    onChange({ blackoutDates: newDates });
  };

  const updateBlackoutDate = (index: number, updates: Partial<{ start: Date; end: Date }>) => {
    const newDates = [...(config.blackoutDates || [])];
    newDates[index] = { ...newDates[index], ...updates };
    onChange({ blackoutDates: newDates });
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Blackout Dates</Label>
            <p className="text-sm text-muted-foreground">
              Specify dates when the widget should not be shown
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={addBlackoutDate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Date Range
          </Button>
        </div>

        <AnimatePresence>
          {config.blackoutDates?.map((date, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-4"
            >
              <DatePicker
                value={date.start}
                onChange={(start) => updateBlackoutDate(index, { start })}
              />
              <DatePicker
                value={date.end}
                onChange={(end) => updateBlackoutDate(index, { end })}
              />
              <Button variant="outline" size="sm" onClick={() => removeBlackoutDate(index)}>
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
};
