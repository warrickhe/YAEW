import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import IndexPage from './IndexPage';
import CapturePage from './CapturePage';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>efedfe</Text>
      <IndexPage />
      <CapturePage />
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
  },
});
