import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";

interface ColorSectionProps {
    label: string;
    color: string;
    onChange: (color: string) => void;
    active: boolean;
    onToggle: () => void;
}

export const ColorSection: React.FC<ColorSectionProps> = ({
    label,
    color,
    onChange,
    active,
    onToggle,
}) => {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Popover open={active} onOpenChange={onToggle}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                    >
                        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} />
                        {color}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <HexColorPicker color={color} onChange={onChange} />
                </PopoverContent>
            </Popover>
        </div>
    );
};

