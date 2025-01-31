import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimHight = () => {
    const height = useSharedValue(100);
    const [ isExpanded, setIsExpanded ] = useState(false);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
        };
    });

    const startAnimation = () => {
        height.value = withSpring(isExpanded ? 100 : 300);
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={ styles.container }>
            <Animated.View style={[styles.animate, animatedStyle]} />
            <TouchableOpacity style={styles.button} onPress={startAnimation}>
                <Text style={styles.text}>Start Animation</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 100,
    },
    animate: {
        width: 200,
        backgroundColor: 'red',
        margin: 10,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default AnimHight;