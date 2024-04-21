import React, { useEffect, useState } from 'react';
import { Text, Button, Image, View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
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
    <LinearGradient style={styles.landingPage} locations={[0.29,1]} colors={['#ebf9c9','#96e6a1']} useAngle={true} angle={168.15}>
  <View style={styles.logoContainer}>
          <View>
          <Text style={styles.logo}>FloraFauna</Text>
            <Text style={styles.welcome}>WELCOME!</Text>
  
          </View>
          <Text style ={styles.subtitle}>Discover the nature around you.</Text>
        </View>
              <TouchableOpacity onPress={checkIfUserExists} style={styles.getStartedButton}>
          <Text style={styles.getStartedText}>GET STARTED</Text>
        </TouchableOpacity>
  </LinearGradient>);
      };


const styles = StyleSheet.create({
  landingPage: {
  flex: 1,
  width: "100%",
  height: 852,
  backgroundColor: "transparent",
  overflow: "hidden"
  },
  logoContainer: {
    marginTop:200,
  },
  logo: {
    lineHeight: 32,
      letterSpacing: -0.6,
      fontSize: 35,
      color: "#000",
      fontFamily: "Pacifico-Regular",
      marginBottom: 10,
      textAlign: "center"
  },
  welcome: {
    lineHeight: 32,
      fontSize: 32,
      color: "#000",
      fontFamily: "Roboto-Bold",
      marginBottom: 30,
      marginTop: 50,
      fontWeight: "800",
      marginLeft:100,
  },
  subtitle: {
    marginLeft:70,
    fontSize: 15,
      letterSpacing: -0.3,
      lineHeight: 15,
      fontFamily: "Roboto-Regular",
      color: "#000",
      marginBottom: 30,
      

  },
  getStartedButton: {
      position: "absolute",
      top: 500,
      left: 60,
      width: 300, // Adjust width as needed
      height: 60, // Adjust height as needed
      backgroundColor: "#fff",
      borderRadius: 30, // Make it pill-shaped
      borderWidth: 2, // Add a blue outline
      borderColor: "#74969a",
      justifyContent: "center",
      alignItems: "center"
    },
    getStartedText: {
      fontSize: 20,
      fontWeight: "700",
      color: "#74969a",
      letterSpacing: -0.4
    }
  
  
  });