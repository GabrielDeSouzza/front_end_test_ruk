import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function Index() {
  const [x, setX] = useState(0);
  const count = () => {
    setX(x + 1);
  };
  return (
    <View>
      <Text onPress={count}>Hello Word {x}</Text>
      <Button title="count" onPress={count}></Button>
    </View>
  );
}
