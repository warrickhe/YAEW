import React, { useEffect, useState } from 'react';
import { Text, Button, Image, View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const BACKEND_URL = 'http://192.168.1.100:7272';

//80282bd4-81f7-46d7-9f43-a9fb268289cb
//47bce7ca-ebd6-475f-a183-91c7c893e03e

export default function LandingPage({ navigation }) {
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const initializeUuid = async () => {
      let currentUuid = uuidv4(); // Generate a new UUID
      let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
      console.log('fetchUUID ' + fetchUUID);

      if (fetchUUID) {
        currentUuid = fetchUUID;
      } else {
        await SecureStore.setItemAsync('secure_deviceid', currentUuid.toString());
      }

      setUuid(currentUuid);
    };

    initializeUuid();
  }, []);

  const checkIfUserExists = async () => {
    console.log('checking if user exists');

    if (!uuid) {
      console.error('UUID is not initialized');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/getid?device_id=${uuid}`, {
        method: 'GET',
      });

      if (response.status === 204) {
        // throw new Error('No ID found');
        console.log('no username, redirecting to CREATE USER PAGE');
        navigation.navigate('CreateUserPage');
        return;
      }

      if (response.status === 200) {
        console.log('User exists, redirecting to HOME PAGE');
        // console.log('deviceID from landingpage: ' + uuid);
        // const resData = await response.json();
        // await SecureStore.setItemAsync('username', resData.username);
        navigation.navigate('HomePage');
      }
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
