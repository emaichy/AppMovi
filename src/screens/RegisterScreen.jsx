import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { register } from '../api/api'; // Asegúrate de tener la función de registro en api.js

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    try {
      await register(name, lastName, email, password);
      Alert.alert('Registro exitoso', '¡Usuario creado correctamente!');
      navigation.navigate('Login'); // Redirige a la pantalla de login después del registro
    } catch (err) {
      setError(err.message); // Mostrar el error en caso de que ocurra
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Usuario</Text>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1e1e1e', // Fondo oscuro estilo cueva
  },
  title: {
    fontSize: 28, // Tamaño de texto más grande
    marginBottom: 20,
    textAlign: 'center',
    color: '#62c64d', // Verde brillante estilo Minecraft
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontFamily: 'monospace', // Estilo pixelado
  },
  input: {
    borderWidth: 2, // Borde más grueso para más énfasis
    padding: 12, // Aumenté el padding para más espacio
    marginBottom: 15, // Un poco más de margen
    borderRadius: 5,
    borderColor: '#3b3b3b', // Color del borde estilo piedra
    fontFamily: 'monospace', // Estilo de fuente pixelada
    fontSize: 16, // Tamaño de fuente adecuado
    backgroundColor: '#cccc94', // Fondo oscuro en el input
    color: '#000', // Texto claro dentro del input
  },
  errorMessage: {
    color: '#ff4d4d', // Rojo brillante para el mensaje de error
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'monospace', // Fuente pixelada
    fontSize: 16, // Aumenté el tamaño para que sea más visible
  },
});


