import { Stack } from 'expo-router';

export default function FreelanceLayout() {
  return (
    <Stack>
      <Stack.Screen name="accueil" options={{ title: 'Accueil Freelance' }} />
      <Stack.Screen name="missions" options={{ title: 'Missions' }} />
      <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="messages" options={{ title: 'Messages' }} />
      <Stack.Screen name="compte" options={{ title: 'Mon Compte' }} />
    </Stack>
  );
}
