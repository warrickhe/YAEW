import React, { useEffect, useState } from 'react';
import { Text, Button, Image, View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const BACKEND_URL = 'http://10.226.3.49:7272';

//80282bd4-81f7-46d7-9f43-a9fb268289cb
//47bce7ca-ebd6-475f-a183-91c7c893e03e

export default function LandingPage({ navigation }) {
  // const [username, setUsername] = useState(null);
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const initializeUuid = async () => {
      let currentUuid = uuidv4(); // Generate a new UUID
      let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');

      if (fetchUUID) {
        currentUuid = fetchUUID;
      } else {
        await SecureStore.setItemAsync('secure_deviceid', currentUuid.toString());
      }

      setUuid(currentUuid);
    };

    initializeUuid();
    console.log(uuid);
  }, []);

  const checkIfUserExists = async () => {
    console.log('checking if user exists');
    console.log(uuid);

    if (!uuid) {
      console.error('UUID is not initialized');
      return;
    }

    try {
      // Send UUID as a query parameter in the GET request
      const response = await fetch(`${BACKEND_URL}/getid?device_id=${uuid}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.status === 204) {
        // throw new Error('No ID found');
        navigation.navigate('CreateUserPage');
        return;
      }

      const resData = await response.json(); // Parse response data
      console.log('Server response:', resData);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <View>
        <View>
          <Text>LOGO</Text>
          <Text>WELCOME!</Text>
          <Text>Discover the nature around you.</Text>
          <Button title="Get Started" onPress={checkIfUserExists}></Button>
        </View>
      </View>
    </>
  );
}
