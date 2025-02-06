import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';


const EditItem = ({ title, body, setTitle, setBody, setIsEditing, selectedItem, editItem }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => setIsEditing(false)}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Item</Text>
            </View>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />
            <Text style={styles.label}>Body</Text>
            <TextInput
                multiline={true}
                numberOfLines={15}
                style={[styles.input, styles.textArea]}
                value={body}
                onChangeText={setBody}
            />
            <TouchableOpacity onPress={() => {
                editItem(selectedItem.id);
                setIsEditing(false);
            }} style={styles.buttonContainer}>
                <Text style={styles.btn}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        height: '300',
        textAlignVertical: 'top',
    },
    buttonContainer: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    btn: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: 'grey',
    },
});

export default EditItem;