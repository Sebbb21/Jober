import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function EmployeurAccueilPage() {
  const handleCreerMission = () => {
    router.push('/(employeur)/creer-mission');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accueil Employeur</Text>
      <TouchableOpacity style={styles.button} onPress={handleCreerMission}>
        <Text style={styles.buttonText}>Créer une mission</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333333',
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
