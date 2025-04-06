import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '../../baseComponents/InputForm';
import { useAuth } from '@/src/context/AuthContext';
import { signUpSchema, signUpSchemaType } from './schema';
import { Button, View } from 'react-native';
import TelephonesInputs from '../../baseComponents/TelephonesInputs';
import { useEffect, useState } from 'react';
import ToastMessage from '../../baseComponents/ModalMessage';
import { router } from 'expo-router';

export function SignUpForm() {
  const methods = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      telephones: [],
    },
  });
  const [statusCode, SetStatusCode] = useState<number | undefined>(undefined);
  const { signUp } = useAuth();
  const handlerSubmit = async (data: signUpSchemaType) => {
    SetStatusCode(0);
    SetStatusCode(await signUp(data));
  };
  useEffect(() => {
    if (statusCode === 201) {
      router.navigate('/Index');
    }
  });

  return (
    <View className="w-full justify-center items-center h-4/5">
      <FormProvider {...methods}>
        <View className="justify-center items-center  bg-blue-100 border rounded-md ww w-11/12">
          <InputForm
            control={methods.control}
            name="name"
            placeholder="Digite seu Nome"
            tittle="Nome"
          />
          <InputForm
            control={methods.control}
            name="email"
            placeholder="Digite seu Email"
            tittle="Email"
          />
          <InputForm
            control={methods.control}
            name="password"
            placeholder="Crie uma Senha"
            tittle="Senha"
          />
          <TelephonesInputs control={methods.control} name="telephones" />
          <Button
            title="SALVAR"
            onPress={methods.handleSubmit(handlerSubmit)}
          />
        </View>
        {statusCode === 409 && (
          <ToastMessage
            isError
            message="EMAIL EM USO POR OUTRO USUARIO"
          ></ToastMessage>
        )}
        {statusCode === 400 && (
          <ToastMessage isError message="ERRO AO CRIAR USUARIO"></ToastMessage>
        )}
      </FormProvider>
    </View>
  );
}
