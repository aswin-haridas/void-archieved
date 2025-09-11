import SearchInput from './SearchInput';
import ThoughtList from './ThoughtList';

const SearchForm = ({
  onSubmit,
  inputRef,
  placeholder,
  suggestion,
  query,
  thoughts,
  onQueryInput,
  selectedThought,
  onThoughtClick,
}) => {
  return (
    <form onSubmit={onSubmit} className="container">
      <SearchInput
        inputRef={inputRef}
        suggestion={suggestion}
        placeholder={placeholder}
        value={query}
        onInput={onQueryInput}
      />
      <ThoughtList
        thoughts={thoughts}
        selectedThought={selectedThought}
        onThoughtClick={onThoughtClick}
        query={query}
      />
    </form>
  );
};

export default SearchForm;
