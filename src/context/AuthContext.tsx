// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginFormSchemaType } from '../components/forms/LoginForm/schema';
import { signUpSchemaType } from '../components/forms/SignUpForm/schema';
import { router } from 'expo-router';

export type UserData = {
  created_at: Date;
  id: string;
  name: string;
  modified_at: Date;
  email: string;
  telephones: [
    {
      area_code: number;
      number: number;
    },
  ];
};

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
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/signUp`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
      },
    );
    return response.status;
  };
  const signIn = async (loginData: loginFormSchemaType) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/signIn`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        },
      );

      const result = await response.json();
      if (response.ok && result.token) {
        await AsyncStorage.setItem('token', result.token);
        setSession(true);
        return response.status;
      }
      return response.status;
    } catch (error) {
      console.log('error', error);
      return 400;
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('token');
    setSession(false);
    router.navigate('/');
  };

  const getProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return undefined;
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/profile`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data: UserData = await response.json();
    return data;
  };

  const contextData = { session, signIn, signOut, signUp, getProfile };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <Text>Carregando...</Text> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext) as {
    session: boolean;
    signUp: ({ email, name, telephones }: signUpSchemaType) => Promise<number>;
    signIn: ({ email, password }: loginFormSchemaType) => Promise<number>;
    signOut: () => Promise<void>;
    getProfile: () => Promise<UserData | undefined>;
  };
};
