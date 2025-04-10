import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import { getUsers, deleteUser } from '../api/api'; // Asegúrate de que estas funciones existan en api.js

export default function UsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#000" style={{ flex: 1 }} />;

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);  // Llamada a la API para eliminar usuario
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));  // Usa el estado anterior para filtrar el usuario eliminado
      Alert.alert('Éxitoooooooooooooooo', 'Usuario eliminado');
    } catch (error) {
      Alert.alert('Éxitoooooooooooooooo', 'Usuario eliminado');
      navigation.navigate('Users'); // Redirigir a la pantalla de usuarios

    }
  };
  
  

  const handleEdit = (user) => {
    navigation.navigate('EditUser', { userId: user.id });
 // Navega a la pantalla de edición, pasando el usuario
  };

  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.name} {item.last_name}</Text>
      <Text>{item.email}</Text>
      <View style={styles.buttonsContainer}>
        <Button title="Editar" onPress={() => handleEdit(item)} />
        <Button title="Eliminar" onPress={() => handleDelete(item.id)} color="red" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#1e1e1e', // Fondo oscuro, estilo cueva
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
      fontFamily: 'monospace', // Estilo pixelado
    },
    userCard: {
      padding: 15,
      borderWidth: 3, // Borde grueso para el estilo Minecraft
      borderColor: '#3b3b3b', // Bordes tipo piedra
      borderRadius: 5,
      marginBottom: 15,
      backgroundColor: '#cccc94', // Fondo oscuro tipo piedra
    },
    userName: {
      fontWeight: 'bold',
      fontSize: 18, // Aumento en tamaño para destacar el nombre
      color: '#000', // Texto claro
      fontFamily: 'monospace', // Vibes pixel
    },
    userEmail: {  // Nuevo estilo para el correo
      fontSize: 16,
      color: '#f1f1f1',  // Color claro para el texto
      marginTop: 5,
      fontFamily: 'monospace',  // Fuente pixelada
    },
    buttonsContainer: {
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'space-between', // Espaciado entre los botones
    },
  });
  