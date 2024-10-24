import React, { useState } from 'react';
import { TargetingConfig } from '@/types';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const targetingConditions = {
    url: {
        operators: ['contains', 'equals', 'starts_with', 'ends_with', 'regex'],
        inputType: 'text',
        validation: (value: string) => {
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        }
    },
    device: {
        operators: ['is', 'is_not'],
        inputType: 'select',
        options: ['desktop', 'tablet', 'mobile'],
    },
    geo: {
        operators: ['country_is', 'country_is_not', 'city_is'],
        inputType: 'location',
        async suggestions(query: string) {
            // Implement location search
            return await fetchLocationSuggestions(query);
        }
    },
    audience: {
        operators: ['in_segment', 'not_in_segment'],
        inputType: 'segment',
        async segments() {
            return await fetchAudienceSegments();
        }
    },
    custom: {
        operators: ['equals', 'contains', 'greater_than', 'less_than'],
        inputType: 'dynamic',
        validation: (value: any, type: string) => {
            // Implement custom validation
            return validateCustomRule(value, type);
        }
    }
};

export const AdvancedTargeting: React.FC<{
    config: TargetingConfig;
    onChange: (updates: Partial<TargetingConfig>) => void;
}> = ({ config, onChange }) => {
    const [selectedCondition, setSelectedCondition] = useState('');
    const [operator, setOperator] = useState('');
    const [value, setValue] = useState('');

    const addCondition = () => {
        if (selectedCondition && operator && value) {
            const newRule = {
                id: `rule-${Date.now()}`,
                type: selectedCondition,
                condition: operator,
                value,
                enabled: true,
            };
            onChange({
                rules: [...config.rules, newRule],
            });
            setSelectedCondition('');
            setOperator('');
            setValue('');
        }
    };

    return (
        <Card className="p-4">
            <h4 className="text-sm font-semibold mb-4">Advanced Targeting</h4>
            <div className="space-y-4">
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(targetingConditions).map((condition) => (
                            <SelectItem key={condition} value={condition}>
                                {condition}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {selectedCondition && (
                    <>
                        <Select value={operator} onValueChange={setOperator}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select operator" />
                            </SelectTrigger>
                            <SelectContent>
                                {targetingConditions[selectedCondition].operators.map((op) => (
                                    <SelectItem key={op} value={op}>
                                        {op}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {targetingConditions[selectedCondition].inputType === 'select' ? (
                            <Select value={value} onValueChange={setValue}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select value" />
                                </SelectTrigger>
                                <SelectContent>
                                    {targetingConditions[selectedCondition].options.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : (
                            <Input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Enter value"
                            />
                        )}

                        <Button onClick={addCondition}>Add Condition</Button>
                    </>
                )}
            </div>
        </Card>
    );
};
