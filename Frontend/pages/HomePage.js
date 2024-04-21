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
      <View style={styles.container}>
        <View style={styles.main_buttonContainer}>
          <Text style={styles.TitleText}>WELCOME BACK</Text>
          <Text style={styles.TitleText}>{username}!!</Text>
          <View style={styles.stats_container}>
            <View style={styles.stats_box}>
              <Text style={styles.stats_Text}>Total Points</Text>
              <Text style={styles.stats_Text}>{points}</Text>
            </View>
            <View style={styles.stats_box}>
              <Text style={styles.stats_Text}>Discoveries</Text>
              <Text style={styles.stats_Text}>{totalCaptures}</Text>
            </View>
            <View style={styles.stats_box}>
              <Text style={styles.stats_Text}>Species Found</Text>
              <Text style={styles.stats_Text}>{uniqueSpecies}</Text>
            </View>
          </View>
        </View>

        {/* Buttons in Rows */}
        <View style={styles.row}>
          {/* Row 1 */}
          <View style={styles.buttonContainer}>
            <Button title="Upload!" onPress={() => navigation.navigate('ImagePickerPage')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Journal!" onPress={() => navigation.navigate('JournalPage')} />
          </View>
        </View>

        <View style={styles.row}>
          {/* Row 2 */}
          <View style={styles.buttonContainer}>
            <Button title="Index!" onPress={() => navigation.navigate('IndexPage')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="QuizPage" onPress={() => navigation.navigate('QuizPage')} />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  TitleText: {
    marginTop: 20,
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#CDEBC5',
    alignItems: 'center',
    width: '100%',
  },
  main_buttonContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    width: '90%',
  },
  buttonContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    width: '45%', // Set each button's width to 45% for rows
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  stats_Text: {
    padding: 5,
    color: '#6D9195',
  },
  stats_Number: {
    padding: 5,
  },
  stats_container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  stats_box: {
    marginRight: 10,
    backgroundColor: '#E1EDF4',
    borderRadius: 10,
  },
  camera: {
    height: '50%',
    width: '100%',
  },
});
