import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text, Alert, Keyboard } from 'react-native';

const LoginScreen = ({ active, onSuccess }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Keyboard.dismiss();
    if (username === 'user' && password === 'pass') {
        onSuccess();
    } else {
      // Handle failed login
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <View style={[styles.container, { display: active ? 'flex' : 'none'}]}>
      {/* <Image
        source={require('../assets/dmfs/icon.png')} // Replace with your logo URL
        style={styles.logo}
      /> */}
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" color="#059669" onPress={handleLogin} />
      </View>
      <Text style={{ marginTop: 30, fontWeight: 'bold' }}>DFMS v1.0</Text>
      <Text style={{ color: 'gray' }}>Distance Fare Computation System</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#059669'
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#4ade80',
    borderRadius: 5,
    height: 40,
    overflow: 'hidden',
  },
});

export default LoginScreen;
