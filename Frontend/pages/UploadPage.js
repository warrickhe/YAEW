import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CapturePage from './CapturePage.js';
import ImagePickerExample from './ImagePickerPage';

export default function UploadPage() {
  return (
    <View style={styles.container}>
      <Text>Upload Page</Text>
      <ImagePickerExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  camera: {
    height: '50%',
    width: '100%',
  },
});
