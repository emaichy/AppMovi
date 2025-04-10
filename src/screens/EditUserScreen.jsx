import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fettchUser, updateUser } from '../api/api';


const EditUserScreen = () => {
  const { params } = useRoute();
  const { userId } = params;
  const [user, setUser] = useState({ name: '', last_name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fettchUser(userId);
        setUser({
          name: data.name,
          last_name: data.last_name,
          email: data.email,
          password: data.password, // guardamos el password actual para no perderlo
        });
      } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
        Alert.alert('Error', 'No se pudo obtener los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await updateUser(userId, user);  // Enviamos todo el user (incluyendo el password viejo)
      Alert.alert('Éxito', 'Usuario actualizado');
      navigation.navigate('Users');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      Alert.alert('Error', 'No se pudo actualizar el usuario');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={user.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={user.last_name}
        onChangeText={(text) => handleChange('last_name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={user.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <Button title="Guardar Cambios" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#1e1e1e', // Fondo oscuro estilo cueva Minecraft
    },
    header: {
      fontSize: 28,
      marginBottom: 20,
      textAlign: 'center',
      color: '#62c64d', // Verde Minecraft
      fontWeight: 'bold',
      textShadowColor: '#000',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 2,
    },
    input: {
      borderWidth: 3,
      borderColor: '#3b3b3b', // Bordes oscuros tipo piedra
      backgroundColor: '#cccc94', // Fondo del input oscuro
      color: '#000', // Texto claro
      padding: 12,
      marginBottom: 15,
      borderRadius: 2, // Bien cuadrado
      fontSize: 16,
      fontFamily: 'monospace', // Le da vibes pixel
    },
    button: {
      backgroundColor: '#62c64d', // Verde Minecraft
      paddingVertical: 12,
      borderRadius: 2,
      borderWidth: 3,
      borderColor: '#3b3b3b',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#1e1e1e', // Texto oscuro
      fontWeight: 'bold',
      fontSize: 16,
      letterSpacing: 1,
      fontFamily: 'monospace',
    },
  });
  

export default EditUserScreen;
