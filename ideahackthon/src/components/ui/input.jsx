export function Input({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="border p-2 rounded-md w-full"
    />
  );
}
