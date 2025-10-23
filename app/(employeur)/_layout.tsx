import { Stack } from 'expo-router';

export default function EmployeurLayout() {
  return (
    <Stack>
      <Stack.Screen name="accueil" options={{ title: 'Accueil Employeur' }} />
      <Stack.Screen name="creer-mission" options={{ headerShown: false }} />
      <Stack.Screen name="freelances" options={{ title: 'Freelances' }} />
      <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="messages" options={{ title: 'Messages' }} />
      <Stack.Screen name="compte" options={{ title: 'Mon Compte' }} />
    </Stack>
  );
}
