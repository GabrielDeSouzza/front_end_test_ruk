import { LoginForm } from '@/src/components/forms/LoginForm';
import { View } from 'react-native';
import 'react-native-get-random-values';

export default function SignIn() {
  return (
    <View className="w-screen h-screen">
      <LoginForm></LoginForm>
    </View>
  );
}
