import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";


const AnimRotate = () => {

// const opacity = useSharedValue(1);
const scale = useSharedValue(1);
const rotate = useSharedValue(0);

const animatedStyle = useAnimatedStyle(() => {
  return {
    // opacity: opacity.value,
    transform: [{ scale: scale.value }],
    transform: [{ rotate: `${rotate.value}deg` }],
  };
});

// Start animation
const startAnimation = () => {
  // opacity.value = withSpring(opacity.value === 1 ? 0 : 1, { stiffness: 10, damping: 2, velocity: 2 });
  scale.value = withSpring(scale.value === 1 ? 1.5 : 1);
  rotate.value = withSpring(rotate.value === 0 ? 45 : 0);
};

return (
  <View style={styles.container}>
     <Animated.View style={[styles.animate, animatedStyle]} />
     <TouchableOpacity style={styles.button}  onPress={startAnimation}>
        <Text style={styles.text}>Start Animation</Text>
      </TouchableOpacity>
    <StatusBar style="auto" />
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
animate: {
  width: 100,
  height: 100,
  borderRadius: 10,
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

export default AnimRotate;