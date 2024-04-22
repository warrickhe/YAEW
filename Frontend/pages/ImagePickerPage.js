import { useState, useEffect, useRef } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';

const BACKEND_URL = 'http://192.168.1.100:7272';

export default function ImagePickerExample({ navigation }) {
  const [deviceID, setDeviceID] = useState('');
  const [image, setImage] = useState(null);
  const [sentToBackend, setSentToBackend] = useState(false);
  const [imagePicked, setImagePicked] = useState(false);
  const [showButton, setShowButton] = useState(true); // State to track button visibility
  const buttonOpacity = useRef(new Animated.Value(1)).current; // Animated value for button opacity

  useEffect(() => {
    const fetchDeviceID = async () => {
      let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
      setDeviceID(fetchUUID);
    };

    fetchDeviceID();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImagePicked(true);
    }
  };

  const sendImageToBackend = async () => {
    if (!image) {
      console.log('No image picked!');
      return;
    }

    // Start fade-out animation
    Animated.timing(buttonOpacity, {
      toValue: 0,
      duration: 500, // Duration of the fade-out animation in milliseconds
      useNativeDriver: true,
    }).start(() => {
      setShowButton(false); // Hide the button after the animation completes
      setSentToBackend(true); // Show loading indicator
    });

    const formattedData = new FormData();
    formattedData.append('file', {
      uri: image,
      name: 'uploaded_image.jpg',
      type: 'image/jpeg',
    });

    console.log('Here is the image data:');
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
        navigation.navigate('DiscoveryPage', { data: resData });
      } else {
        console.error('Error uploading image:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
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
        {/* Render the "Pick an Image" button if an image has not been picked */}
        {!imagePicked && (
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.buttonText}>Pick an Image</Text>
          </TouchableOpacity>
        )}

        {/* Use Animated.View to apply fade-out effect */}
        {imagePicked && showButton && (
          <Animated.View style={{ opacity: buttonOpacity }}>
            <TouchableOpacity onPress={sendImageToBackend} style={styles.centerButton}>
              <Text style={styles.buttonText}>What did I find?</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Show loading indicator at the center if the image is being sent to the backend */}
        {sentToBackend && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingTitleText}>Analyzing...</Text>
            <ActivityIndicator size="large" color="#3f84e5" />
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
  // Style for the "Pick an Image" button
  button: {
    width: '60%',
    aspectRatio: 1, // Square aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Light blue fill to slightly fade out the color
    borderWidth: 4, // Blue outline
    borderColor: 'rgba(126, 163, 167, 0.70)', // Blue outline color
    borderRadius: 10, // Adjust border radius as needed
    marginVertical: 10, // Adjust vertical margin as needed
  },
  // Style for the "What did I find?" button centered in the screen
  centerButton: {
    width: '60%',
    aspectRatio: 1, // Square aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White fill
    borderWidth: 4, // Blue outline
    borderColor: 'rgba(126, 163, 167, 0.70)', // Blue outline color
    borderRadius: 10, // Adjust border radius as needed
    marginVertical: 10, // Adjust vertical margin as needed
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2F5361', // Blue text color
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
