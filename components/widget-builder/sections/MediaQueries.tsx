import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MediaQuery {
  breakpoint: string;
  css: string;
}

interface MediaQueriesProps {
  config: MediaQuery[];
  onChange: (queries: MediaQuery[]) => void;
}

export const MediaQueries: React.FC<MediaQueriesProps> = ({ config, onChange }) => {
  const addMediaQuery = () => {
    onChange([...config, { breakpoint: '', css: '' }]);
  };

  const updateMediaQuery = (index: number, updates: Partial<MediaQuery>) => {
    const newQueries = [...config];
    newQueries[index] = { ...newQueries[index], ...updates };
    onChange(newQueries);
  };

  const removeMediaQuery = (index: number) => {
    const newQueries = config.filter((_, i) => i !== index);
    onChange(newQueries);
  };

  return (
    <div className="space-y-4">
      <Label>Media Queries</Label>
      {config.map((query, index) => (
        <div key={index} className="space-y-2 border p-4 rounded">
          <Input
            value={query.breakpoint}
            onChange={(e) => updateMediaQuery(index, { breakpoint: e.target.value })}
            placeholder="e.g., (max-width: 768px)"
          />
          <Input
            value={query.css}
            onChange={(e) => updateMediaQuery(index, { css: e.target.value })}
            placeholder="Enter CSS for this breakpoint"
          />
          <Button onClick={() => removeMediaQuery(index)}>Remove</Button>
        </div>
      ))}
      <Button onClick={addMediaQuery}>Add Media Query</Button>
    </div>
  );
};
