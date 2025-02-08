import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { API_KEY, MY_KEY } from 'react-native-dotenv';
import OpenAI from "openai";
import Anthropic from '@anthropic-ai/sdk';


const Loading = ({msg}) => {
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

    // return response from openAi
    const openai = new OpenAI({
        apiKey: API_KEY,
        dangerouslyAllowBrowser: true,
    });

    const anthropic = new Anthropic({
        apiKey: MY_KEY,
        dangerouslyAllowBrowser: true,
        });


    const getResponse = async () => {
        try {
            setLoading(true);

            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: `Explain ${title} in a simple way.` }
                ],
            });

            setBody(response.choices[0].message.content);
            console.log(response.choices[0].message.content);
            // const msg = await anthropic.messages.create({
            //     model: "claude-3-5-sonnet-20241022",
            //     max_tokens: 1024,
            //     messages: [{ role: "user", content: "Hello, Claude" }],
            //   });
            //   console.log(msg);
        } catch (error) {
            console.log("OpenAI Error:", error);
            toast("Error fetching response");
        } finally {
            setLoading(false);
        }
    };



    const handleAddNote = () => {
        setLoading(true);
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
        setLoading(false);
    };

    return (
        <>
            {loading && <Loading msg={"Fetching response from OpenAI..."}/>}
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={handleCreateNote}>
                        <Ionicons name="arrow-back" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Create Note</Text>
                </View>
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
        </>
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
});

export default CreateNote;