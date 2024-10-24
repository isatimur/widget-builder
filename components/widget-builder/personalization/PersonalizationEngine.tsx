import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from '@tanstack/react-query';
import { WidgetConfig } from '@/types';

interface PersonalizationRule {
  id: string;
  condition: PersonalizationCondition;
  changes: Partial<WidgetConfig>;
  priority: number;
  active: boolean;
  performance: {
    impressions: number;
    conversions: number;
    rate: number;
  };
}

interface PersonalizationCondition {
  type: 'behavior' | 'demographic' | 'technographic' | 'geographic' | 'custom';
  operator: string;
  value: any;
  confidence: number;
}

export const PersonalizationEngine: React.FC<{
  widgetId: string;
  onPersonalize: (changes: Partial<WidgetConfig>) => void;
}> = ({ widgetId, onPersonalize }) => {
  const [activeRules, setActiveRules] = useState<PersonalizationRule[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<PersonalizationRule[]>([]);

  const { data: visitorData } = useQuery(['visitor-data'], fetchVisitorData);
  const { data: segmentData } = useQuery(['segment-data'], fetchSegmentData);

  const optimizeMutation = useMutation({
    mutationFn: (rules: PersonalizationRule[]) => 
      optimizeRules(widgetId, rules),
    onSuccess: (optimizedRules) => {
      setActiveRules(optimizedRules);
      toast.success('Personalization rules optimized');
    },
  });

  useEffect(() => {
    if (visitorData && segmentData) {
      const suggestions = generateAISuggestions(visitorData, segmentData);
      setAiSuggestions(suggestions);
    }
  }, [visitorData, segmentData]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Tabs defaultValue="rules">
          <TabsList>
            <TabsTrigger value="rules">Active Rules</TabsTrigger>
            <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
          </TabsList>

          <TabsContent value="rules">
            <ActiveRulesPanel
              rules={activeRules}
              onUpdate={handleRuleUpdate}
              onDelete={handleRuleDelete}
              onOptimize={() => optimizeMutation.mutate(activeRules)}
            />
          </TabsContent>

          <TabsContent value="suggestions">
            <AISuggestionsPanel
              suggestions={aiSuggestions}
              onApply={handleApplySuggestion}
            />
          </TabsContent>

          <TabsContent value="segments">
            <SegmentManager
              segments={segmentData}
              onCreateSegment={handleCreateSegment}
            />
          </TabsContent>
        </Tabs>
      </Card>

      <PersonalizationInsights
        rules={activeRules}
        visitorData={visitorData}
      />
    </div>
  );
};
