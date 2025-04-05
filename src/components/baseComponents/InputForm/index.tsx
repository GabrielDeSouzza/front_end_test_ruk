import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { ControlProps } from '../../utils/ControlledProps';
import ErrorMessage from '../ErrorText';

export interface InputFormProps extends ControlProps {
  placeholder: string;
  tittle: string;
  secureTextEntry?: boolean;
}

export default function InputForm({
  control,
  name,
  placeholder,
  tittle,
  secureTextEntry,
}: InputFormProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <View className=" border-solid w-11/12 p-1">
            <Text className="p-1">{tittle}</Text>
            <TextInput
              secureTextEntry={secureTextEntry}
              className={`pt-6 pb-2 px-3 rounded bg-gray-100 border ${
                error ? 'border-red-500' : 'border-transparent'
              } text-base text-black`}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
            />
            {error && <ErrorMessage message={error.message}></ErrorMessage>}
          </View>
        );
      }}
    />
  );
}
