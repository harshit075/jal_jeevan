
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User, getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase'; // We will use the conditional app instance
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  role: 'admin' | 'user' | 'guest';
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: 'guest',
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

// Dummy check for admin role
const adminEmails = ['admin@jaljeevan.com'];
const getRole = (user: User | null): 'admin' | 'user' | 'guest' => {
  if (!user) return 'guest';
  return adminEmails.includes(user.email || '') ? 'admin' : 'user';
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const role = getRole(user);
  const auth = app ? getAuth(app) : undefined;

  useEffect(() => {
    if (!auth) {
      setLoading(false); // If no firebase app, stop loading
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const login = async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase not initialized");
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase not initialized");
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!auth) throw new Error("Firebase not initialized");
    await signOut(auth);
    router.push('/');
  };

  const value = {
    user,
    role,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
