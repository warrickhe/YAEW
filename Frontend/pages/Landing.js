import React from 'react';
import { Text, Button, Image, View, StyleSheet } from 'react-native';

export default function LandingPage({ navigation }) {
  return (
    <>
      <Text>HELLO SQUIRREL</Text>
      <Button title="Capture Page" onPress={() => navigation.navigate('CapturePage')}></Button>
      <Button title="Index Page" onPress={() => navigation.navigate('IndexPage')}></Button>
    </>
  );
}
