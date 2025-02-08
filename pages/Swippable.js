import React, { useState } from "react";
import { ToastAndroid, View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import ListItem from "./ListItem";
import CreateNote from "./CreateNote";
import EditItem from "./EditItem";
import Data from "../constant/Data";

const Swippable = () => {
    const [data, setData] = useState(Data);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreateNote, setIsCreateNote] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const [isEpanded, setIsExpanded] = useState(null);

    const toggleExpand = (id) => {
        setIsExpanded(isEpanded === id ? null : id);
    };

    // Handle menu
    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    // Header component
    const Header = ({ menuOpen, handleMenu }) => {
        return (
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.headerText}>Smart Note</Text>
                </View>
                <View style={styles.headerIcon}>
                    <TouchableOpacity onPress={handleMenu}>
                        {menuOpen ? (
                            <Ionicons name="close" size={30} color="black" />
                        ) : (
                            <Ionicons name="menu" size={30} color="black" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        )
    };


    // drawer component
    const Drawer = () => {
        return (
            <View style={styles.drawerContainer}>
                <TouchableOpacity onPress={() => { setMenuOpen(false) }}>
                    <Text style={styles.drwText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCreateNote}>
                    <Text style={styles.drwText}>Create Note</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={null}>
                    <Text style={styles.drwText}>Contact</Text>
                </TouchableOpacity>
            </View>
        );
    };

    // Toast message
    const toast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    // handle create note state
    const handleCreateNote = () => {
        setIsCreateNote(!isCreateNote);
    };


    // remove item with an id
    const removeItem = (id) => {
        setIsRefreshing(true);
        const removedData = data.find(item => item.id === id);
        if (!removedData) return;

        setData((prevData) => prevData.filter(item => item.id !== id));
        setIsRefreshing(false);
        toast(`${removedData.title} [${id}] removed successfully`);
    };

    // add Note
    const addNote = ({ title, body }) => {
        setIsRefreshing(true);
        const newId = Math.max(...data.map(item => item.id)) + 1;
        const newItem = { id: newId, title, body };

        setData((prevData) => [newItem, ...prevData]);
        setIsRefreshing(false);
        toast(`${newItem.title} [${newItem.id}] added successfully`);
    };

    // edit item
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


    // create note button
    const AddButton = () => (
        <TouchableOpacity onPress={handleCreateNote} style={styles.buttonContainer}>
            <Text style={styles.btn}>Add Item</Text>
        </TouchableOpacity>
    );

    if (isCreateNote) {
        return (
            <CreateNote
                addNote={addNote}
                handleCreateNote={handleCreateNote}
                toast={toast}
            />
        )
    }

    return (

    <GestureHandlerRootView style={{ flex: 1 }}>
        {isEditing ? (
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
            <>
                {<Header
                    menuOpen={menuOpen}
                    handleMenu={handleMenu}
                />}
                {menuOpen && <Drawer />}
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    refreshing={isRefreshing}
                    renderItem={({ item }) => (
                        <ListItem
                            item={item}
                            onRemove={removeItem}
                            onEdit={setItem}
                            isExpanded={isEpanded === item.id}
                            toggleExpand={toggleExpand}
                        />
                    )}
                />
                <AddButton />
            </>
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
        backgroundColor: '#B99C8D',
        padding: 10,
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        height: 100,
        backgroundColor: '#B99C8D',
        zIndex: 1,
        marginBottom: 5,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    drawerContainer: {
        height: '90%',
        width: '50%',
        position: 'absolute',
        top: 100,
        right: 0,
        backgroundColor: '#D9CCC6',
        zIndex: 20,
        elevation: 10,
        paddingVertical: 20,
    },
    drwText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        borderBottomWidth: 1,
        padding: 10,
    },
    // bulge: {
    //     position: 'absolute',
    //     bottom: -15, // Move down to create the effect
    //     right: -10, // Adjust position to bulge out
    //     width: 30,
    //     height: 50,
    //     backgroundColor: 'lightblue',
    //     borderRadius: 10, // Perfectly circulard
    // },

});

export default Swippable;
