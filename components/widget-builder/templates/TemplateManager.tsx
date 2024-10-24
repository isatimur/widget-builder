import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Save } from 'lucide-react';

interface Template {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    category: string;
    tags: string[];
    config: any;
    stats: {
        uses: number;
        rating: number;
        conversions: number;
    };
}

export const TemplateManager: React.FC<{
    currentWidget: any;
    onApplyTemplate: (template: Template) => void;
}> = ({ currentWidget, onApplyTemplate }) => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const saveAsTemplate = async (name: string, description: string, tags: string[]) => {
        const thumbnail = await generateThumbnail(currentWidget);
        const newTemplate: Template = {
            id: nanoid(),
            name,
            description,
            thumbnail,
            category: 'custom',
            tags,
            config: currentWidget,
            stats: { uses: 0, rating: 0, conversions: 0 }
        };

        setTemplates([...templates, newTemplate]);
        await saveTemplateToCloud(newTemplate);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                    <Input
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                    />
                </div>
                <Button onClick={() => setShowSaveDialog(true)}>
                    <Save className="w-4 h-4 mr-2" />
                    Save as Template
                </Button>
            </div>

            <TemplateCategories
                selected={selectedCategory}
                onChange={setSelectedCategory}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                    {filterTemplates(templates, searchQuery, selectedCategory).map((template) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <TemplateCard
                                template={template}
                                onApply={() => onApplyTemplate(template)}
                                onDuplicate={() => duplicateTemplate(template)}
                                onDelete={() => deleteTemplate(template.id)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <SaveTemplateDialog
                open={showSaveDialog}
                onClose={() => setShowSaveDialog(false)}
                onSave={saveAsTemplate}
            />
        </div>
    );
};