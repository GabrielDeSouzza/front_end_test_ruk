import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import '../global.css';

export default function Index() {
  const [x, setX] = useState(0);
  const count = () => {
    setX(x + 1);
  };
  return (
    <View className="bg-slate-600">
      <Text onPress={count} className="float-end bg-red-700">
        Hello Word {x}
      </Text>
      <Button title="count" onPress={count}></Button>
    </View>
  );
}
