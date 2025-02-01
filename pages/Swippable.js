import React, { useState } from "react";
import { ToastAndroid, View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ListItem from "./ListItem";
import EditItem from "./EditItem"; // Ensure this exists
import Data from "../constant/Data";

const Swippable = () => {
    const [data, setData] = useState(Data);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const toast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const addItem = () => {
        setIsRefreshing(true);
        const newId = Math.max(...data.map(item => item.id)) + 1;
        const randomIndex = Math.floor(Math.random() * Data.length);
        const newItem = { id: newId, title: Data[randomIndex].title, body: Data[randomIndex].body };

        setData((prevData) => [newItem, ...prevData]);
        setIsRefreshing(false);
        toast(`${newItem.title} [${newItem.id}] added successfully`);
    };

    const removeItem = (id) => {
        setIsRefreshing(true);
        const removedData = data.find(item => item.id === id);
        if (!removedData) return;

        setData((prevData) => prevData.filter(item => item.id !== id));
        setIsRefreshing(false);
        toast(`${removedData.title} [${id}] removed successfully`);
    };

    const editItem = (id) => {
        const editedData = data.find(item => item.id === id);
        if (!editedData) return;

        const updatedData = data.map(item => {
            if (item.id === id) {
                return { ...item, title, body };
            }
            return item;
        });
        // Update the state
        setData(updatedData);
        toast(`${editedData.title} [${id}] updated successfully`);
    };

    const setItem = (item) => {
        setIsEditing(true);
        setSelectedItem(item);
        setTitle(item.title);
        setBody(item.body);
    };

    const AddButton = () => (
        <TouchableOpacity onPress={addItem} style={styles.buttonContainer}>
            <Text style={styles.btn}>Add Item</Text>
        </TouchableOpacity>
    );

    return isEditing ? (
        <EditItem 
            title={title}
            body={body}
            setTitle={setTitle}
            setBody={setBody}
            setIsEditing={setIsEditing}
            selectedItem={selectedItem}
            editItem={editItem}
        />
    ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {isRefreshing ? (
                <ActivityIndicator size="large" color="blue" />
            ) : (
                <>
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id.toString()}
                        refreshing={isRefreshing}
                        renderItem={({ item }) => (
                            <ListItem item={item} onRemove={removeItem} onEdit={setItem} />
                        )}
                    />
                    <AddButton />
                </>
            )}
        </GestureHandlerRootView>
    );
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
