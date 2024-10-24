import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Type, Image, Square, MousePointer2, AlignLeft, Video, Layout, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Template, WidgetElement, ElementType } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ElementsConfig {
    templates: Template[];
    elements: WidgetElement[];
    onElementAdd: (element: Omit<WidgetElement, 'id'>) => void;
    onElementUpdate: (id: string, updates: Partial<WidgetElement>) => void;
    onElementRemove: (id: string) => void;
    onTemplateChange?: (templateId: string) => void;
    onElementsReorder: (newOrder: WidgetElement[]) => void;
}

export const ElementsSection: React.FC<ElementsConfig> = ({
    templates,
    elements,
    onElementAdd,
    onElementUpdate,
    onElementRemove,
    onTemplateChange,
}) => {
    const elementTypes: { id: ElementType; icon: React.FC; label: string }[] = [
        { id: 'text', icon: Type, label: 'Text' },
        { id: 'textarea', icon: AlignLeft, label: 'Text Area' },
        { id: 'image', icon: Image, label: 'Image' },
        { id: 'input', icon: Square, label: 'Input' },
        { id: 'button', icon: MousePointer2, label: 'Button' },
        { id: 'form', icon: Layout, label: 'Form' },
        { id: 'video', icon: Video, label: 'Video' },
        { id: 'custom', icon: Layout, label: 'Custom' },
    ];

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(elements);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        onElementUpdate('reorder', items);
    };

    const handleElementAdd = (element: Omit<WidgetElement, 'id'>) => {
        if (typeof onElementAdd === 'function') {
            onElementAdd(element);
        } else {
            console.error('onElementAdd is not a function');
        }
    };

    const handleElementUpdate = (id: string, updates: Partial<WidgetElement>) => {
        if (typeof onElementUpdate === 'function') {
            onElementUpdate(id, updates);
        } else {
            console.error('onElementUpdate is not a function');
        }
    };

    const handleElementRemove = (id: string) => {
        if (typeof onElementRemove === 'function') {
            onElementRemove(id);
        } else {
            console.error('onElementRemove is not a function');
        }
    };

    return (
        <Card className="p-6">
            <CardContent>
                <div className="space-y-6">
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-lg font-semibold">Templates</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {templates.map((template) => (
                                <Button
                                    key={template.id}
                                    variant="outline"
                                    className="h-auto p-4 flex flex-col items-center"
                                    onClick={() => onTemplateChange && onTemplateChange(template.id)}
                                >
                                    <div className="w-full aspect-video bg-muted rounded-md mb-2" />
                                    <span>{template.name}</span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <h3 className="text-lg font-semibold">Add Elements</h3>
                        <div className="flex flex-wrap gap-2">
                            {elementTypes.map((type) => (
                                <Button
                                    key={type.id}
                                    variant="outline"
                                    onClick={() => {
                                        if (typeof onElementAdd === 'function') {
                                            onElementAdd({
                                                id: `element-${Date.now()}`,
                                                type: type.id,
                                                content: type.id === 'image' ? '/placeholder.svg' : 'New Element',
                                                settings: {
                                                    styles: {
                                                        fontSize: 16,
                                                        padding: 10,
                                                    },
                                                },
                                            });
                                        } else {
                                            console.error('onElementAdd is not a function');
                                        }
                                    }}
                                >
                                    <type.icon className="w-4 h-4 mr-2" />
                                    {type.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <h3 className="text-lg font-semibold">Elements</h3>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="elements">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="space-y-2"
                                    >
                                        {elements.map((element, index) => (
                                            <Draggable
                                                key={element.id}
                                                draggableId={element.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`p-4 bg-white rounded-md border ${snapshot.isDragging ? 'shadow-lg' : ''
                                                            }`}
                                                    >
                                                        <ElementEditor
                                                            element={element}
                                                            onUpdate={(updates) => handleElementUpdate(element.id, updates)}
                                                            onRemove={() => handleElementRemove(element.id)}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const ElementEditor: React.FC<{
    element: WidgetElement;
    onUpdate: (updates: Partial<WidgetElement>) => void;
    onRemove: () => void;
}> = ({ element, onUpdate, onRemove }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="font-medium">{element.type}</span>
                    <span className="text-sm text-muted-foreground">
                        {element.id}
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRemove}
                    className="text-destructive"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            <div className="space-y-2">
                <Label>Content</Label>
                {element.type === 'textarea' ? (
                    <Textarea
                        value={element.content}
                        onChange={(e) => onUpdate({ content: e.target.value })}
                        placeholder="Enter content..."
                    />
                ) : (
                    <Input
                        value={element.content}
                        onChange={(e) => onUpdate({ content: e.target.value })}
                        placeholder="Enter content..."
                    />
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Input
                        type="number"
                        value={element.settings.styles.fontSize}
                        onChange={(e) =>
                            onUpdate({
                                settings: {
                                    ...element.settings,
                                    styles: {
                                        ...element.settings.styles,
                                        fontSize: parseInt(e.target.value),
                                    },
                                },
                            })
                        }
                        min={8}
                        max={72}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Padding</Label>
                    <Input
                        type="number"
                        value={element.settings.styles.padding}
                        onChange={(e) =>
                            onUpdate({
                                settings: {
                                    ...element.settings,
                                    styles: {
                                        ...element.settings.styles,
                                        padding: parseInt(e.target.value),
                                    },
                                },
                            })
                        }
                        min={0}
                        max={100}
                    />
                </div>
            </div>

            {/* Add more settings as needed */}
        </div>
    );
};
