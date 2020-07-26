import { createContext } from 'react';

interface AuthContextData {
  name: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
// variável inicialmente com valor vazio -> forçando {} as AuthContext
// para remover o erro do Typescript

// Outra forma de fazer, mas que poderia dar erros a frente
// const authContext = createContext<AuthContext | null>(null);

export default AuthContext;
