import { Text } from 'react-native';

export default function ErrorMessage({ message }: { message?: string }) {
  return (
    <>
      <Text className="text-red-500">{message}</Text>
    </>
  );
}
