import { useState } from 'react';

export function useCollaboration() {
  const [code, setCode] = useState('');
  const [users, setUsers] = useState([{ id: 1, name: "User1" }]);

  return { code, setCode, users };
}
