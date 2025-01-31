import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

const MovingBox = () => {
    const translateX = useSharedValue(0);
    const [ moved, setMoved ] = React.useState(false);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const moveBox = () => {
        translateX.value = withSpring(moved ? -100 : 100, { stiffness: 100, damping: 20, velocity: 2 });
        setMoved(!moved);
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, animatedStyle]} />
            <TouchableOpacity style={styles.button} onPress={moveBox}>
                <Text style={styles.text}>{moved ? 'Move Left' : 'Move Right'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 10,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 5,
    },
    text: {
        fontSize: 20,
    },
});

export default MovingBox;