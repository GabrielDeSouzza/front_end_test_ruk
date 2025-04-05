import { View } from 'react-native';
import '../global.css';
import { LoginForm } from '../components/forms/LoginForm/LoginForm';

export default function Index() {
  return (
    <View className=" w-full justify-center items-center h-4/5">
      <LoginForm />
    </View>
  );
}
