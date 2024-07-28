import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const dummyUserData = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  profilePicture: 'https://example.com/profile.jpg', // Replace with a real image URL
};

export const AccountView = ({ speed, coordinates, passengers, completedPassengers, active, onLogout }: any) => {
  return (
    <View style={[styles.container, { display: active ? 'flex' : 'none' }]}>
      <Image source={{ uri: dummyUserData.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.name}>{dummyUserData.name}</Text>
      <Text style={styles.email}>{dummyUserData.email}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Speed:</Text>
        <Text style={styles.value}>{speed} km/h</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Coordinates:</Text>
        <Text style={styles.value}>{`Lat: ${coordinates.latitude}, Lng: ${coordinates.longitude}`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Passengers:</Text>
        <Text style={styles.value}>{passengers.length}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Completed Passengers:</Text>
        <Text style={styles.value}>{completedPassengers.length}</Text>
      </View>
      <Button title="Logout" onPress={onLogout} color="#d9534f" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#777',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});

export default AccountView;
