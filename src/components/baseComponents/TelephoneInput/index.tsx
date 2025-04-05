import { TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import ErrorMessage from '../ErrorText';
import { ControlProps } from '../../utils/ControlledProps';

export default function TelephoneInput({ control, name }: ControlProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <TextInput onChange={onChange} value={value}></TextInput>
            <ErrorMessage message={error?.message} />
          </>
        );
      }}
    ></Controller>
  );
}
