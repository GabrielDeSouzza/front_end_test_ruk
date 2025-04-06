// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginFormSchemaType } from '../components/forms/LoginForm/schema';
import { signUpSchemaType } from '../components/forms/SignUpForm/schema';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setSession(true);
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const signUp = async (dataUser: signUpSchemaType) => {
    const data = {
      name: dataUser.name,
      email: dataUser.email,
      password: dataUser.password,
      telephones: dataUser.telephones.map((tel) => {
        return {
          number: Number(tel.phoneNumber),
          areaCode: Number(tel.areaCode),
        };
      }),
    };
    const response = await fetch('http://localhost:3000/auth/singUp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    });
    console.log(await response.status);
    return response.status;
  };
  const signIn = async (loginData: loginFormSchemaType) => {
    try {
      console.log(process.env);
      const response = await fetch('http://localhost:3000/auth/Sign', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok && result.token) {
        await AsyncStorage.setItem('token', result.token);
        setSession(true);
      } else {
        throw new Error(result.message || 'Erro no login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('token');
    setSession(false);
  };

  const contextData = { session, signIn, signOut, signUp };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <Text>Carregando...</Text> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext) as {
    session: boolean;
    user: any;
    signUp: ({ email, name, telephones }: signUpSchemaType) => Promise<number>;
    signIn: ({ email, password }: loginFormSchemaType) => Promise<void>;
    signOut: () => Promise<void>;
  };
};
