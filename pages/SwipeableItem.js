import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { runOnJS, Layout, FadeIn, FadeOut, useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const SwipeableItem = ({ item, onRemove, simultaneousHandlers }) => {
    const translateX = useSharedValue(0);

    const swipeGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
        })
        .onEnd(() => {
            if (translateX.value < -80) {
                translateX.value = withTiming(-200, { duration: 300 });
                runOnJS(onRemove)(item.id);
            } else {
                translateX.value = withSpring(0);
            }
        });

    // Background color animation
    const animatedBackgroundStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: translateX.value < 0
                ? "rgba(255, 0, 0, 0.6)"  // Red when swiping left
                : translateX.value > 0
                    ? "rgba(0, 255, 0, 0.6)"  // Green when swiping right
                    : "transparent",
        };
    });

    // Item movement animation
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.swipeContainer}>
            {/* Background animation */}
            <Animated.View style={[styles.background, animatedBackgroundStyle]} />

            <Animated.View
                style={[styles.item, animatedStyle]}
                layout={Layout.springify()}
                entering={FadeIn.springify()}
                exiting={FadeOut.springify()}
            >
                <GestureDetector gesture={swipeGesture}>
                    <Pressable onPress={() => onRemove(item.id)}>
                        <Text style={styles.title}>{item.title}</Text>
                    </Pressable>
                </GestureDetector>
                <Text numberOfLines={3} style={styles.body}>{item.body}</Text>
            </Animated.View>

        </View>
    );
};

const styles = StyleSheet.create({
    swipeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    background: {
        borderRadius: 10,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        marginVertical: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 16,
        marginTop: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    btn: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default SwipeableItem;
