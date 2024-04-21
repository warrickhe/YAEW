import React, { useEffect, useState } from 'react';
import { TextInput, Text, Button, Image, View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const BACKEND_URL = 'http://10.226.3.49:7272';

export default function CreateUserPage({ navigation }) {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text); // Update the state when the input changes
  };

  const handleSubmit = async () => {
    console.log('Username entered:', username);

    let device_id = await SecureStore.getItemAsync('secure_deviceid');

    if (username === '') {
      console.error('No username entered');
      return;
    }

    console.log(`${BACKEND_URL}/makeuser?device_id=${device_id}&username=${username}`);

    try {
      const response = await fetch(
        `${BACKEND_URL}/makeuser?device_id=${device_id}&username=${username}`,
        {
          method: 'GET',
        }
      );

      if (response.status === 200) {
        await SecureStore.setItemAsync('username', username);
        navigation.navigate('HomePage');
        return;
      }

      if (response.status === 204) {
        console.log('Username already taken! Try again');
        return;
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <Text>Hold on! Looks like you don't have an account yet. Let's make one for you. </Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={handleUsernameChange}
        placeholder="Choose a username"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray', // Border color for the TextInput
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20, // Spacing between TextInput and Button
  },
});
