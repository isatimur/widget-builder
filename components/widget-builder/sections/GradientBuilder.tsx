import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ColorSection } from './ColorSection';

interface GradientStop {
    color: string;
    position: number;
}

interface GradientBuilderProps {
    gradient?: string;
    onChange: (gradient: string) => void;
}

export const GradientBuilder: React.FC<GradientBuilderProps> = ({ gradient, onChange }) => {
    const [stops, setStops] = useState<GradientStop[]>(
        gradient ? parseGradient(gradient) : [{ color: '#ffffff', position: 0 }, { color: '#000000', position: 100 }]
    );

    const updateStop = (index: number, updates: Partial<GradientStop>) => {
        const newStops = [...stops];
        newStops[index] = { ...newStops[index], ...updates };
        setStops(newStops);
        onChange(buildGradientString(newStops));
    };

    const addStop = () => {
        const newStops = [...stops, { color: '#ffffff', position: 50 }];
        setStops(newStops);
        onChange(buildGradientString(newStops));
    };

    const removeStop = (index: number) => {
        if (stops.length > 2) {
            const newStops = stops.filter((_, i) => i !== index);
            setStops(newStops);
            onChange(buildGradientString(newStops));
        }
    };

    return (
        <div className="space-y-4">
            <Label>Gradient</Label>
            <div className="space-y-2">
                {stops.map((stop, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <ColorSection
                            label={`Stop ${index + 1}`}
                            color={stop.color}
                            onChange={(color) => updateStop(index, { color })}
                            active={false}
                            onToggle={() => { }}
                        />
                        <Input
                            type="number"
                            min={0}
                            max={100}
                            value={stop.position}
                            onChange={(e) => updateStop(index, { position: Number(e.target.value) })}
                        />
                        <Button onClick={() => removeStop(index)} disabled={stops.length <= 2}>
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
            <Button onClick={addStop}>Add Stop</Button>
        </div>
    );
};

function parseGradient(gradient: string): GradientStop[] {
    // Implement gradient string parsing logic here
    // For simplicity, we'll return a default gradient
    return [{ color: '#ffffff', position: 0 }, { color: '#000000', position: 100 }];
}

function buildGradientString(stops: GradientStop[]): string {
    return `linear-gradient(to right, ${stops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`;
}

