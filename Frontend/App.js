import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pages
import LandingPage from './pages/Landing';
import IndexPage from './pages/IndexPage';
import CapturePage from './pages/CapturePage';
import ImagePickerExample from './pages/ImagePickerPage';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="CapturePage" component={CapturePage} />
        <Stack.Screen name="IndexPage" component={IndexPage} />
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
