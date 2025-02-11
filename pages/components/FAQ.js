import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const faqData = [
    {
        id: "1",
        question: "How do I add a new note?",
        answer: "To create a new note, tap on the 'Add Note' button at the bottom of the screen. This will open a text input where you can enter a title and a description for your note.\n\nThe title helps organize your notes, while the description stores detailed information.\n\nOnce you’ve entered the necessary details, tap the 'Save' button. Your note will now be saved and visible in your list."
    },
    {
        id: "2",
        question: "How can I generate note content automatically?",
        answer: "Our app includes an AI-powered content generator to help you quickly create note content.\n\nTo use this feature, first enter a title for your note.\n\nOnce you’ve typed a title, tap the 'Chat' icon located to the right of the title input field.\n\nThe AI will analyze your title and generate relevant content for your note.\n\nYou can then review, edit, or refine the generated text before saving."
    },
    {
        id: "3",
        question: "Where are my notes saved?",
        answer: "Your notes are stored locally on your device using AsyncStorage.\n\nThis ensures quick access to your notes even when you're offline.\n\nHowever, please note that since notes are saved only on your device, they will be lost if you uninstall the app or clear app data.\n\nWe are working on adding cloud syncing options in the future, which will allow you to back up your notes and access them from multiple devices."
    },
    {
        id: "4",
        question: "Can I edit a note?",
        answer: "Yes, you can edit any of your saved notes at any time. Simply tap on the note you want to modify.\n\nOnce the note opens, look for the 'Edit' button and tap it.This will allow you to change the title and description. After making your changes, tap 'Save' to update the note. Your updated note will be saved immediately."
    },
    {
        id: "5",
        question: "How do I delete a note?",
        answer: "You can delete a note using one of two methods. The first method is swiping left on the note in your notes list.\n\nA delete option will appear—tap it to permanently remove the note.  The second method is opening the note and tapping the trash bin icon or 'Delete' button. Please note that deleting a note is **permanent and irreversible**, so be sure before you proceed."
    },
    {
        id: "6",
        question: "Can I copy a note to the clipboard?",
        answer: "Yes! If you need to copy a note's content, open the note and tap the 'Copy to Clipboard' button.\n\nYou will see a confirmation message indicating that the text has been copied successfully.\n\nAfter that, you can paste the copied text anywhere by long-pressing in a text field and selecting 'Paste'.\n\nThis is useful for quickly transferring notes to other apps, messages, or documents."
    },
    {
        id: "7",
        question: "Does the app support syncing across devices?",
        answer: "At the moment, your notes are stored only on your device. This means they won’t sync across multiple devices.\n\nHowever, we are working on a cloud-sync feature that will allow you to back up your notes and access them from any device. Stay tuned for future updates!"
    }
];



const FAQItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.questionContainer}>
                <Text style={styles.question}>{item.question}</Text>
                <Text style={styles.icon}>{expanded ? "▲" : "▼"}</Text>
            </TouchableOpacity>
            {expanded && <Text style={styles.answer}>{item.answer}</Text>}
        </View>
    );
};

const FAQ = ({ setFaq }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <TouchableOpacity onPress={() => setFaq(false)}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Frequently Asked Questions</Text>
            </View>
            <FlatList
                data={faqData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <FAQItem item={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: "#f8f8f8"
    },
    itemContainer: {
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        elevation: 2
    },
    questionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    question: {
        fontSize: 16,
        fontWeight: "bold"
    },
    icon: {
        fontSize: 18,
        color: "#555"
    },
    answer: {
        marginTop: 5,
        fontSize: 14, color: "#444"
    },
    headContainer: {
        flexDirection: 'row',
        backgroundColor: '#B99C8D',
        paddingLeft: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 20,
    }
});

export default FAQ;
