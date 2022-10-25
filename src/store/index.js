import {combineReducers, configureStore} from '@reduxjs/toolkit';

import calculator from './slices/calculator';

const rootReducer = combineReducers({
  calculatorState: calculator,
});

export const store = configureStore({
  reducer: rootReducer,
});
