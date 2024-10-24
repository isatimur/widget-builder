import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { BehaviorConfig } from '@/types';
import { cn } from "@/lib/utils";
import { Zap, Clock, ArrowDown, LogOut, Coffee } from 'lucide-react';
import { DelaySettings } from './DelaySettings';
import { ScrollSettings } from '../ScrollSettings';
import { ExitSettings } from '../ExitSection';
import { InactivitySettings } from '../InactivitySettings';

const triggerOptions = [
    {
        id: 'immediate',
        label: 'Immediate',
        icon: Zap,
        description: 'Show the widget as soon as the page loads',
    },
    {
        id: 'delay',
        label: 'Time Delay',
        icon: Clock,
        description: 'Wait for a specific amount of time before showing',
        settings: DelaySettings,
    },
    {
        id: 'scroll',
        label: 'Scroll Position',
        icon: ArrowDown,
        description: 'Show when user scrolls to a certain position',
        settings: ScrollSettings,
    },
    {
        id: 'exit',
        label: 'Exit Intent',
        icon: LogOut,
        description: 'Show when user is about to leave the page',
        settings: ExitSettings,
    },
    {
        id: 'inactivity',
        label: 'User Inactivity',
        icon: Coffee,
        description: 'Show after user has been inactive',
        settings: InactivitySettings,
    },
] as const;

export const TriggerSettings: React.FC<{
    config: BehaviorConfig['trigger'];
    onChange: (updates: Partial<BehaviorConfig['trigger']>) => void;
}> = ({ config, onChange }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                {triggerOptions.map((option) => (
                    <motion.div
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Card
                            className={cn(
                                'cursor-pointer p-4 transition-colors',
                                config.type === option.id
                                    ? 'border-primary bg-primary/5'
                                    : 'hover:border-primary/50'
                            )}
                            onClick={() => onChange({ type: option.id })}
                        >
                            <div className="flex items-start space-x-4">
                                <option.icon className="w-5 h-5 text-primary" />
                                <div className="space-y-1">
                                    <h4 className="font-medium">{option.label}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {option.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {config.type !== 'immediate' && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card className="p-4">
                            {React.createElement(
                                triggerOptions.find(opt => opt.id === config.type)?.settings || (() => null),
                                { config, onChange }
                            )}
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};