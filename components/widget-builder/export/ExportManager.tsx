import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { Download } from 'lucide-react';

export const ExportManager: React.FC<{
  widget: any;
  onImport: (widget: any) => void;
}> = ({ widget, onImport }) => {
  const [exportFormat, setExportFormat] = useState<'json' | 'html' | 'react'>('json');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const generateExport = async () => {
    switch (exportFormat) {
      case 'json':
        return JSON.stringify(widget, null, 2);
      case 'html':
        return await generateStandaloneHTML(widget);
      case 'react':
        return generateReactComponent(widget);
    }
  };

  const handleImport = async (file: File) => {
    try {
      const content = await file.text();
      const imported = JSON.parse(content);
      validateWidgetConfig(imported);
      onImport(imported);
    } catch (error) {
      console.error('Import failed:', error);
      toast.error('Failed to import widget configuration');
    }
  };

  return (
    <Card className="p-6">
      <Tabs value={exportFormat} onValueChange={(v) => setExportFormat(v as any)}>
        <TabsList>
          <TabsTrigger value="json">JSON</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="react">React</TabsTrigger>
        </TabsList>

        <TabsContent value={exportFormat}>
          <div className="space-y-4">
            <CodeBlock
              language={exportFormat}
              code={generateExport()}
              showLineNumbers
            />

            <div className="flex justify-between">
              <Button
                onClick={() => {
                  const blob = new Blob([generateExport()], {
                    type: 'application/json'
                  });
                  saveAs(blob, `widget-export.${exportFormat}`);
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download {exportFormat.toUpperCase()}
              </Button>

              <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)}>
                Advanced Options
              </Button>
            </div>

            {showAdvanced && (
              <AdvancedExportOptions
                format={exportFormat}
                widget={widget}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
