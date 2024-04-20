import { useState } from 'react';
import { Text, Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

//192.168.189.182

const BACKEND_URL = 'http://192.168.189.182:7272';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

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
      name: 'uploaded_image.jpg', // You can give it a name
      type: 'image/jpeg', // Ensure correct MIME type
    });

    console.log('here is the image data');
    console.log(formattedData);

    try {
      const response = await fetch(`${BACKEND_URL}/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data', // Key header for file uploads
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
      {/* <View style={styles.container}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View> */}
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
