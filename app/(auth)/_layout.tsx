import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ title: 'Inscription' }} />
      <Stack.Screen name="abonnement-employeur" options={{ headerShown: false }} />
    </Stack>
  );
}
