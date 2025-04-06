import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '../../baseComponents/InputForm';
import { useAuth } from '@/src/context/AuthContext';
import { signUpSchema, signUpSchemaType } from './schema';
import { Button, ScrollView, View } from 'react-native';
import TelephonesInputs from '../../baseComponents/TelephonesInputs';
import { useEffect, useState } from 'react';
import ToastMessage from '../../baseComponents/ModalMessage';
import { router } from 'expo-router';
import LoadingModal from '../../baseComponents/LoadingModal';

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, SetStatusCode] = useState<number | undefined>(undefined);
  const methods = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      telephones: [{ areaCode: '', phoneNumber: '' }],
    },
  });

  const { signUp } = useAuth();
  const handlerSubmit = async (data: signUpSchemaType) => {
    setIsLoading(true);
    SetStatusCode(0);
    SetStatusCode(await signUp(data));
    setIsLoading(false);
  };
  useEffect(() => {
    if (statusCode === 201) {
      router.navigate('/Index');
    }
  });
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
      }}
    >
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
            autoCapitalize="none"
          />
          <InputForm
            control={methods.control}
            name="password"
            placeholder="Crie uma Senha"
            tittle="Senha"
            autoCapitalize="none"
          />
          <TelephonesInputs control={methods.control} name="telephones" />
          <Button
            title="SALVAR"
            onPress={methods.handleSubmit(handlerSubmit)}
          />
        </View>
        <LoadingModal
          visible={isLoading}
          message="Criando Conta"
        ></LoadingModal>
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
    </ScrollView>
  );
}
