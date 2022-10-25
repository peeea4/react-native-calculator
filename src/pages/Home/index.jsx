import {StyleSheet, View} from 'react-native';

import {Display} from '../../components/Display';
import Keypad from '../../components/Keypad';

export const Home = () => {
  return (
    <View style={styles.container}>
      <Display />
      <Keypad />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
