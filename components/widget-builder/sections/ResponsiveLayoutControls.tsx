import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResponsiveLayoutControlsProps {
  config: any;
  onChange: (updates: any) => void;
}

const devices = ['desktop', 'tablet', 'mobile'];

export const ResponsiveLayoutControls: React.FC<ResponsiveLayoutControlsProps> = ({ config, onChange }) => {
  const updateDeviceConfig = (device: string, updates: any) => {
    onChange({ [device]: { ...config[device], ...updates } });
  };

  return (
    <Tabs defaultValue="desktop">
      <TabsList>
        {devices.map((device) => (
          <TabsTrigger key={device} value={device}>
            {device.charAt(0).toUpperCase() + device.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
      {devices.map((device) => (
        <TabsContent key={device} value={device}>
          <div className="space-y-4">
            <div>
              <Label>Width</Label>
              <Input
                type="text"
                value={config[device]?.width || ''}
                onChange={(e) => updateDeviceConfig(device, { width: e.target.value })}
                placeholder="e.g., 100%, 300px"
              />
            </div>
            <div>
              <Label>Height</Label>
              <Input
                type="text"
                value={config[device]?.height || ''}
                onChange={(e) => updateDeviceConfig(device, { height: e.target.value })}
                placeholder="e.g., auto, 500px"
              />
            </div>
            <div>
              <Label>Margin</Label>
              <Input
                type="text"
                value={config[device]?.margin || ''}
                onChange={(e) => updateDeviceConfig(device, { margin: e.target.value })}
                placeholder="e.g., 10px 20px"
              />
            </div>
            <div>
              <Label>Padding</Label>
              <Input
                type="text"
                value={config[device]?.padding || ''}
                onChange={(e) => updateDeviceConfig(device, { padding: e.target.value })}
                placeholder="e.g., 15px"
              />
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
