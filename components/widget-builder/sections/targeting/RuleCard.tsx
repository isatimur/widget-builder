import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { X } from 'lucide-react';
import { TargetingRule } from '@/types';

interface RuleCardProps {
    rule: TargetingRule;
    ruleType: any;
    onUpdate: (updates: Partial<TargetingRule>) => void;
    onDelete: () => void;
}

export const RuleCard: React.FC<RuleCardProps> = ({ rule, ruleType, onUpdate, onDelete }) => {
    return (
        <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <ruleType.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{ruleType.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                        checked={rule.enabled}
                        onCheckedChange={(enabled) => onUpdate({ enabled })}
                    />
                    <Button variant="ghost" size="sm" onClick={onDelete}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Select value={rule.condition} onValueChange={(condition) => onUpdate({ condition })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                        {ruleType.conditions.map((condition) => (
                            <SelectItem key={condition} value={condition}>
                                {condition.replace('_', ' ')}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {ruleType.valueType === 'select' ? (
                    <Select value={rule.value} onValueChange={(value) => onUpdate({ value })}>
                        <SelectTrigger className="col-span-2">
                            <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                        <SelectContent>
                            {ruleType.options.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <Input
                        value={rule.value}
                        onChange={(e) => onUpdate({ value: e.target.value })}
                        placeholder={`Enter ${ruleType.label.toLowerCase()}`}
                        className="col-span-2"
                    />
                )}
            </div>
        </Card>
    );
};