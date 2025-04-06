import { FormProvider, useForm } from 'react-hook-form';
import { loginFormSchema, loginFormSchemaType } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '../../baseComponents/InputForm';
import { Button, Text, View } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import ToastMessage from '../../baseComponents/ModalMessage';
import LoadingModal from '../../baseComponents/LoadingModal';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [statusCode, setStatusCode] = useState<number | undefined>(undefined);
  const { signIn } = useAuth();
  const handlerSubmit = async (data: loginFormSchemaType) => {
    setIsLoading(true);
    setStatusCode(0);
    const resultCode = await signIn(data);
    setStatusCode(resultCode);
    setIsLoading(false);
  };
  useEffect(() => {
    if (statusCode === 200 || statusCode === 201) {
      router.navigate('/home');
    }
  }, [statusCode]);
  return (
    <View className="w-full  justify-center items-center h-4/5">
      <FormProvider {...methods}>
        <View className="justify-center items-center  bg-blue-100 border rounded-md ww w-11/12">
          <InputForm
            control={methods.control}
            name="email"
            placeholder="Digite seu Email"
            tittle="Email"
            autoCapitalize="none"
          />
          <InputForm
            control={methods.control}
            name="password"
            placeholder="Digite sua senha"
            tittle="Senha"
            secureTextEntry
            autoCapitalize="none"
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
              <Text className="text-center">CADASTRAR-SE</Text>
            </Link>
          </View>
        </View>
      </FormProvider>
      {statusCode === 401 && <ToastMessage isError message="SENHA INCORRETA" />}
      {statusCode === 404 && (
        <ToastMessage isError message="CADASTRO NÃO LOCALIZADO" />
      )}
      {statusCode &&
        statusCode >= 400 &&
        statusCode !== 401 &&
        statusCode !== 404 && (
          <ToastMessage isError message="ERRO AO REALIZAR LOGIN" />
        )}

      <LoadingModal visible={isLoading} message="Logando"></LoadingModal>
    </View>
  );
}
