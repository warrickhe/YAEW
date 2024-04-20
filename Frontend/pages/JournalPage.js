import React from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';


const data = [
    { key: 'Devin', uri: 'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg',points:5 ,date:'Apr 19'},
    { key: 'Dan', uri: 'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/5acb63d83493f__700-png.jpg' },
    { key: 'Dominic', uri: 'https://example.com/dominic.jpg' },
    { key: 'Jackson', uri: 'https://example.com/jackson.jpg' },
    { key: 'James', uri: 'https://example.com/james.jpg' },
    { key: 'Joel', uri: 'https://example.com/joel.jpg' },
    { key: 'John', uri: 'https://example.com/john.jpg' },
    { key: 'Jillian', uri: 'https://example.com/jillian.jpg' },
    { key: 'Jimmy', uri: 'https://example.com/jimmy.jpg' },
    { key: 'Julie', uri: 'https://example.com/julie.jpg' },
];

const ItemSeparatorComponent = () => (
    <View style={styles.separator} />
);

export default function JournalPage({ navigation }) {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.uri }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.item}>Found a {item.key}</Text>
                    <Text style={styles.item}>Points +{item.points}</Text>
                    <Text style={styles.item}>Found on {item.date}</Text>
                </View>
                
            </View>
        );
    };

    return (
        <>
            <View style={styles.centeredContainer}>
                <Text style={styles.titleText}>Journal</Text>
                <Text style={styles.subtitleText}>This is what you've been up to</Text>
            </View>

            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CDEBC5', 
        justifyContent: 'center',
        
    },
    centeredContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
        marginBottom:-50,
        backgroundColor: '#CDEBC5',
        width: '100%',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitleText: {
        fontSize: 16,
        color: 'green',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 50,
        marginTop:10,
        width: '100%', // Full-width container
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    textContainer: {
        flex: 1, // Take up remaining space in the row
    },
    item: {
        fontSize: 16,
    },
    separator: {
        height: 2,
        width: '100%',
        backgroundColor: '#808080',
        marginTop:10,

    },
});
