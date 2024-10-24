import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';

interface ABTest {
  id: string;
  name: string;
  variants: ABTestVariant[];
  status: 'draft' | 'running' | 'completed';
  startDate?: Date;
  endDate?: Date;
  targetMetric: string;
  minimumConfidence: number;
}

interface ABTestVariant {
  id: string;
  name: string;
  changes: Partial<WidgetConfig>;
  traffic: number;
  results?: {
    views: number;
    conversions: number;
    conversionRate: number;
  };
}

export const ABTestingManager: React.FC<{
  widgetId: string;
  onVariantChange: (variant: ABTestVariant) => void;
}> = ({ widgetId, onVariantChange }) => {
  const [activeTest, setActiveTest] = useState<ABTest | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const startTest = async (test: ABTest) => {
    try {
      await startABTest(widgetId, test);
      toast.success('A/B Test started successfully');
      setActiveTest({ ...test, status: 'running' });
    } catch (error) {
      toast.error('Failed to start A/B Test');
      console.error('AB Test error:', error);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">A/B Testing</h3>
        <Button
          onClick={() => setIsCreating(true)}
          disabled={!!activeTest?.status === 'running'}
        >
          Create New Test
        </Button>
      </div>

      {activeTest && (
        <ActiveTestPanel
          test={activeTest}
          onVariantChange={onVariantChange}
          onComplete={handleTestComplete}
        />
      )}

      {isCreating && (
        <TestCreationForm
          onSubmit={handleTestCreate}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <TestHistory widgetId={widgetId} />
    </Card>
  );
};

const ActiveTestPanel: React.FC<{
  test: ABTest;
  onVariantChange: (variant: ABTestVariant) => void;
  onComplete: (testId: string) => void;
}> = ({ test, onVariantChange, onComplete }) => {
  const { data: results } = useQuery(['ab-test-results', test.id], {
    queryFn: () => fetchTestResults(test.id),
    refetchInterval: 60000, // 1 minute
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {test.variants.map((variant) => (
          <VariantCard
            key={variant.id}
            variant={variant}
            results={results?.[variant.id]}
            onSelect={() => onVariantChange(variant)}
          />
        ))}
      </div>

      <TestStatistics results={results} />
      <SignificanceCalculator results={results} />
    </div>
  );
};
