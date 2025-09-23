import '../hooks/styles/InputStyles.css';
import { useEffect, useRef, useState } from 'react';

interface SearchInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  placeholder: string;
  value: string;
  onInput: (value: string) => void;
  suggestion: string;
}

const SearchInput = ({ inputRef, placeholder, value, onInput, suggestion }: SearchInputProps) => {
  const [_cursorPosition, setCursorPosition] = useState(0);
  const containerRef = useRef(null);

  // Update cursor position when value changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputRef.current) {
        setCursorPosition(inputRef.current.selectionStart || value.length);
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [value, inputRef]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setCursorPosition(e.currentTarget.selectionStart || 0);
    onInput(e.currentTarget.value);
  };

  // Determine visible parts of suggestion
  const prefix = value || '';
  const suffix = suggestion ? suggestion.slice(prefix.length) : '';

  return (
    <div className="search-container" ref={containerRef}>
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          placeholder={placeholder}
          className="raleway search alive"
          value={value}
          onInput={handleInput}
          onKeyUp={(e) => setCursorPosition(e.currentTarget.selectionStart || 0)}
          onMouseUp={(e) => setCursorPosition(e.currentTarget.selectionStart || 0)}
          onKeyDown={(e) => e.key === 'Tab' && console.log('Tab pressed in input')}
          aria-autocomplete="list"
          autoComplete="off"
        />
        {suffix && (
          <div className="search-suggestion raleway" aria-hidden="true">
            <span className="search-prefix">{prefix}</span>
            <span className="search-suffix">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
