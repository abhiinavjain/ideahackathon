import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);

  function login() {
    setUser({ id: 1, name: "User" });
  }

  function logout() {
    setUser(null);
  }

  return { user, login, logout };
}
