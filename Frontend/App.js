import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pages
import HomePage from './pages/HomePage';
import CreateUserPage from './pages/CreateUserPage';
import IndexPage from './pages/IndexPage';
import CapturePage from './pages/CapturePage';
import JournalPage from './pages/JournalPage';
import ImagePickerExample from './pages/ImagePickerPage';
import UploadPage from './pages/UploadPage';
import LandingPage from './pages/LandingPage';
import InfoPage from './pages/InfoPage';
import DetailInfo from './pages/DetailInfo';
import QuizPage from './pages/QuizPage';
import DiscoveryPage from './pages/DiscoveryPage';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LandingPage"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="CreateUserPage" component={CreateUserPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="CapturePage" component={CapturePage} />
        <Stack.Screen name="IndexPage" component={IndexPage} />
        <Stack.Screen name="UploadPage" component={UploadPage} />
        <Stack.Screen name="JournalPage" component={JournalPage} />
        <Stack.Screen name="InfoPage" component={InfoPage} />
        <Stack.Screen name="DetailInfo" component={DetailInfo} />
        <Stack.Screen name="QuizPage" component={QuizPage} />
        <Stack.Screen name="DiscoveryPage" component={DiscoveryPage} />
        <Stack.Screen name="ImagePickerPage" component={ImagePickerExample} />
      </Stack.Navigator>
    </NavigationContainer>
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
