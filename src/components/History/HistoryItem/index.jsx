import {useMemo} from 'react';

import {useTheme} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {removeCalcHistoryItem} from '../../../store/slices/calculator';

export const HistoryItem = ({item}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const removeItem = () => {
    dispatch(removeCalcHistoryItem(item.id));
  };

  return (
    <View style={styles.itemWrapper}>
      <Text style={styles.hitoryItem}>
        {item.expression} = {item.out}
      </Text>
      <TouchableHighlight onPress={removeItem} underlayColor={theme.colors.background} activeOpacity={0.6}>
        <Image
          source={require('../../../../assets/icons/close.png')}
          style={styles.closeImg}
        />
      </TouchableHighlight>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    itemWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingVertical: 4,
    },
    hitoryItem: {
      flex: 1,
      color: theme.colors.foreground,
      fontSize: 32,
      textAlign: 'right',
      alignItems: 'flex-end',
    },
    closeImg: {
      width: 38,
      height: 38,
      marginHorizontal: 6,
    },
  });
