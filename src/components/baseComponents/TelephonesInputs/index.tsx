import { useFieldArray } from 'react-hook-form';
import { ControlProps } from '../../utils/ControlledProps';
import { Button, View } from 'react-native';
import InputForm from '../InputForm';

export interface TelephonesInputsProps extends ControlProps {}

export default function TelephonesInputs({
  name,
  control,
}: TelephonesInputsProps) {
  const { fields, append, remove } = useFieldArray({ name, control });

  return (
    <View className="w-full justify-center">
      {fields.map((item, index) => {
        return (
          <View key={item.id} className="">
            <InputForm
              control={control}
              name={`${name}.${index}.phoneNumber`}
              placeholder="Telefone"
              tittle="Telefone"
            />
            <InputForm
              control={control}
              name={`${name}.${index}.areaCode`}
              placeholder="DDD"
              tittle="DDD"
            />
            <Button title="X" onPress={() => remove(index)} />
          </View>
        );
      })}
      <View>
        <Button title="ADD TELEFONE" onPress={() => append(undefined)}></Button>
      </View>
    </View>
  );
}
