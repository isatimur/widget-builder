import React, { useState } from 'react';
import { BehaviorConfig } from '@/types';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import { TimeRangePicker } from "@/components/ui/time-range-picker";
import { motion, AnimatePresence } from "framer-motion";

interface RecurringScheduleProps {
  config: BehaviorConfig['scheduling'];
  onChange: (updates: Partial<BehaviorConfig['scheduling']>) => void;
}

const weekDays = [
  { value: 'mon', label: 'Monday' },
  { value: 'tue', label: 'Tuesday' },
  { value: 'wed', label: 'Wednesday' },
  { value: 'thu', label: 'Thursday' },
  { value: 'fri', label: 'Friday' },
  { value: 'sat', label: 'Saturday' },
  { value: 'sun', label: 'Sunday' }
];

export const RecurringSchedule: React.FC<RecurringScheduleProps> = ({ config, onChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Recurring Schedule</Label>
            <p className="text-sm text-muted-foreground">
              Set specific days and times for the widget to appear
            </p>
          </div>
          <Switch
            checked={config.recurring?.enabled}
            onCheckedChange={(enabled) => 
              onChange({ 
                recurring: { ...config.recurring, enabled } 
              })
            }
          />
        </div>

        <AnimatePresence>
          {config.recurring?.enabled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-4"
            >
              <WeekdaySelector
                selected={config.recurring.days || []}
                onChange={(days) => 
                  onChange({
                    recurring: { ...config.recurring, days }
                  })
                }
              />

              <TimeRan