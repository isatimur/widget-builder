'use client'

import React, { useState } from 'react'
import { Undo2, Redo2, Save, Download, ChevronLeft, ChevronRight, Layers, Palette, Settings2, Target, BarChart2, Link, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from '@/hooks/use-toast'
import { useWidgetStore } from '@/store/widgetStore'
import { useWidgetOptimization } from '@/hooks/useWidgetOptimization'
import { EnhancedWidgetAIAssistant } from '@/components/widget-builder/ai/EnhancedWidgetAIAssistant'
import { PreviewPanel } from '@/components/widget-builder/preview/PreviewPanel'
import { ElementsSection } from '@/components/widget-builder/sections/ElementsSection'
import { StylesSection } from '@/components/widget-builder/sections/StylesSection'
import { BehaviorSection } from '@/components/widget-builder/sections/BehaviorSection'
import { TargetingSection } from '@/components/widget-builder/sections/TargetingSection'
import { AnalyticsSection } from '@/components/widget-builder/sections/AnalyticsSection'
import { IntegrationsSection } from '@/components/widget-builder/sections/IntegrationsSection'
import { WidgetElement, Template } from '@/types'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'elements', label: 'Elements', icon: Layers },
  { id: 'styles', label: 'Styles', icon: Palette },
  { id: 'behavior', label: 'Behavior', icon: Settings2 },
  { id: 'targeting', label: 'Targeting', icon: Target },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'integrations', label: 'Integrations', icon: Link },
  { id: 'ai', label: 'AI Assistant', icon: Sparkles },
] as const;

export function UltimateWidgetBuilderV6() {
  const {
    currentWidget,
    actions,
    previewMode,
    history
  } = useWidgetStore();

  const { optimizationData, isLoading, error, optimize, isOptimizing } = useWidgetOptimization(currentWidget.id);
  const [activeSection, setActiveSection] = useState<string>('elements');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (isLoading) return <div>Loading optimization data...</div>;
  if (error) return <div>Error loading optimization data: {error.message}</div>;

  const handleSave = async () => {
    try {
      await actions.updateWidget(currentWidget);
      toast({ title: 'Widget saved successfully!' });
    } catch (error) {
      console.error('Save error:', error);
      toast({ title: 'Failed to save widget' });
    }
  };

  const handleUndo = () => {
    actions.undo();
    toast({ title: 'Changes undone' });
  };

  const handleRedo = () => {
    actions.redo();
    toast({ title: 'Changes redone' });
  };

  const handleExport = async () => {
    try {
      const exportData = JSON.stringify(currentWidget, null, 2);
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `widget-${currentWidget.id}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: 'Widget exported successfully!' });
    } catch (error) {
      console.error('Export error:', error);
      toast({ title: 'Failed to export widget' });
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "bg-secondary text-secondary-foreground transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center">
            {!sidebarCollapsed && <h1 className="text-xl font-bold">Widget Builder</h1>}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          <ScrollArea className="flex-grow">
            <nav className="space-y-2 p-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    sidebarCollapsed ? "px-2" : "px-4"
                  )}
                  onClick={() => setActiveSection(section.id)}
                >
                  <section.icon className={cn("h-5 w-5", sidebarCollapsed ? "mr-0" : "mr-2")} />
                  {!sidebarCollapsed && <span>{section.label}</span>}
                </Button>
              ))}
            </nav>
          </ScrollArea>
          <div className="p-4 border-t border-secondary-foreground/10">
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleUndo} disabled={history.past.length === 0}>
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleRedo} disabled={history.future.length === 0}>
                <Redo2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleExport}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" onClick={handleSave}>
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex">
          <div className="flex-1 overflow-auto p-6">
            <ScrollArea className="h-full">
              {activeSection === 'elements' && (
                <ElementsSection
                  elements={currentWidget.elements}
                  templates={currentWidget.templates}
                  onElementAdd={actions.addElement}
                  onElementUpdate={actions.updateElement}
                  onElementRemove={actions.removeElement}
                  onTemplateChange={actions.updateTemplate}
                  onElementsReorder={actions.reorderElements}
                />
              )}
              {activeSection === 'styles' && (
                <StylesSection
                  config={currentWidget.styles}
                  onChange={actions.updateStyles}
                />
              )}
              {activeSection === 'behavior' && (
                <BehaviorSection
                  config={currentWidget.behavior}
                  onChange={actions.updateBehavior}
                />
              )}
              {activeSection === 'targeting' && (
                <TargetingSection
                  config={currentWidget.targeting}
                  onChange={actions.updateTargeting}
                />
              )}
              {activeSection === 'analytics' && (
                <AnalyticsSection
                  config={currentWidget.analytics}
                  onChange={actions.updateAnalytics}
                />
              )}
              {activeSection === 'integrations' && (
                <IntegrationsSection
                  config={currentWidget.integrations}
                  onChange={actions.updateIntegrations}
                />
              )}
              {activeSection === 'ai' && (
                <EnhancedWidgetAIAssistant
                  optimizationData={optimizationData}
                  onOptimize={optimize}
                  isOptimizing={isOptimizing}
                />
              )}
            </ScrollArea>
          </div>
          <div className="w-1/3 border-l border-border">
            <PreviewPanel
              elements={currentWidget.elements}
              styles={currentWidget.styles}
              behavior={currentWidget.behavior}
              previewMode={previewMode}
              onPreviewModeChange={actions.setPreviewMode}
            />
          </div>
        </div>
      </main>
    </div>
  );
}