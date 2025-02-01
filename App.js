import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import AnimHight from './pages/AnimHight';
import MovingBox from './pages/MovingBox';
import AnimatedFlatlist from './pages/AnimatedFlatlist';
import GestureFlatList from './pages/GestureFlatlist';
import Swipeable from './pages/Swippable';
import Swippable from './pages/Swippable';


const App = () => {
  return (
    <View style={styles.container}>
      {/* <AnimHight />
      <MovingBox /> */}
      <Swippable />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30,
    // justifyContent: 'center',
  },
});

export default App;