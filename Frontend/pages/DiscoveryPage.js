import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

// Define the data with questions, correct and wrong answers
const data = {
    name: 'monkey',
    points: 3,
    image_url: 'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg',
    description: "It's a cat, a cute cat, a funny cat, a good cat",
};

export default function DiscoveryPage() {
    return (
        <View style={styles.container}>
            {/* White box containing the quiz question */}
            <View style={styles.whiteBox}>
                <Text style={styles.TitleText}>You Found A {data.name}!</Text>
                <Text style={styles.PointText}>+{data.points} points!</Text>
                <Image source={{ uri: data.image_url }} style={styles.image} />
                <Text style={styles.DescriptionText}>{data.description}</Text>
                <View style={styles.okButtonContainer}>
                <Button title="OK" onPress={() => { /* Add button functionality here if needed */ }}     color="white" />
            </View>
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
    image: {
        width: 300, // Adjust width as needed
        height: 200, // Adjust height as needed
        marginLeft: 0,
        margin: 5, // Add margin around each image
    },
    whiteBox: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 100,
    },
    DescriptionText: {
        fontSize: 25,
        marginBottom: 30,
        marginTop: 30,
        
    },
    TitleText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        
    },
    PointText:{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        alignContent:"center",
        color:"grey",
    },
    okButtonContainer: {
        backgroundColor:'#67B389',
        borderRadius:20,
        marginLeft:100,
        width:100,
        
    },
});
