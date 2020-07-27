import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SingInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);
// variável inicialmente com valor vazio -> forçando {} as AuthContext
// para remover o erro do Typescript

// Outra forma de fazer, mas que poderia dar erros a frente
// const authContext = createContext<AuthContext | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    // console.log('signIn');
    const response = await api.post('sessions', {
      email,
      password,
    });

    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Diego', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
