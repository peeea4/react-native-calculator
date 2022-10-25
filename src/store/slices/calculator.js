import {createSlice} from '@reduxjs/toolkit';

const calculator = createSlice({
  name: 'todoSlice',
  initialState: {
    tokenList: [],
    displayValue: '',
    previousValue: '',
    calcHistory: [],
  },
  reducers: {
    updateTokenList(state, action) {
      state.tokenList = action.payload;
    },
    updateDisplayValue(state, action) {
      state.displayValue = action.payload;
    },
    updateCalcHistory(state, action) {
      state.calcHistory = [...state.calcHistory, action.payload];
    },
    removeCalcHistoryItem(state, action) {
      state.calcHistory = state.calcHistory.filter(
        item => item.id !== action.payload,
      );
    },
    updatePreviousValue(state, action) {
      state.previousValue = action.payload;
    },
    addToken(state, action) {
      state.tokenList.push(action.payload);
    },
    clearTokenList(state) {
      state.tokenList = [];
    },
    clearCalcHistory(state) {
      state.calcHistory = [];
    },
    addPeriod(state) {
      state.tokenList = [];
    },
  },
});

export const {
  updateTokenList,
  updateDisplayValue,
  updateCalcHistory,
  removeCalcHistoryItem,
  updatePreviousValue,
  addToken,
  clearTokenList,
  clearCalcHistory,
  addPeriod,
} = calculator.actions;

export default calculator.reducer;
