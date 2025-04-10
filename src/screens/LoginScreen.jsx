import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Para navegación
import { login } from '../api/api'; 

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation(); // Hook para navegación

  const handleLogin = async () => {
    setError('');
    try {
      const data = await login(email, password);
      if (data && data.access_token) {
        // Almacenar token de acceso
        Alert.alert('Login exitoso');
        navigation.navigate('Users'); // Redirigir a la pantalla de usuarios
      }
    } catch (err) {
      setError(err.message); // Mostrar error en caso de que ocurra
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN 💀</Text>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        required
      />
      <Button title="Ingresar" onPress={handleLogin} />
      <Button
        title="Crear Usuario"
        onPress={() => navigation.navigate('Register')} // Redirigir a la pantalla de registro
        color="gray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#1e1e1e', // Fondo oscuro tipo cueva
    },
    title: {
      fontSize: 28,
      marginBottom: 20,
      textAlign: 'center',
      color: '#62c64d', // Verde brillante Minecraft
      fontWeight: 'bold',
      textShadowColor: '#000',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 2,
      fontFamily: 'monospace', // Vibes pixel
    },
    input: {
      borderWidth: 3,
      borderColor: '#3b3b3b', // Bordes piedra
      backgroundColor: '#cccc94', // Fondo oscuro
      color: '#000', // Texto claro
      padding: 12,
      marginBottom: 15,
      borderRadius: 3, // Bien cuadrado
      fontSize: 16,
      fontFamily: 'monospace', // Vibes pixel
    },
    errorMessage: {
      color: 'red',
      marginBottom: 10,
      textAlign: 'center',
      fontSize: 16,
      fontFamily: 'monospace',
      fontWeight: 'bold',
    },
  });
  
