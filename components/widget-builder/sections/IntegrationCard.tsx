import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function IntegrationCard({ id, provider, config, onChange, testStatus, onTest }: { id: string, provider: IntegrationProvider, config: IntegrationConfig, onChange: (id: string, updates: Partial<IntegrationConfig>) => void, testStatus: 'testing' | 'success' | 'error', onTest: () => void }) {
    return (
        <Card className="p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">{provider.name}</h3>
                    <p className="text-sm text-muted-foreground">{provider.description}</p>
                </div>
                <Switch
                    checked={config.enabled}
                    onCheckedChange={(enabled) => onChange(id, { enabled })}
                />
            </div>
            {config.enabled && (
                <div className="mt-4 space-y-4">
                    {/* Add integration-specific fields here */}
                    <Button onClick={onTest} disabled={testStatus === 'testing'}>
                        {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
                    </Button>
                    {testStatus === 'success' && <p className="text-green-500">Connection successful</p>}
                    {testStatus === 'error' && <p className="text-red-500">Connection failed</p>}
                </div>
            )}
        </Card>
    );
}