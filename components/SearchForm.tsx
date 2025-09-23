import type { AutocompleteSuggestion } from '../hooks/useAutocomplete';
import AutocompleteList from './AutocompleteList';
import SearchInput from './SearchInput';

interface SearchFormProps {
  onSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  placeholder: string;
  suggestions: AutocompleteSuggestion[];
  selectedIndex: number;
  selectNext: () => void;
  selectPrevious: () => void;
  getSelectedSuggestion: () => AutocompleteSuggestion | null;
  query: string;
  onQueryInput: (value: string) => void;
  onSuggestionClick: (index: number) => void;
}

const SearchForm = ({
  onSubmit,
  inputRef,
  placeholder,
  suggestions,
  selectedIndex,
  selectNext,
  selectPrevious,
  getSelectedSuggestion,
  query,
  onQueryInput,
  onSuggestionClick,
}: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="container">
      <SearchInput
        inputRef={inputRef}
        suggestion={getSelectedSuggestion()?.text || ''}
        placeholder={placeholder}
        value={query}
        onInput={onQueryInput}
      />
      <AutocompleteList
        suggestions={suggestions}
        selectedIndex={selectedIndex}
        onSuggestionClick={onSuggestionClick}
      />
    </form>
  );
};

export default SearchForm;
