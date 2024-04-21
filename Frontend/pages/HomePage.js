import React, { useState, useEffect } from 'react';
import { Text, Button, Image, View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const BACKEND_URL = 'http://192.168.1.100:7272';

export default function HomePage({ navigation }) {
  const [deviceID, setDeviceID] = useState('');
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(0);
  const [totalCaptures, setTotalCaptures] = useState(0);
  const [uniqueSpecies, setUniqueSpecies] = useState(0);

  useEffect(() => {
    const fetchDeviceID = async () => {
      let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
      setDeviceID(fetchUUID);
    };

    fetchDeviceID();
  }, []);

  useEffect(() => {
    if (!deviceID) return; // Return early if deviceID is not set

    const fetchProfile = async () => {
      console.log('fetching profile');
      try {
        const response = await fetch(`${BACKEND_URL}/profile?device_id=${deviceID}`, {
          method: 'GET',
        });

        if (response.ok) {
          // console.log('response: ' + response);
          const resData = await response.json();
          setUsername(resData.username);
          setPoints(resData.points);
          setTotalCaptures(resData.total_captures);
          setUniqueSpecies(resData.unique_species);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchProfile();
  }, [deviceID]);

  return (
    <>
      <View>
        <Text>WELCOME BACK {username}</Text>
        <View style={styles.stats_container}>
          <View style={styles.stats_box}>
            <Text>Total Points</Text>
            <Text>{points}</Text>
          </View>
          <View style={styles.stats_box}>
            <Text>Discoveries</Text>
            <Text>{totalCaptures}</Text>
          </View>
          <View style={styles.stats_box}>
            <Text>Species Found</Text>
            <Text>{uniqueSpecies}</Text>
          </View>
        </View>
      </View>

      <View>
        <Button title="Upload!" onPress={() => navigation.navigate('UploadPage')}></Button>
        <Button title="Journal!" onPress={() => navigation.navigate('JournalPage')}></Button>
        <Button title="Index!" onPress={() => navigation.navigate('IndexPage')}></Button>
        <Button title="Info!" onPress={() => navigation.navigate('InfoPage')}></Button>
        <Button title="DetailInfo" onPress={() => navigation.navigate('DetailInfo')}></Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  stats_container: {
    display: 'flex',
    flexDirection: 'row',
  },
  stats_box: {
    marginRight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  camera: {
    height: '50%',
    width: '100%',
  },
});
