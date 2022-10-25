import {FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import {HistoryItem} from './HistoryItem';

export const History = () => {
  const calcHistory = useSelector(state => state.calculatorState.calcHistory);
  const renderItem = ({item}) => <HistoryItem item={item} />;

  return (
    <FlatList
      style={styles.historyList}
      data={calcHistory}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  historyList: {
    marginTop: 22,
    paddingHorizontal: 10,
  },
});
