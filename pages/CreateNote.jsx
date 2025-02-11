import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { API_KEY, MY_KEY, GEM_KEY } from 'react-native-dotenv';
// import OpenAI from "openai";
// import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from "@google/generative-ai";


const Loading = ({ msg }) => {
    return (
        <View style={styles.loadingContainer}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.ltxt}>
                    {msg || 'Please wait...'}
                </Text>
                <ActivityIndicator size="large" color="white" />
            </View>
        </View>
    );
}

const CreateNote = ({ addNote, handleCreateNote, toast }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);

    const genAI = new GoogleGenerativeAI(GEM_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const getResponse = async () => {
        if (!title.trim()) {
            toast('Please enter a title for AI to generate content');
            return;
        }
        try {
            setLoading(true);

            const result = await model.generateContent(`Please write a note about ${title}. Avoid using markdown. Break the note into paragraphs.`);

            setBody(result.response.text());
        } catch (error) {
            console.log("OpenAI Error:", error);
            toast("Error fetching response");
        } finally {
            setLoading(false);
        }
    };



    const handleAddNote = () => {
        if (!title.trim()) {
            toast('Please fill in the title');
            return;
        }
        if (!body.trim()) {
            toast('Please fill in the body');
            return;
        }
        setLoading(true);
        addNote({
            title,
            body,
        });
        setTitle('');
        setBody('');
        handleCreateNote();
        setLoading(false);
    };

    return (
        <>
            {loading && <Loading msg={"Fetching response from Gemini..."} />}
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <TouchableOpacity onPress={handleCreateNote}>
                        <Ionicons name="arrow-back" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.hTitle}>Create Note</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.label}>Title</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            placeholder="Enter title"
                            placeholderTextColor={'gray'}
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TouchableOpacity onPress={getResponse}>
                            <Ionicons name="chatbox-ellipses" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
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
            </View>
        </>
    );
}

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
        flex: 1,
        marginRight: 10,
    },
    textArea: {
        height: 250,
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
    loadingContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(102, 100, 100, 0.9)',
    },
    ltxt: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
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

export default CreateNote;