import React, { useState } from 'react';
import { IntegrationsConfig } from '../types';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const integrationProviders = {
    mailchimp: {
        icon: '/icons/mailchimp.svg',
        name: 'Mailchimp',
        description: 'Connect with Mailchimp to sync your email subscribers',
        fields: [
            { key: 'apiKey', label: 'API Key', type: 'password' },
            { key: 'listId', label: 'List ID', type: 'text' },
            { key: 'tags', label: 'Tags', type: 'tags' }
        ]
    },
    zapier: {
        icon: '/icons/zapier.svg',
        name: 'Zapier',
        description: 'Send data to any app via Zapier webhooks',
        fields: [
            { key: 'webhookUrl', label: 'Webhook URL', type: 'url' }
        ]
    },
    // ... other providers
};

export const IntegrationsSection: React.FC<{
    config: IntegrationsConfig;
    onChange: (updates: Partial<IntegrationsConfig>) => void;
}> = ({ config, onChange }) => {
    const [activeTab, setActiveTab] = useState('providers');
    const [testStatus, setTestStatus] = useState<Record<string, string>>({});

    const testConnection = async (providerId: string) => {
        setTestStatus({ ...testStatus, [providerId]: 'testing' });
        try {
            // Implement actual connection testing logic here
            await new Promise(resolve => setTimeout(resolve, 1500));
            setTestStatus({ ...testStatus, [providerId]: 'success' });
        } catch (error) {
            setTestStatus({ ...testStatus, [providerId]: 'error' });
        }
    };

    return (
        <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="providers">Providers</TabsTrigger>
                    <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="providers">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(integrationProviders).map(([id, provider]) => (
                            <IntegrationCard
                                key={id}
                                id={id}
                                provider={provider}
                                config={config}
                                onChange={onChange}
                                testStatus={testStatus[id]}
                                onTest={() => testConnection(id)}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="webhooks">
                    <WebhookManager config={config} onChange={onChange} />
                </TabsContent>

                <TabsContent value="advanced">
                    <AdvancedIntegrationSettings config={config} onChange={onChange} />
                </TabsContent>
            </Tabs>
        </Card>
    );
};
