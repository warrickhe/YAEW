import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const data = {
  name: 'cat',
  date: 'Apr 19th',
  num_found: 10,
  description: 'This is a sample description of the main image.',
  user_images: [
    {
      id: 1,
      url: 'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg',
      description: 'An image of a cat',
    },
    {
      id: 2,
      url: 'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg',
      description: 'An image of a dog',
    },
    {
      id: 3,
      url: 'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg',
      description: 'An image of a bird',
    },
  ],
};

const ItemSeparatorComponent = () => <View style={styles.separator} />;

const DetailInfo = ({ navigator, route }) => {
  const { imageData, speciesName } = route.params;

  return (
    <View style={styles.container}>
      {/* Main White Box */}

      {/* Main Image */}
      <Image source={{ uri: imageData }} style={styles.mainImage} resizeMode="cover" />

      <View style={styles.whiteBox}>
        <Text>Found a {speciesName}</Text>
        <Text>{'4/20/2024'}</Text>
      </View>
      <View style={styles.bubbleBox}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDEBC5',
    padding: 10,
  },
  whiteBox: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  separator: {
    height: 2,
    width: '70%',
    backgroundColor: '#808080',
    marginTop: 10,
    marginBottom: 10,
  },

  bubbleBox: {
    backgroundColor: '#e0f7fa', // Light blue background color
    borderRadius: 50, // Rounded corners
    padding: 10,
    marginVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  mainImage: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    marginTop: 120,
  },
  buttonText: {
    fontSize: 20, // Adjust the text size here
    color: 'black', // Text color
    textAlign: 'center', // Center the text
  },
});

export default DetailInfo;
