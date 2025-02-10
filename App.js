import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import Swippable from './pages/Swippable';
import {NoteProvider} from './context/NoteContext';


const App = () => {
  return (
    <NoteProvider>
      <View style={styles.container}>
        <Swippable />
        <StatusBar style="auto" />
      </View>
    </NoteProvider>
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