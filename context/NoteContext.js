// NoteContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);

    // Load notes from AsyncStorage on mount
    useEffect(() => {
        const loadNotes = async () => {
            try {
                const storedNotes = await AsyncStorage.getItem('notes');
                if (storedNotes !== null && storedNotes !== undefined) {
                    const notesJson = JSON.parse(storedNotes);
                    notesJson.sort((a, b) => b.id - a.id);
                    setNotes(notesJson);
                } else {
                    setNotes([{ id: 1, title: "Welcome to Notes", description: "You can add, edit, and delete notes in this app.", createdAt: Date.now(), completed: false, tags: ["welcome"] }]);
                }
            } catch (error) {
                console.error("Failed to load notes:", error);
            }
        };

        loadNotes();
    }, []);

    // Save notes to AsyncStorage whenever they change
    useEffect(() => {
        const saveNotes = async () => {
            try {
                const savedNote = await AsyncStorage.setItem('notes', JSON.stringify(notes));
            } catch (error) {
                console.error("Failed to save notes:", error);
            }
        };

        saveNotes();
    }, [notes]);

    const addNote = (note) => {
        // get max id
        let maxId = Math.max(...notes.map(note => note.id));
        note === null || note === undefined ? maxId = 0 : maxId = maxId;
        note.id = maxId + 1;
        setNotes((prevNotes) => [note, ...prevNotes]);
    };

    const removeNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
    };

    // get note by id
    const getNoteById = (id) => {
        return notes.find(note => note.id === id);
    };

    // update note by id
    const updateNote = (id, updatedNote) => {
        setNotes((prevNotes) => prevNotes.map(note => (note.id === id ? updatedNote : note)));
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, removeNote, getNoteById, updateNote }}>
            {children}
        </NoteContext.Provider>
    );
};