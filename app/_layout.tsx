import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
        <Stack
          screenOptions={{
            gestureEnabled: false,
            gestureDirection: 'horizontal',
            animation: 'none',
          }}
        >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="status-choice" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(employeur)" options={{ headerShown: false }} />
      <Stack.Screen name="(freelance)" options={{ headerShown: false }} />
    </Stack>
  );
}
