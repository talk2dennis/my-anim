import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { API_KEY } from 'react-native-dotenv';


const CreateNote = ({ addNote, handleCreateNote, toast }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    // log the key
    console.log(API_KEY);


    const handleAddNote = () => {
        if (!title.trim() || !body.trim()) {
            toast('Please fill all fields');
            return;
        }
        addNote({
            title,
            body,
        });
        setTitle('');
        setBody('');
        handleCreateNote();
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={handleCreateNote}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Create Note</Text>
            </View>
            <Text style={styles.label}>Title</Text>
            <TextInput
                placeholder="Enter title"
                placeholderTextColor={'gray'}
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />
            <Text style={styles.label}>Body</Text>
            <TextInput
                placeholder="Your note here"
                placeholderTextColor={'gray'}
                multiline={true}
                numberOfLines={15}
                style={[styles.input, styles.textArea]}
                value={body}
                onChangeText={setBody}
            />
            <TouchableOpacity onPress={() => {
                handleAddNote()
            }} style={styles.buttonContainer}>
                <Text style={styles.btn}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    textArea: {
        height: 150,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    btn: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CreateNote;