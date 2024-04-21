import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import FlipCard from 'react-native-flip-card';

const data = {
  num_found: 10,
  description: "This is a sample description of the main image.",
  where_to_find: "supplemental details",
  user_images: [
    { id: 1, url: "https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg", description: "An image of a cat" },
    { id: 2, url: "https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg", description: "An image of a dog" },
    { id: 3, url: "https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg", description: "An image of a bird" },
  ]
};

const ItemSeparatorComponent = () => (
    <View style={styles.separator} />
);

export default function InfoPage({ navigation }) {
  return (
    <View style={styles.container}>
      <FlipCard style={styles.whiteBox}>
        {/* Front Side */}
        <View style={styles.front}>
          {/* Main Image */}
          <Image
            source={{ uri: "https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg" }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <View style={styles.box}>
            <Text style={styles.bubbleText}>
              Found: {data.num_found}
            </Text>
          </View>
          {/* Description */}
          <Text style={styles.description}>
            {data.description}
          </Text>
          <View style={styles.separator} />
          <Text>Photos</Text>
          {/* User Images Row */}
          <ScrollView horizontal style={styles.userImagesRow}>
            {data.user_images.map((image) => (
              <View key={image.id} style={styles.userImageContainer}>
                {/* User Image */}
                <Image
                  source={{ uri: image.url }}
                  style={styles.userImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
        </View>
        
        {/* Back Side */}
        <View style={styles.back}>
          <Text style={styles.backText}>
            {data.where_to_find}
          </Text>
        </View>
      </FlipCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDEBC5',
    padding: 10,
  },
  separator: {
    height: 2,
    width: '70%',
    backgroundColor: '#808080',
    marginTop: 10,
    marginBottom: 10,
  },
  whiteBox: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    marginTop: 150,
    marginBottom:150,
    alignItems: 'center',
    borderWidth: 5, // Add border width
    borderColor: '#7EA3A7',
  },
  front: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  backText: {
    color: 'black',
    fontSize:30,
  },
  mainImage: {
    width: '80%',
    height: 150,
    borderRadius: 8,
    marginTop: 20,
  },
  box: {
    backgroundColor: '#8FC5B5',
    padding: 7,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  bubbleText: {
    color: 'white',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    color: 'black',
  },
  userImagesRow: {
    marginTop: 10,
    marginBottom: 20,
  },
  userImageContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});