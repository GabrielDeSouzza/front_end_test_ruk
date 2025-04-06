import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth, UserData } from '@/src/context/AuthContext';
import LoadingModal from '@/src/components/baseComponents/LoadingModal';
import 'react-native-get-random-values';

export default function Home() {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const { getProfile, signOut } = useAuth();
  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setUserData(data);
    };
    fetchProfile();
  }, [getProfile]);
  console.log(userData);
  return (
    <View className="flex-1 justify-center items-center  bg-slate-100">
      {!userData ? (
        <LoadingModal visible />
      ) : (
        <View className="p-6 bg-white">
          <Text className="text-xl font-bold mb-4 text-center">
            Perfil do Usuário
          </Text>

          <View className="mb-3">
            <Text className="text-gray-500">Nome:</Text>
            <Text className="text-base">{userData.name}</Text>
          </View>

          <View className="mb-3">
            <Text className="text-gray-500">Email:</Text>
            <Text className="text-base">{userData.email}</Text>
          </View>

          <View className="mb-3">
            <Text className="text-gray-500">Telefones:</Text>
            {userData.telephones.map((telephone, index) => {
              return (
                <Text className="text-base" key={index}>
                  ({telephone.area_code}) {telephone.number}
                </Text>
              );
            })}
          </View>

          <View className="mb-3">
            <Text className="text-gray-500">ID do Usuário:</Text>
            <Text className="text-xs text-gray-700">{userData.id}</Text>
          </View>

          <View className="mb-3">
            <Text className="text-gray-500">Criado em:</Text>
            <Text className="text-base">
              {new Date(userData.created_at).toLocaleString()}
            </Text>
          </View>

          <View>
            <Text className="text-gray-500">Última Modificação:</Text>
            <Text className="text-base">
              {new Date(userData.modified_at).toLocaleString()}
            </Text>
          </View>
          <View className="justify-center items-center">
            <Button title="DESLOGAR" onPress={() => signOut()} />
          </View>
        </View>
      )}
    </View>
  );
}
