import { useState, useEffect } from 'react';
import { Text, Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

const BACKEND_URL = 'http://192.168.1.100:7272';

export default function ImagePickerExample() {
  const [deviceID, setDeviceID] = useState('');
  const [image, setImage] = useState(null);

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
      } else {
        console.error('Error uploading image', response.statusText);
      }
    } catch (error) {
      console.error('Network error', error);
    }
  };

  return (
    <>
      <View>
        <Button title="Pick an Image" onPress={pickImage} />
        {image && (
          <>
            <Text>Image Picked!</Text>
            <Button title="Send Image to Backend" onPress={sendImageToBackend} />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
