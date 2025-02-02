export function Tabs({ children, defaultValue }) {
  return <div>{children}</div>;
}

export function TabsList({ children }) {
  return <div className="flex space-x-2 border-b pb-2">{children}</div>;
}

export function TabsTrigger({ value, children }) {
  return (
    <button className="px-4 py-2 border rounded-md">{children}</button>
  );
}

export function TabsContent({ value, children }) {
  return <div className="mt-4">{children}</div>;
}
