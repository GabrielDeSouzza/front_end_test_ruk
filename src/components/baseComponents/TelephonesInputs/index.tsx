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
    <View className="flex w-11/12 ">
      <View className=" flex-row flex-wrap gap-3 my">
        {fields.map((item, index) => {
          return (
            <View key={item.id} className="max-w-56">
              <View className="flex-row">
                <View className="w-24">
                  <InputForm
                    control={control}
                    name={`${name}.${index}.areaCode`}
                    placeholder="DDD"
                    tittle="DDD"
                  />
                </View>
                <View className="w-36">
                  <InputForm
                    control={control}
                    name={`${name}.${index}.phoneNumber`}
                    placeholder="Telefone"
                    tittle="Telefone"
                  />
                </View>
              </View>
              <View className="">
                <Button title="X" onPress={() => remove(index)} />
              </View>
            </View>
          );
        })}
      </View>
      <View className="m-1.5">
        <Button title="ADD TELEFONE" onPress={() => append(undefined)}></Button>
      </View>
    </View>
  );
}
