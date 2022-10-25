import {useMemo} from 'react';

import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

export const KeypadButton = ({handlePress, buttonInfo, style}) => {
  const pressHandle = () => {
    handlePress(buttonInfo);
  };
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      onPress={pressHandle}
      underlayColor={theme.colors.background}
      style={[styles.button, style]}>
      <Text
        style={[
          styles.text,
          {
            fontSize: style.fontSize || 32,
            color: style.color,
          },
        ]}>
        {buttonInfo.valueButton}
      </Text>
    </TouchableHighlight>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    button: {
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 8,
      marginVertical: 8,
    },
    text: {
      textAlignVertical: 'center',
      textAlign: 'center',
      fontFamily: 'Poppins-Medium',
    },
  });
