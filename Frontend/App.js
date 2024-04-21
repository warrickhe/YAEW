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


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="CreateUserPage" component={CreateUserPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="CapturePage" component={CapturePage} />
        <Stack.Screen name="IndexPage" component={IndexPage} />
        <Stack.Screen name="UploadPage" component={UploadPage} />
        <Stack.Screen name="JournalPage" component={JournalPage} />
        <Stack.Screen name="InfoPage" component={InfoPage} />
        <Stack.Screen name="DetailInfo" component={DetailInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// WARRICK's IMAGE PICKER CODE (WORKS)
//
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>efedfe</Text>
//       <View style={styles.camera}>
//         <CapturePage style={styles.camera} />
//       </View>
//       <ImagePickerExample />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

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
