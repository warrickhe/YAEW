import { useState, useEffect } from 'react';
import { Text, Button, Image, View, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

const BACKEND_URL = 'http://192.168.1.100:7272';

export default function ImagePickerExample({ navigation }) {
  const [deviceID, setDeviceID] = useState('');
  const [image, setImage] = useState(null);

  const [sentToBackend, setSentToBackend] = useState(false);

  useEffect(() => {
    const fetchDeviceID = async () => {
      let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
      setDeviceID(fetchUUID);
    };

    fetchDeviceID();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const sendImageToBackend = async () => {
    if (!image) {
      console.log('No image picked!');
      return;
    }

    setSentToBackend(true);

    const formattedData = new FormData();
    formattedData.append('file', {
      uri: image,
      name: 'uploaded_image.jpg',
      type: 'image/jpeg',
    });

    console.log('here is the image data');
    console.log(formattedData);

    try {
      const response = await fetch(`${BACKEND_URL}/capture?device_id=${deviceID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formattedData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully!');
        navigation.navigate('DiscoveryPage');
      } else {
        console.error('Error uploading image', response.statusText);
      }
    } catch (error) {
      console.error('Network error', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Button title="Pick an Image" onPress={pickImage} style={styles.button_container} />
        {image && (
          <>
            <Text>Image Picked!</Text>
            <Button title="Send Image to Backend" onPress={sendImageToBackend} />
          </>
        )}
        {sentToBackend && (
          <>
            <View>
              <Text style={styles.LoadingTitleText}>Analyzing...</Text>
              <ActivityIndicator size="large" />
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDEBC5',
    justifyContent: 'center',
  },
  button_container: {
    backgroundColor: 'white',
    padding: 5,
  },

  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: 'green',
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
    height: 2,
    width: '100%',
    backgroundColor: '#808080',
    marginTop: 10,
  },
  loadingWhiteBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 300,
  },
  LoadingTitleText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 75,
  },
});
