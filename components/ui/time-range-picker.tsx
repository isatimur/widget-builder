import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TimeRangePicker({ startTime, endTime, onStartTimeChange, onEndTimeChange }: { startTime: string, endTime: string, onStartTimeChange: (value: string) => void, onEndTimeChange: (value: string) => void }) {
    const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
        const hour = Math.floor(i / 4);
        const minute = (i % 4) * 15;
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    });

    return (
        <div className="flex space-x-2">
            <Select value={startTime} onValueChange={onStartTimeChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Start time" />
                </SelectTrigger>
                <SelectContent>
                    {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                            {time}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={endTime} onValueChange={onEndTimeChange}>
                <SelectTrigger>
                    <SelectValue placeholder="End time" />
                </SelectTrigger>
                <SelectContent>
                    {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                            {time}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}