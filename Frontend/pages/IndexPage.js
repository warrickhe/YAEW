import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';

const BACKEND_URL = 'http://192.168.1.100:7272';

export default function IndexPage({ navigation }) {
  const [deviceID, setDeviceID] = useState('');
  const [indexData, setIndexData] = useState([]);

  useEffect(() => {
    const fetchDeviceID = async () => {
      let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
      setDeviceID(fetchUUID);
    };

    fetchDeviceID();
  }, []);

  useEffect(() => {
    if (!deviceID) return; // Return early if deviceID is not set

    const fetchIndexData = async () => {
      console.log('fetching index data');
      try {
        const response = await fetch(`${BACKEND_URL}/collection?device_id=${deviceID}`, {
          method: 'GET',
        });

        if (response.ok) {
          const resData = await response.json();
          setIndexData(resData.animals);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchIndexData();
  }, [deviceID]);

  // Function to handle navigation when an image is clicked
  const handleImageClick = (speciesName) => {
    // Navigate to screen "a" and pass the clicked image data as a parameter
    navigation.navigate('InfoPage', { data: speciesName });
  };

  // Function to render each row of three images
  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        {item.map((speciesName, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageClick(speciesName)}>
            {/* TODO: CHANGE IMAGE URL */}
            <Image source={require('../images/index-placeholder-image.jpg')} style={styles.image} />
            <Text style={styles.image_text}>{speciesName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Group data into rows of three
  const groupedData = [];
  let dataCopy = indexData;
  for (let i = 0; i < dataCopy.length; i += 3) {
    groupedData.push(dataCopy.slice(i, i + 3));
  }

  return (
    <>
      <LinearGradient
        style={styles.landingPage}
        locations={[0.29, 1]}
        colors={['#ebf9c9', '#96e6a1']}
        useAngle={true}
        angle={168.15}
      >
        <View style={styles.centeredContainer}>
          <Text style={styles.titleText}>Index</Text>
          <Text style={styles.subtitleText}>Total Species Collected: {indexData.length}</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            data={groupedData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </LinearGradient>
    </>
  );
}

//TODO: Add Home Button.

const styles = StyleSheet.create({
  landingPage: {
    flex: 1,
    width: '100%',
    height: 852,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    marginBottom: -50,
    //backgroundColor: '#CDEBC5',
    width: '100%',
  },
  container: {
    flex: 1,
    //backgroundColor: '#CDEBC5', // Fill the screen with green
  },
  titleText: {
    fontSize: 30,
    marginTop: 0,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2F5361',
  },
  subtitleText: {
    fontSize: 20,
    color: '#6D9195',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    margin: 5, // Add margin around each image
    borderRadius: 10,
  },
  image_text: {
    textAlign: 'center',
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 11,
    color: '#2F5361',
  },
});
