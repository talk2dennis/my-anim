import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, TouchableOpacity, ToastAndroid } from "react-native";
import Animated, { Layout, FadeOut, FadeIn } from 'react-native-reanimated';
import Data from "../constant/Data";


const AnimatedFlatlist = () => {
    const [data, setData] = useState(Data);

    const toast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.LONG);
    }
    
    const removeItem = (id) => {
        const removedData = data.find(item => item.id === id);
        if (!removedData) return;

        setData(prevData => prevData.filter(item => item.id !== id));

        toast(`${removedData.body} [${id}] removed successfully`);
    };

    const addItem = () => {
        const newId = Math.floor(Math.random() * Data.length);
        
        setData(
            (prevData) => [{id: data[0].id + 1, title: Data[newId].title, body: Data[newId].body}, ...prevData]
        );
        toast(`${data[newId].title}[${data[newId].id}] added successfully`);
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Animated.View
                        style={styles.item}
                        layout={Layout.springify()}
                        entering={FadeIn.springify()}
                        exiting={FadeOut.springify()}
                    >
                        <Pressable onPress={() => removeItem(item.id)}>
                            <Text style={styles.title}>{item.title}</Text>
                        </Pressable>
                        <Text numberOfLines={3} style={styles.body}>{item.body}</Text>

                    </Animated.View>
                )}
            />
            <TouchableOpacity onPress={addItem}>
                <Text style={styles.btn}>Add Item</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 16,
        marginTop: 10,
    },
    btn: {
        backgroundColor: 'lightblue',
        marginTop: 10,
        padding: 5,
        width: 100,
        textAlign: 'center',
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default AnimatedFlatlist;
