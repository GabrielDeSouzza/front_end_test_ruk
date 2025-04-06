import { FormProvider, useForm } from 'react-hook-form';
import { loginFormSchema, loginFormSchemaType } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '../../baseComponents/InputForm';
import { Button, Text, View } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { Link } from 'expo-router';

export function LoginForm() {
  const methods = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });
  const { signIn } = useAuth();
  const handlerSubmit = async (data: loginFormSchemaType) => {
    await signIn(data);
  };
  return (
    <View className="w-full  justify-center items-center h-4/5">
      <FormProvider {...methods}>
        <View className="justify-center items-center  bg-blue-100 border rounded-md ww w-11/12">
          <InputForm
            control={methods.control}
            name="email"
            placeholder="Digite seu Email"
            tittle="Email"
          />
          <InputForm
            control={methods.control}
            name="password"
            placeholder="Digite sua senha"
            tittle="Senha"
            secureTextEntry
          />
          <View className="flex-row gap-4">
            <Button
              title="ENVIAR"
              onPress={methods.handleSubmit(handlerSubmit)}
            ></Button>
            <Link
              href={'/signUp'}
              className="flex items-center bg-slate-400 bs"
            >
              CADASTRAR-SE
            </Link>
          </View>
        </View>
      </FormProvider>
    </View>
  );
}
