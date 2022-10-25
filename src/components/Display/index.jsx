import {useMemo} from 'react';

import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export const Display = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const displayValue = useSelector(state => state.calculatorState.displayValue);
  const previousValue = useSelector(
    state => state.calculatorState.previousValue,
  );
  const prettyPreviousValue = previousValue.split('').map(letter => {
    if (Number.isInteger(+letter) || letter === '.') {
      return <Text>{letter}</Text>;
    } else {
      return <Text style={styles.opsLetter}>{letter}</Text>;
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.previous}>{prettyPreviousValue}</Text>
      <Text style={styles.display}>{`${
        prettyPreviousValue.length && displayValue ? '=' : ''
      }${displayValue}`}</Text>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 2,
      flexDirection: 'column',
      paddingHorizontal: 32,
      paddingVertical: 16,
    },
    display: {
      fontSize: 48,
      color: theme.colors.foreground,
      fontFamily: 'Poppins-Medium',
      textAlign: 'right',
    },
    previous: {
      fontSize: 24,
      fontFamily: 'Poppins-Medium',
      textAlign: 'right',
      color: '#818181',
    },
    opsLetter: {
      color: '#109DFF',
    },
  });
