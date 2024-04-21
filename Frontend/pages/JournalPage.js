import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import base64 from 'base-64';
import { LinearGradient } from 'expo-linear-gradient';
const BACKEND_URL = 'http://192.168.1.100:7272';

const ItemSeparatorComponent = () => <View style={styles.separator} />;

export default function JournalPage({ navigation }) {
  const [deviceID, setDeviceID] = useState('');
  const [journalData, setJournalData] = useState([]);

  useEffect(() => {
    const fetchDeviceID = async () => {
      let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
      setDeviceID(fetchUUID);
    };

    fetchDeviceID();
  }, []);

  useEffect(() => {
    if (!deviceID) return;

    const fetchJournalData = async () => {
      console.log('fetching journal data');
      try {
        const response = await fetch(`${BACKEND_URL}/journal?device_id=${deviceID}`, {
          method: 'GET',
        });

        const resData = await response.json();
        setJournalData(resData); // Set the state here
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchJournalData();
  }, [deviceID]);

  useEffect(() => {
    if (journalData) {
      console.log('Journal data updated', journalData);
    }
  }, [journalData]);

  const renderItem = ({ item }) => {
    const formattedDate = new Date(item.date.$date).toLocaleDateString();
    let imageData = null;

    // Check if `item.image` has binary data and convert to base64
    if (item.image && item.image.$binary && item.image.$binary.base64) {
      imageData = `data:image/png;base64,${item.image.$binary.base64}`; // Adjust based on image type (e.g., jpeg)
    }

    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: imageData }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.item}>Found a {item.animal}</Text>
          <Text style={styles.item}>Points +{item.points}</Text>
          <Text style={styles.item}>Found on {formattedDate}</Text>
        </View>
      </View>
    );
  };

  return (
    <><LinearGradient style={styles.landingPage} locations={[0.29, 1]} colors={['#ebf9c9', '#96e6a1']} useAngle={true} angle={168.15}>
      <View style={styles.centeredContainer}>
        <Text style={styles.titleText}>Journal</Text>
        <Text style={styles.subtitleText}>This is what you've been up to (^_^)</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.container}>
        
        <FlatList
          data={journalData}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
        
      </View>
      </LinearGradient>
    </>
    //TODO: Add Home Button
  );
}

const styles = StyleSheet.create({
    landingPage: {
        flex: 1,
        width: "100%",
        height: 852,
        backgroundColor: "transparent",
        overflow: "hidden"
        },
  container: {
    flex: 1,
    //backgroundColor: '#CDEBC5',
    justifyContent: 'center',
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    marginBottom: -70,
    //backgroundColor: '#CDEBC5',
    width: '100%',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#222222',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 50,
    marginTop: 10,
    width: '100%', // Full-width container
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Take up remaining space in the row
  },
  item: {
    fontSize: 16,
  },
  separator: {
    height: 0.5,
    width: '80%',
    backgroundColor: '#a9b3c4',
    marginTop: 10,
    alignSelf: 'center'
  },
});
