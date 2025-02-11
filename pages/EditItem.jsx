import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';


const EditItem = ({ title, body, setTitle, setBody, setIsEditing, selectedItem, editItem }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <TouchableOpacity onPress={()=> setIsEditing(false)}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.hTitle}>Create Note</Text>
            </View>
            <View style={styles.body}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 30,
    },
    body: {
        padding: 20,
        flex: 1,
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
        backgroundColor: '#B99C8D',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    btn: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    cancelButton: {
        backgroundColor: 'grey',
    },
    headContainer: {
        flexDirection: 'row',
        backgroundColor: '#B99C8D',
        paddingLeft: 20,
        paddingVertical: 20,
    },
    hTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 20,
    }
});

export default EditItem;