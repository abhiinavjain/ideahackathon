export function Console({ output }) {
    return (
      <div className="border rounded-lg p-4 h-40 bg-black text-green-400 overflow-auto">
        {output.length > 0 ? output.map((line, index) => (
          <p key={index} className="whitespace-pre-wrap">{line}</p>
        )) : <p className="text-gray-500">No output yet...</p>}
      </div>
    );
  }
  