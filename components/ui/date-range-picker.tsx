"use client"

import React from 'react';
import { DateRange } from 'react-day-picker';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DatePickerWithRangeProps {
    value: DateRange | undefined;
    onChange: (value: DateRange | undefined) => void;
    presets: { label: string; days?: number; period?: string }[];
}

export function DatePickerWithRange({ value, onChange, presets }: DatePickerWithRangeProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-[300px] justify-start text-left font-normal")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value?.from ? (
                        value.to ? (
                            <>
                                {format(value.from, "LLL dd, y")} - {format(value.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(value.from, "LLL dd, y")
                        )
                    ) : (
                        <span>Pick a date range</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={value?.from}
                    selected={value}
                    onSelect={onChange}
                    numberOfMonths={2}
                />
                <div className="grid grid-cols-2 gap-2 p-2">
                    {presets.map((preset) => (
                        <Button
                            key={preset.label}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                const today = new Date();
                                const from = new Date();
                                if (preset.days) {
                                    from.setDate(today.getDate() - preset.days);
                                } else if (preset.period === 'month') {
                                    from.setDate(1);
                                }
                                onChange({ from, to: today });
                            }}
                        >
                            {preset.label}
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}