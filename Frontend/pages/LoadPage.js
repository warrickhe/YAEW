import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

// Define the data with questions, correct and wrong answers

export default function LoadingPage() {
  return (
    <View style={styles.container}>
      {/* White box containing the quiz question */}
      <View style={styles.loadingWhiteBox}>
        <Text style={styles.LoadingTitleText}>Analyzing...</Text>
        <ActivityIndicator size="large" />
      </View>

      {/* OK button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#CDEBC5',
  },
  loadingWhiteBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 300,
  },
  LoadingTitleText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 75,
  },
});
