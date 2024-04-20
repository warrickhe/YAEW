import React from 'react';
import { Text, Button, Image, View, StyleSheet } from 'react-native';

export default function HomePage({ navigation }) {
  return (
    <>
      <View>
        <Text>WELCOME BACK USER123</Text>
        <View style={styles.stats_container}>
          <View style={styles.stats_box}>
            <Text>Total Points</Text>
            <Text>130</Text>
          </View>
          <View style={styles.stats_box}>
            <Text>Discoveries</Text>
            <Text>30</Text>
          </View>
          <View style={styles.stats_box}>
            <Text>Species Found</Text>
            <Text>10</Text>
          </View>
        </View>
      </View>

      <View>
        {/* <Button title="Journal Page TODO" onPress={() => console.log('journal pages')}></Button> */}
        <Button title="Index Page" onPress={() => navigation.navigate('IndexPage')}></Button>
        <Button title="Capture!" onPress={() => navigation.navigate('CapturePage')}></Button>
        <Button title="Upload!" onPress={() => navigation.navigate('UploadPage')}></Button>
        <Button title="Journal!" onPress={() => navigation.navigate('JournalPage')}></Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  stats_container: {
    display: 'flex',
    flexDirection: 'row',
  },
  stats_box: {
    marginRight: 20,
  },
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
