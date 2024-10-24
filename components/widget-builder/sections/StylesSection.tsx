import React from 'react';
import { useState } from 'react';
import { StylesConfig } from '../types';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorSection } from './ColorSection';
import { Input } from "@/components/ui/input";
import { GradientBuilder } from './GradientBuilder';
import { AdvancedTypography } from './AdvancedTypography';
import { ResponsiveLayoutControls } from './ResponsiveLayoutControls';
import { AdvancedEffects } from './AdvancedEffects';
import { CustomCSS } from './CustomCSS';
import { MediaQueries } from './MediaQueries';
import { Transforms } from './Transforms';

const fontFamilies = [
    { value: 'inter', label: 'Inter' },
    { value: 'roboto', label: 'Roboto' },
    { value: 'poppins', label: 'Poppins' },
    { value: 'opensans', label: 'Open Sans' },
    { value: 'custom', label: 'Custom Font' },
];

const animations = [
    { value: 'fade', label: 'Fade' },
    { value: 'slide', label: 'Slide' },
    { value: 'bounce', label: 'Bounce' },
    { value: 'zoom', label: 'Zoom' },
    { value: 'flip', label: 'Flip' },
    { value: 'custom', label: 'Custom' },
];

export const StylesSection: React.FC<{
    config: StylesConfig;
    onChange: (updates: Partial<StylesConfig>) => void;
}> = ({ config, onChange }) => {
    const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);

    const updateColor = (color: string, type: 'background' | 'text' | 'button') => {
        onChange({
            colors: {
                ...config.colors,
                [type]: color,
            },
        });
    };

    const colors = config.colors || {};
    const typography = config.typography || {};
    const layout = config.layout || {};
    const animation = config.animation || {};

    return (
        <Card className="p-6">
            <Tabs defaultValue="colors">
                <TabsList className="mb-4">
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="typography">Typography</TabsTrigger>
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                    <TabsTrigger value="effects">Effects</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="colors">
                    <div className="space-y-6">
                        <ColorSection
                            label="Background Color"
                            color={colors.background || '#ffffff'}
                            onChange={(color) => updateColor(color, 'background')}
                            active={activeColorPicker === 'background'}
                            onToggle={() => setActiveColorPicker(activeColorPicker === 'background' ? null : 'background')}
                        />
                        <ColorSection
                            label="Text Color"
                            color={colors.text || '#000000'}
                            onChange={(color) => updateColor(color, 'text')}
                            active={activeColorPicker === 'text'}
                            onToggle={() => setActiveColorPicker(activeColorPicker === 'text' ? null : 'text')}
                        />
                        <ColorSection
                            label="Button Color"
                            color={colors.button || '#007bff'}
                            onChange={(color) => updateColor(color, 'button')}
                            active={activeColorPicker === 'button'}
                            onToggle={() => setActiveColorPicker(activeColorPicker === 'button' ? null : 'button')}
                        />
                        <GradientBuilder
                            gradient={colors.gradient}
                            onChange={(gradient) => onChange({ colors: { ...colors, gradient } })}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="typography">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Font Family</Label>
                            <Select
                                value={typography.fontFamily || 'inter'}
                                onValueChange={(value) =>
                                    onChange({
                                        typography: { ...typography, fontFamily: value },
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {fontFamilies.map((font) => (
                                        <SelectItem key={font.value} value={font.value}>
                                            {font.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Font Size (px)</Label>
                            <Slider
                                value={[typography.fontSize || 16]}
                                min={8}
                                max={72}
                                step={1}
                                onValueChange={([value]) =>
                                    onChange({
                                        typography: { ...typography, fontSize: value },
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Line Height</Label>
                            <Slider
                                value={[typography.lineHeight || 1.5]}
                                min={1}
                                max={2}
                                step={0.1}
                                onValueChange={([value]) =>
                                    onChange({
                                        typography: { ...typography, lineHeight: value },
                                    })
                                }
                            />
                        </div>

                        <AdvancedTypography config={typography} onChange={(updates) => onChange({ typography: { ...typography, ...updates } })} />
                    </div>
                </TabsContent>

                <TabsContent value="layout">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Width (px)</Label>
                            <Slider
                                value={[layout.width || 300]}
                                min={200}
                                max={800}
                                step={10}
                                onValueChange={([value]) =>
                                    onChange({
                                        layout: { ...layout, width: value },
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Padding (px)</Label>
                            <Slider
                                value={[layout.padding || 16]}
                                min={0}
                                max={40}
                                step={4}
                                onValueChange={([value]) =>
                                    onChange({
                                        layout: { ...layout, padding: value },
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Border Radius (px)</Label>
                            <Slider
                                value={[layout.borderRadius || 4]}
                                min={0}
                                max={40}
                                step={2}
                                onValueChange={([value]) =>
                                    onChange({
                                        layout: { ...layout, borderRadius: value },
                                    })
                                }
                            />
                        </div>

                        <ResponsiveLayoutControls config={layout} onChange={(updates) => onChange({ layout: { ...layout, ...updates } })} />
                    </div>
                </TabsContent>

                <TabsContent value="effects">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Animation Type</Label>
                            <Select
                                value={animation.type || 'fade'}
                                onValueChange={(value) =>
                                    onChange({
                                        animation: { ...animation, type: value },
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {animations.map((anim) => (
                                        <SelectItem key={anim.value} value={anim.value}>
                                            {anim.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Animation Duration (ms)</Label>
                            <Slider
                                value={[animation.duration || 300]}
                                min={0}
                                max={2000}
                                step={100}
                                onValueChange={([value]) =>
                                    onChange({
                                        animation: { ...animation, duration: value },
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Animation Delay (ms)</Label>
                            <Slider
                                value={[animation.delay || 0]}
                                min={0}
                                max={2000}
                                step={100}
                                onValueChange={([value]) =>
                                    onChange({
                                        animation: { ...animation, delay: value },
                                    })
                                }
                            />
                        </div>

                        <AdvancedEffects config={animation} onChange={(updates) => onChange({ animation: { ...animation, ...updates } })} />
                    </div>
                </TabsContent>

                <TabsContent value="advanced">
                    <div className="space-y-6">
                        <CustomCSS config={config.customCSS} onChange={(updates) => onChange({ customCSS: updates })} />
                        <MediaQueries config={config.mediaQueries} onChange={(updates) => onChange({ mediaQueries: updates })} />
                        <Transforms config={config.transforms} onChange={(updates) => onChange({ transforms: updates })} />
                    </div>
                </TabsContent>
            </Tabs>
        </Card>
    );
};
