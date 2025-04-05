import { FormProvider, useForm } from 'react-hook-form';
import { loginFormSchema, loginFormSchemaType } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '../../baseComponents/InputForm';
import { Button, View } from 'react-native';

export function LoginForm() {
  const methods = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });
  const handlerSubmit = async (data: loginFormSchemaType) => {
    console.log(data);
    const response = await fetch('http://localhost:3000/auth/Sign', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(await response.json());
  };
  return (
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
        <Button
          title="ENVIAR"
          onPress={methods.handleSubmit(handlerSubmit)}
        ></Button>
      </View>
    </FormProvider>
  );
}
