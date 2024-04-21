import React from 'react';
import { View, Image, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Data = {
  username: 'warrick',
  total_captures: 2,
  unique_species: 2,
  points: 10,
};

const data1 = [
  {
    image_url:
      'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg',
  },
  {
    image_url:
      'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg',
  },
  {
    image_url:
      'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg',
  },
  {
    image_url:
      'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg',
  },
  {
    image_url:
      'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg',
  },
  {
    image_url:
      'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg',
  },
  // Add more items as needed
];

export default function IndexPage({ navigation }) {
  // Function to handle navigation when an image is clicked
  const handleImageClick = (image) => {
    // Navigate to screen "a" and pass the clicked image data as a parameter
    navigation.navigate('HomePage', { data: image });
  };

  // Function to render each row of three images
  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        {item.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageClick(image)}>
            <Image source={{ uri: image.image_url }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Group data into rows of three
  const groupedData = [];
  for (let i = 0; i < data1.length; i += 3) {
    groupedData.push(data1.slice(i, i + 3));
  }

  return (
    <>
      <View style={styles.centeredContainer}>
        <Text style={styles.titleText}>Index</Text>
        <Text style={styles.subtitleText}>Total Species: {Data.unique_species}</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={groupedData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        //TODO: Add Home Button.
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    marginBottom: -50,
    backgroundColor: '#CDEBC5',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#CDEBC5', // Fill the screen with green
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 20,
    color: 'green',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    margin: 5, // Add margin around each image
  },
});
