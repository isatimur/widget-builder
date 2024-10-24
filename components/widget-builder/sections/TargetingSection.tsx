import React, { useState, useCallback } from 'react';
import { TargetingConfig, TargetingRule } from '@/types';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Users, Globe, Smartphone, Clock, Map, Tag, Database } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { AudiencePreview } from './targeting/AudiencePreview';
import { TargetingInsights } from './targeting/TargetingInsights';
import { RuleCard } from './targeting/RuleCard';

const ruleTypes = {
    pageUrl: {
        icon: Globe,
        label: 'Page URL',
        conditions: ['contains', 'equals', 'starts_with', 'ends_with', 'regex'],
        valueType: 'text',
    },
    device: {
        icon: Smartphone,
        label: 'Device Type',
        conditions: ['is', 'is_not'],
        valueType: 'select',
        options: ['desktop', 'tablet', 'mobile'],
    },
    timeOnSite: {
        icon: Clock,
        label: 'Time on Site',
        conditions: ['greater_than', 'less_than'],
        valueType: 'number',
        unit: 'seconds',
    },
    location: {
        icon: Map,
        label: 'Location',
        conditions: ['country_is', 'country_is_not', 'city_is'],
        valueType: 'location',
    },
    userTrait: {
        icon: Users,
        label: 'User Trait',
        conditions: ['equals', 'contains', 'exists', 'not_exists'],
        valueType: 'text',
    },
    customEvent: {
        icon: Tag,
        label: 'Custom Event',
        conditions: ['occurred', 'not_occurred'],
        valueType: 'event',
    },
    dataLayer: {
        icon: Database,
        label: 'Data Layer',
        conditions: ['equals', 'contains', 'exists'],
        valueType: 'text',
    },
};

export const TargetingSection: React.FC<{
    config: TargetingConfig;
    onChange: (updates: Partial<TargetingConfig>) => void;
}> = ({ config, onChange }) => {
    const [selectedRuleType, setSelectedRuleType] = useState<string | null>(null);

    const addRule = useCallback((type: string) => {
        const newRule: TargetingRule = {
            id: `rule-${Date.now()}`,
            type,
            condition: ruleTypes[type].conditions[0],
            value: '',
            enabled: true,
        };
        onChange({
            rules: [...config.rules, newRule],
        });
        setSelectedRuleType(null);
    }, [config.rules, onChange]);

    const updateRule = useCallback((index: number, updates: Partial<TargetingRule>) => {
        const newRules = [...config.rules];
        newRules[index] = { ...newRules[index], ...updates };
        onChange({ rules: newRules });
    }, [config.rules, onChange]);

    const removeRule = useCallback((index: number) => {
        onChange({
            rules: config.rules.filter((_, i) => i !== index),
        });
    }, [config.rules, onChange]);

    return (
        <Card className="p-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold">Targeting Rules</h3>
                        <p className="text-sm text-muted-foreground">
                            Show your widget to specific audiences based on conditions
                        </p>
                    </div>
                    <Switch
                        checked={config.enabled}
                        onCheckedChange={(enabled) => onChange({ enabled })}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Select
                            value={config.operator}
                            onValueChange={(operator) => onChange({ operator: operator as 'AND' | 'OR' })}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select operator" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="AND">Match ALL conditions</SelectItem>
                                <SelectItem value="OR">Match ANY condition</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <AnimatePresence>
                        {config.rules.map((rule, index) => (
                            <motion.div
                                key={rule.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                            >
                                <RuleCard
                                    rule={rule}
                                    onUpdate={(updates) => {
                                        const newRules = [...config.rules];
                                        newRules[index] = { ...rule, ...updates };
                                        onChange({ rules: newRules });
                                    }}
                                    onDelete={() => {
                                        onChange({
                                            rules: config.rules.filter((_, i) => i !== index),
                                        });
                                    }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(ruleTypes).map(([type, config]) => (
                            <motion.div
                                key={type}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    variant="outline"
                                    className="w-full h-auto p-4 justify-start space-x-3"
                                    onClick={() => addRule(type)}
                                >
                                    <config.icon className="w-5 h-5 text-primary" />
                                    <div className="text-left">
                                        <div className="font-medium">{config.label}</div>
                                        <div className="text-sm text-muted-foreground">
                                            Add {config.label.toLowerCase()} targeting
                                        </div>
                                    </div>
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <AudiencePreview config={config} />
                <TargetingInsights config={config} />
            </div>
        </Card>
    );
};
