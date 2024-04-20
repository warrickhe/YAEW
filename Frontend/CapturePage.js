import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
var ImagePicker = require('react-native-image-picker');

const CapturePage = () => {
    const [imageUri, setImageUri] = useState(null);

    // Function to handle taking a photo using the camera
    const takePhoto = () => {
        const options = {
            title: 'Take a Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            cameraType: 'back', // Use the back camera by default
            mediaType: 'photo', // Ensure only photos are taken
        };

        // Use the camera to take a photo
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error:', response.error);
                Alert.alert('Error', 'Failed to take photo');
            } else {
                // Set the image URI to the response.uri
                setImageUri(response.uri);
                Alert.alert('Success', 'Photo taken successfully');
            }
        });
    };

    return (
        <View style={styles.container}>
            <Button title="Take a Photo" onPress={takePhoto} />
            {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.image} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});

export default CapturePage;
