import { useState } from 'react';

export function useAI() {
  const [aiSuggestions, setAiSuggestions] = useState('');

  function fetchSuggestions() {
    setAiSuggestions("AI Suggestion: Optimize your loop.");
  }

  return { aiSuggestions, fetchSuggestions };
}
