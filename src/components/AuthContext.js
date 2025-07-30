'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAdmin = localStorage.getItem('isAdmin');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }

    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const signIn = (userData, admin = false) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    if (admin) {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      router.push('/admin/dashboard');
    } else {
      localStorage.setItem('user-email', JSON.stringify(userData.email));
      router.push('/transaction');
    }
  };

  const signOut = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('user-email');
    localStorage.removeItem('isAdmin');
    router.push('/signup');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
