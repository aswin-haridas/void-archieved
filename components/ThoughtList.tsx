import "../hooks/styles/Thoughts.css";

const ThoughtList = ({ thoughts, selectedThought, onThoughtClick }) => {
  return (
    <div className="thinks raleway-light">
      {thoughts.map((thought, index) => (
        <button
          key={thought}
          type="button"
          className={`think-item ${
            selectedThought === index + 1 ? "glow" : ""
          }`}
          onClick={() => onThoughtClick(index)}
        >
          {thought}
        </button>
      ))}
    </div>
  );
};

export default ThoughtList;
