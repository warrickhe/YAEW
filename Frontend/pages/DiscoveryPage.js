import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const BACKEND_URL = 'http://192.168.1.100:7272';

// Define the data with questions, correct and wrong answers
// const data = {
//   name: 'monkey',
//   points: 3,
//   image_url:
//     'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg',
//   description: "It's a cat, a cute cat, a funny cat, a good cat",
// };

export default function DiscoveryPage({ navigation, route }) {
  const [deviceID, setDeviceID] = useState('');

  const data = route.params.data;

  useEffect(() => {
    const fetchDeviceID = async () => {
      let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
      setDeviceID(fetchUUID);
    };

    fetchDeviceID();
  }, []);

  function handleClick() {
    navigation.navigate('HomePage');
  }

  function convertBinary(image) {
    if (image && image.$binary && image.$binary.base64) {
      return `data:image/png;base64,${image.$binary.base64}`;
    }
  }

  return (
    <LinearGradient style={styles.landingPage} locations={[0.29, 1]} colors={['#ebf9c9', '#96e6a1']} useAngle={true} angle={168.15}>
    <View style={styles.container}>
      {/* White box containing the quiz question */}
      <View style={styles.whiteBox}>
        <Text style={styles.TitleText}>You Found A {data.animal}!</Text>
        <Text style={styles.PointText}>+5 points!</Text>
        {/* <Image source={{ uri: data.image_url }} style={styles.image} /> */}
        {/* <Text style={styles.DescriptionText}>{data.description}</Text> */}
        <View style={styles.okButtonContainer}>
          <Button
            title="OK"
            onPress={() => {
              handleClick();
            }}
            color="white"
          />
        </View>
      </View>

      {/* OK button */}
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#CDEBC5',
  },
  landingPage: {
    flex: 1,
    width: "100%",
    height: 852,
    backgroundColor: "transparent",
    overflow: "hidden"
    },
  image: {
    width: 300, // Adjust width as needed
    height: 200, // Adjust height as needed
    marginLeft: 0,
    margin: 5, // Add margin around each image
  },
  whiteBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 100,
    borderColor:'#7EA3A7',
    borderWidth: 4,
  },
  DescriptionText: {
    fontSize: 25,
    marginBottom: 30,
    marginTop: 20,
  },
  TitleText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  PointText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    alignContent: 'center',
    color: 'grey',
  },
  okButtonContainer: {
    backgroundColor: '#67B389',
    borderRadius: 20,
    marginLeft: 100,
    marginTop:30,
    width: 100,
  },
});
