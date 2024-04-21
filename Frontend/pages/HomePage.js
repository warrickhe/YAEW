import React, { useState, useEffect } from 'react';
import { Text, Button, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient
      style={styles.container}
      locations={[0.29, 1]}
      colors={['#ebf9c9', '#96e6a1']}
      useAngle={true}
      angle={168.15}
    >
      <View style={styles.container}>
        <View style={styles.main_buttonContainer}>
          <Text style={styles.TitleText}>WELCOME BACK</Text>
          <Text style={styles.TitleText}>{username}!</Text>
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
            <Image source={require('../assets/capture.png')} style={styles.icon} />
            <TouchableOpacity onPress={() => navigation.navigate('ImagePickerPage')}>
              <Text style={styles.button_text}>CAPTURE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Image source={require('../assets/journal.png')} style={styles.icon} />
            <TouchableOpacity onPress={() => navigation.navigate('JournalPage')}>
              <Text style={styles.button_text}>JOURNAL</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          {/* Row 2 */}
          <View style={styles.buttonContainer}>
            <Image source={require('../assets/index.png')} style={styles.index_icon} />
            <TouchableOpacity onPress={() => navigation.navigate('IndexPage')}>
              <Text style={styles.button_text}>INDEX</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Image source={require('../assets/quiz.png')} style={styles.icon} />
            <TouchableOpacity onPress={() => navigation.navigate('QuizPage')}>
              <Text style={styles.button_text}>QUIZ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  TitleText: {
    marginTop: 20,
    fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  main_buttonContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    width: '95%',
    height: '30%',
    borderRadius: 10,
    borderTopWidth: 5,
    borderTopColor: '#557E82',
    backgroundColor: '#F7FAF9',
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: '25%',
  },
  buttonContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 40,
    width: '45%', // Set each button's width to 45% for rows
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#7EA3A7',
    backgroundColor: '#F7FAF9',
    // iOS shadow properties
    shadowOffset: { width: 0, height: 4 }, // Horizontal and vertical shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius

    // Android shadow properties
    elevation: 6, // Shadow elevation for Android
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  stats_top_text: {
    fontSize: 10,
  },
  stats_Text: {
    padding: 5,
    color: '#44686C',
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
    shadowColor: 'rgba(0, 0, 0, 0.10)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
    alignContent: 'center',
  },
  camera: {
    height: '50%',
    width: '100%',
  },
  button_text: {
    color: '#44686C',
    fontSize: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 10,
  },
  index_icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    marginTop: 10,
  },
});
