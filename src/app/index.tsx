import { LoginForm } from '@/src/components/forms/LoginForm';
import { Button, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const { session, signOut } = useAuth();
  return (
    <View className="w-screen h-screen">
      {session ? (
        <Button title="sair" onPress={signOut} />
      ) : (
        <LoginForm></LoginForm>
      )}
    </View>
  );
}
