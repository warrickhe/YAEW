import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import base64 from 'base-64';
import FlipCard from 'react-native-flip-card';
import { LinearGradient } from 'expo-linear-gradient';

const BACKEND_URL = 'http://192.168.1.100:7272';

const ItemSeparatorComponent = () => <View style={styles.separator} />;

export default function InfoPage({ navigation, route }) {
  const [deviceID, setDeviceID] = useState('');
  const [speciesName, setSpeciesName] = useState(route.params.data);
  const [numFound, setNumFound] = useState(0);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

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
      console.log('fetching specific species data');
      try {
        const response = await fetch(
          `${BACKEND_URL}/info/long?device_id=${deviceID}&species=${speciesName}`,
          {
            method: 'GET',
          }
        );

        if (response.ok) {
          const resData = await response.json();
          console.log(resData);
          setNumFound(resData.num_found);
          setDescription(resData.description);
          setImages(resData.user_images);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchIndexData();
  }, [deviceID]);

  // Check if `item.image` has binary data and convert to base64
  function convertBinary(image) {
    if (image && image.$binary && image.$binary.base64) {
      return `data:image/png;base64,${image.$binary.base64}`;
    }
  }

  const handleImageClick = (image) => {
    // Navigate to screen "a" and pass the clicked image data as a parameter
    navigation.navigate('DetailInfo', { imageData: image, speciesName });
  };

  return (
    <View style={styles.container}>
    <FlipCard style={styles.whiteBox}>
        {/* Front Side */}
        <View style={styles.front}>
            {/* Main Image */}
            <Image
                source={require('../images/index-placeholder-image.jpg')}
                style={[styles.mainImage, { width: '150%', height: 150, resizeMode: 'cover' }]}
                resizeMode="contain"
            />
            <View>
                <Text style={styles.NameText}>{speciesName}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.bubbleText}>Found: {numFound}</Text>
            </View>

            {/* Description */}
            <View style={styles.separator} />
            <Text>Photos</Text>

            {/* User Images Row */}
            {/* Use ScrollView with horizontal prop set to true */}
            <ScrollView horizontal style={styles.userImagesRow}>
                {images.map((image, index) => (
                    <TouchableOpacity
                        key={`${speciesName}-${index}`}
                        style={styles.userImageContainer}
                        onPress={() => handleImageClick(convertBinary(image))}
                    >
                        {/* User Image */}
                        <Image
                            source={{ uri: convertBinary(image) }}
                            style={styles.userImage}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

        {/* Back Side */}
        <View style={styles.back}>
            <Text style={styles.backText}>{description}</Text>
        </View>
    </FlipCard>
</View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDEBC5',
    padding: 10,
  },
  separator: {
    height: 2,
    width: '70%',
    backgroundColor: '#808080',
    marginTop: 10,
    marginBottom: 10,
  },
  NameText:{
    fontSize:20,
    padding:5,
    
  },
  whiteBox: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    marginTop: 150,
    marginBottom: 150,
    borderWidth: 5, // Add border width
    borderColor: '#7EA3A7',
    alignItems: 'center',
    justifyContent: 'center',
    // Remove fixed height or set it to 'auto' to allow the card to adjust
    height: 'auto',
},
  front: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  backText: {
    color: 'black',
    fontSize: 15,
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 20,
  },
  box: {
    backgroundColor: '#8FC5B5',
    padding: 7,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  landingPage: {
    flex: 1,
    width: "100%",
    height: 852,
    backgroundColor: "transparent",
    overflow: "hidden"
    },
  bubbleText: {
    color: 'white',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    color: 'black',
  },
  userImagesRow: {
    marginTop: 10,
    marginBottom: 20,
  },
  userImageContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  userImage: {
    width: 100, // Adjust the width as desired
    height: 100, // Adjust the height as desired
    borderRadius: 8,
},
});