//import React, { useEffect, useState } from 'react';
//import { View, Image, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
//import axios from 'axios';

/*const AnimalIndex = ({ navigation }) => {
  const [animals, setAnimals] = useState([]);

  // Fetch animals from the backend API
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get('YOUR_BACKEND_API_ENDPOINT');
        setAnimals(response.data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };
    
    fetchAnimals();
  }, []);

  // Render each animal as a clickable image
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('AnimalDetail', { animal: item })}>
      <View style={styles.animalContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.animalImage} />
        <Text style={styles.animalName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );*/

  /*return (
    <View style={styles.container}>
      <FlatList
        data={animals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4} // Display items in a grid with 2 columns
      />
    </View>
  );
};*/
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dummyData = [
  {
    id: '1',
    name: 'Lion',
    image: require('./Warrick.png'), // Use a placeholder image URL
  },
  {
    id: '2',
    name: 'Elephant',
    image: require('./Warrick.png'),
  },
  {
    id: '3',
    name: 'Tiger',
    image: require('./Warrick.png'),
  },
  {
    id: '4',
    name: 'Giraffe',
    image: require('./Warrick.png'),
  },
];

const IndexPage = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('AnimalDetails', { animal: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={dummyData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={4}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default IndexPage;
