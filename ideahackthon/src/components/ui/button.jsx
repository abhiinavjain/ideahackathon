export function Button({ onClick, children, className }) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-md font-semibold transition ${className}`}>
      {children}
    </button>
  );
}
