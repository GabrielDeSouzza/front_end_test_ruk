import React from 'react';
import { Modal, ActivityIndicator, View, Text } from 'react-native';

interface LoadingModalProps {
  visible: boolean;
  message?: string;
}

export default function LoadingModal({
  visible,
  message = 'Carregando...',
}: LoadingModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/30">
        <View className="bg-white px-6 py-5 rounded-2xl items-center justify-center space-y-3">
          <ActivityIndicator size="large" color="#1D4ED8" />
          <Text className="text-base text-gray-800">{message}</Text>
        </View>
      </View>
    </Modal>
  );
}
