import { useState, useEffect } from 'react';
import {
  Text,
  Button,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';

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
        const resData = await response.json();

        //console.log(resData);
        navigation.navigate('DiscoveryPage', { data: resData });
      } else {
        console.error('Error uploading image', response.statusText);
      }
    } catch (error) {
      console.error('Network error', error);
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      locations={[0.29, 1]}
      colors={['#ebf9c9', '#96e6a1']}
      useAngle={true}
      angle={168.15}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        {image && (
          <TouchableOpacity onPress={sendImageToBackend} style={styles.button}>
            <Text style={styles.buttonText}>What did I find?</Text>
          </TouchableOpacity>
        )}
        {sentToBackend && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingTitleText}>Analyzing...</Text>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '60%',
    aspectRatio: 1, // Square aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White fill
    borderWidth: 4, // Blue outline
    borderColor: '#3f84e5', // Blue outline color
    borderRadius: 10, // Adjust border radius as needed
    marginVertical: 10, // Adjust vertical margin as needed
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3f84e5', // Blue text color
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
