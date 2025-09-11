import "../hooks/styles/AutocompleteStyles.css";
import { AutocompleteSuggestion } from "../hooks/useAutocomplete";

interface AutocompleteListProps {
  suggestions: AutocompleteSuggestion[];
  selectedIndex: number;
  onSuggestionClick: (index: number) => void;
}

const AutocompleteList = ({
  suggestions,
  selectedIndex,
  onSuggestionClick,
}: AutocompleteListProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="autocomplete-list raleway-light">
      {suggestions.map((suggestion, index) => (
        <button
          key={`${suggestion.text}-${index}`}
          type="button"
          className={`autocomplete-item ${
            selectedIndex === index ? "glow" : ""
          }`}
          onClick={() => onSuggestionClick(index)}
        >
          <span className="suggestion-text">{suggestion.text}</span>
        </button>
      ))}
    </div>
  );
};

export default AutocompleteList;
