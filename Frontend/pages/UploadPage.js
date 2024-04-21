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
    backgroundColor: '#CDEBC5',
    justifyContent: 'center',
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    marginBottom: -50,
    backgroundColor: '#CDEBC5',
    width: '100%',
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
});

