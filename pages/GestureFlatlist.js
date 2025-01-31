import React, { useRef, useState } from "react";
import { Text, StyleSheet, FlatList, TouchableOpacity, ToastAndroid } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Data from "../constant/Data";
import SwipeableItem from "./SwipeableItem";

const GestureFlatList = () => {
    const [data, setData] = useState(Data);
    const flatListRef = useRef(null);

    const toast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.LONG);
    };

    const removeItem = (id) => {
        const removedData = data.find(item => item.id === id);
        if (!removedData) return;

        setData(prevData => prevData.filter(item => item.id !== id));

        toast(`${removedData.title} [${id}] removed successfully`);
    };

    const addItem = () => {
        const newId = Math.max(...data.map(item => item.id)) + 1;
        const randomIndex = Math.floor(Math.random() * Data.length);
        const newItem = {
            id: newId,
            title: Data[randomIndex].title,
            body: Data[randomIndex].body,
        };

        setData(prevData => [newItem, ...prevData]);

        toast(`${newItem.title} [${newItem.id}] added successfully`);
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <FlatList
                data={data}
                ref={flatListRef}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <SwipeableItem item={item} onRemove={removeItem} simultaneousHandlers={flatListRef} />
                )}
                contentContainerStyle={styles.flatListContainer} // Ensure list has enough height to scroll
            />
            <TouchableOpacity onPress={addItem} style={styles.buttonContainer}>
                <Text style={styles.btn}>Add Item</Text>
            </TouchableOpacity>
        </GestureHandlerRootView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30,
        paddingHorizontal: 10,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        marginVertical: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 16,
        marginTop: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    btn: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default GestureFlatList;
