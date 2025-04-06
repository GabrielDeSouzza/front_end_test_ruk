import React, { useEffect, useState } from 'react';
import { Modal, View, Animated, StyleSheet, Text } from 'react-native';

interface ToastMessageProps {
  message: string;
  isError?: boolean;
}

export default function ToastMessage({ message, isError }: ToastMessageProps) {
  const [visible, setVisible] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  if (!visible) return null;

  return (
    <Modal transparent visible animationType="none">
      <View style={StyleSheet.absoluteFill}>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            opacity: fadeAnim,
            elevation: 10,
          }}
        >
          <Text
            className={`font-bold  px-4 py-2 rounded-xl shadow-lg ${
              isError ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {message}
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
}
