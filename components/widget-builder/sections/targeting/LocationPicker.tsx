import React, { useState, useEffect } from 'react';
import { useDebounce } from 'ahooks';
import { fetchLocationSuggestions } from '@/api';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Map } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const LocationPicker: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true);
      fetchLocationSuggestions(debouncedSearch)
        .then(setSuggestions)
        .finally(() => setLoading(false));
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search locations..."
          className="pr-8"
        />
        {loading && (
          <Spinner className="absolute right-2 top-1/2 transform -translate-y-1/2" />
        )}
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full bg-white border rounded-md shadow-lg"
          >
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onChange(suggestion.id);
                  setSearchTerm(suggestion.name);
                  setSuggestions([]);
                }}
              >
                <Map className="w-4 h-4 mr-2" />
                {suggestion.name}
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
