import React, { useState } from 'react';
import { useCompletion } from 'ai/react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2, MessageSquare, Loader2, Send } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface AIAssistantProps {
  currentWidget: any;
  onApplySuggestion: (suggestion: any) => void;
}

export const WidgetAIAssistant: React.FC<AIAssistantProps> = ({
  currentWidget,
  onApplySuggestion
}) => {
  const [activeMode, setActiveMode] = useState<'suggest' | 'chat' | null>(null);
  
  const {
    completion,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading
  } = useCompletion({
    api: '/api/ai/widget-suggestions',
    onFinish: (completion) => {
      try {
        const suggestions = JSON.parse(completion);
        setSuggestions(suggestions);
      } catch (error) {
        console.error('Failed to parse AI suggestions:', error);
      }
    }
  });

  const generateSuggestions = async () => {
    const prompt = generateAIPrompt(currentWidget);
    setInput(prompt);
    handleSubmit();
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-primary" />
          AI Assistant
        </h3>
        <div className="flex space-x-2">
          <Button
            variant={activeMode === 'suggest' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveMode('suggest')}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Suggestions
          </Button>
          <Button
            variant={activeMode === 'chat' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveMode('chat')}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeMode === 'suggest' && (
          <SuggestionsPanel
            currentWidget={currentWidget}
            onGenerate={generateSuggestions}
            isLoading={isLoading}
            suggestions={suggestions}
            onApply={onApplySuggestion}
          />
        )}
        {activeMode === 'chat' && (
          <ChatPanel
            currentWidget={currentWidget}
            completion={completion}
            input={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </Card>
  );
};

const SuggestionsPanel: React.FC<{
  currentWidget: any;
  onGenerate: () => void;
  isLoading: boolean;
  suggestions: any[];
  onApply: (suggestion: any) => void;
}> = ({ currentWidget, onGenerate, isLoading, suggestions, onApply }) => {
  const [previewSuggestion, setPreviewSuggestion] = useState<any>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-4"
    >
      <Button
        className="w-full"
        onClick={onGenerate}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Wand2 className="w-4 h-4 mr-2" />
        )}
        Generate Suggestions
      </Button>

      <div className="space-y-2">
        {suggestions?.map((suggestion, index) => (
          <SuggestionCard
            key={index}
            suggestion={suggestion}
            onPreview={() => setPreviewSuggestion(suggestion)}
            onApply={() => onApply(suggestion)}
          />
        ))}
      </div>

      {previewSuggestion && (
        <PreviewDialog
          suggestion={previewSuggestion}
          currentWidget={currentWidget}
          onClose={() => setPreviewSuggestion(null)}
          onApply={() => {
            onApply(previewSuggestion);
            setPreviewSuggestion(null);
          }}
        />
      )}
    </motion.div>
  );
};

const ChatPanel: React.FC<{
  currentWidget: any;
  completion: string;
  input: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}> = ({ currentWidget, completion, input, onChange, onSubmit, isLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-4"
    >
      <div className="h-[300px] overflow-y-auto border rounded-md p-4">
        <ChatMessages
          messages={[
            { role: 'system', content: completion },
            { role: 'user', content: input }
          ]}
        />
      </div>

      <form onSubmit={onSubmit} className="flex space-x-2">
        <Textarea
          value={input}
          onChange={onChange}
          placeholder="Ask about your widget..."
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    </motion.div>
  );
};
