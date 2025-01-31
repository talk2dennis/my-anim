import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import AnimHight from './pages/AnimHight';
import MovingBox from './pages/MovingBox';
import AnimatedFlatlist from './pages/AnimatedFlatlist';
import GestureFlatList from './pages/GestureFlatlist';


const App = () => {
  return (
    <View style={styles.container}>
      {/* <AnimHight />
      <MovingBox /> */}
      <GestureFlatList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default App;