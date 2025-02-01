import React, { useState } from "react";
import { ToastAndroid } from "react-native";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ListItem from "./ListItem";
import { ActivityIndicator } from "react-native";


import Data from "../constant/Data";


const Swippable = () => {
    const [data, setData] = useState(Data);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState(null);
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');

    // toast message
    const toast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    // add ited to list
    const addItem = () => {
        setIsRefreshing(true);
        const newId = Math.max(...data.map(item => item.id)) + 1;
        const randomIndex = Math.floor(Math.random() * Data.length);
        const newItem = {
            id: newId,
            title: Data[randomIndex].title,
            body: Data[randomIndex].body,
        };

        setData((prevData) => [newItem, ...prevData]);
        setIsRefreshing(false);
        toast(`${newItem.title} [${newItem.id}] added successfully`);
    };

    // remove item from list
    const removeItem = (id) => {
        setIsRefreshing(true);
        const removedData = data.find(item => item.id === id);
        if (!removedData) return;

        setData((prevData) => prevData.filter(item => item.id !== id));
        setIsRefreshing(false);
        toast(`${removedData.title} [${id}] removed successfully`);
    };

    // edit item
    const editItem = (id) => {
        const editedData = data.find(item => item.id === id);
        if (!editedData) return;

        setData((prevData) => prevData.map(item => item.id === id ? { ...item, title: 'Edited' } : item));
        toast(`${editedData.title} [${id}] updated successfully`);
    };

    // set item and editing
    const setItem = (item) => {
        setIsEditing(true);
        setSelectedItem(item);
        setTitle(item.title);
        setBody(item.body);
        console.log(`Editing: ${item.title}`);
    }


    // add item button
    const AddButton = () => {
        return (
            <TouchableOpacity onPress={addItem} style={styles.buttonContainer}>
                <Text style={styles.btn}>Add Item</Text>
            </TouchableOpacity>
        )
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            { isRefreshing ? <ActivityIndicator size="large" color="blue" /> : (
            <><FlatList
                    refreshing={true}
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            item={item}
                            onRemove={removeItem}
                            onEdit={setItem}
                        />
                    )}
                    onEndReachedThreshold={0.1} /><AddButton /></>
            )}
        </GestureHandlerRootView>
    )
};


const styles = StyleSheet.create({
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

export default Swippable;
