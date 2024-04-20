import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import IndexPage from './IndexPage';
import CapturePage from './CapturePage';
import ImagePickerExample from './ImagePickerPage';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>efedfe</Text>
      <View style={styles.camera}>
        <CapturePage style={styles.camera}/>
      </View>
      <ImagePickerExample/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  camera: {
    height: '50%',
    width: '100%'
  },
});
