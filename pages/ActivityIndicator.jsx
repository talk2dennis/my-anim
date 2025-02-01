import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";


const ActivityIndicator = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="blue" />
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default ActivityIndicator;