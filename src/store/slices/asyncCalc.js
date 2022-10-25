import {OPERATORS_ID, MATH_TEXT} from '../../constants';
import {
  getOperator,
  applyOperator,
  hasPriority,
  sumTokenString,
} from '../../utils/calculator';
import {
  updateCalcHistory,
  updateDisplayValue,
  updatePreviousValue,
  updateTokenList,
} from './calculator';

export const calculateAction = () => (dispatch, getState) => {
  const tokenList = getState().calculatorState.tokenList.slice();
  const displayValue = getState().calculatorState.displayValue;
  let count = 0;
  dispatch(updatePreviousValue(displayValue));

  for (let index = 0; index < tokenList.length; index++) {
    if (tokenList[index] === OPERATORS_ID.bracket_left) {
      count++;
    } else if (tokenList[index] === OPERATORS_ID.bracket_right) {
      count--;
    }
  }

  if (count !== 0) {
    dispatch(outputAction(NaN, displayValue, tokenList));
    return;
  }

  let valuesStack = [];
  let operatorsStack = [];
  for (let i = 0; i < tokenList.length; i++) {
    if (!isNaN(tokenList[i])) {
      valuesStack.push(tokenList[i]);
    } else if (tokenList[i] === OPERATORS_ID.num_pi) {
      valuesStack.push(Math.PI);
    } else if (tokenList[i] === OPERATORS_ID.bracket_left) {
      operatorsStack.push(tokenList[i]);
    } else if (tokenList[i] === OPERATORS_ID.bracket_right) {
      while (
        operatorsStack[operatorsStack.length - 1] !== OPERATORS_ID.bracket_left
      ) {
        let operator = getOperator(operatorsStack.pop());

        if (operator.numOperands === 1)
          valuesStack.push(applyOperator(operator, [valuesStack.pop()]));
        else
          valuesStack.push(
            applyOperator(operator, [valuesStack.pop(), valuesStack.pop()]),
          );
      }

      operatorsStack.pop();
    } else {
      while (
        operatorsStack.length > 0 &&
        hasPriority(operatorsStack[operatorsStack.length - 1], tokenList[i])
      ) {
        let operator = getOperator(operatorsStack.pop());
        if (operator.numOperands === 1)
          valuesStack.push(applyOperator(operator, [valuesStack.pop()]));
        else
          valuesStack.push(
            applyOperator(operator, [valuesStack.pop(), valuesStack.pop()]),
          );
      }
      operatorsStack.push(tokenList[i]);
    }
  }
  while (operatorsStack.length > 0) {
    let operator = getOperator(operatorsStack.pop());
    if (operator.numOperands === 1)
      valuesStack.push(applyOperator(operator, [valuesStack.pop()]));
    else
      valuesStack.push(
        applyOperator(operator, [valuesStack.pop(), valuesStack.pop()]),
      );
  }
  if (
    `${valuesStack[0]}` === MATH_TEXT.positiveInfinity ||
    `${valuesStack[0]}` === MATH_TEXT.negativeInfinity
  ) {
    dispatch(outputAction(MATH_TEXT.nan, displayValue, tokenList));
  } else {
    dispatch(outputAction(valuesStack[0], displayValue, tokenList));
  }
};

export const addTokenAction = token => (dispatch, getState) => {
  const tokenList = getState().calculatorState.tokenList.slice();

  if (isNaN(token)) {
    if (
      (token === OPERATORS_ID.bracket_left ||
        token === OPERATORS_ID.num_pi ||
        token === OPERATORS_ID.op_square_root) &&
      !isNaN(tokenList[tokenList.length - 1])
    ) {
      tokenList.push(OPERATORS_ID.op_multiply);
    }
    tokenList.push(token);
  } else {
    if (!isNaN(tokenList[tokenList.length - 1])) {
      tokenList[tokenList.length - 1] = tokenList[tokenList.length - 1] + token;
    } else {
      if (
        !isNaN(token) &&
        (tokenList[tokenList.length - 1] === OPERATORS_ID.bracket_right ||
          tokenList[tokenList.length - 1] === OPERATORS_ID.num_pi)
      ) {
        tokenList.push(OPERATORS_ID.op_multiply);
      }
      tokenList.push(token);
    }
  }
  dispatch(updateTokenList(tokenList));
  dispatch(displayEquationAction());
};

export const displayEquationAction = () => (dispatch, getState) => {
  const tokenList = getState().calculatorState.tokenList.slice();

  const htmlString = tokenList.reduce(sumTokenString, '');

  dispatch(updateDisplayValue(htmlString));
};

export const deleteLastTokenAction = () => (dispatch, getState) => {
  const tokenList = getState().calculatorState.tokenList.slice();

  if (isNaN(tokenList[tokenList.length - 1])) {
    tokenList.pop();
  } else {
    tokenList[tokenList.length - 1] = tokenList[tokenList.length - 1].slice(
      0,
      -1,
    );
    if (tokenList[tokenList.length - 1].length === 0) {
      tokenList.pop();
    }
  }
  dispatch(updateTokenList(tokenList));
  dispatch(displayEquationAction());
};

export const outputAction = (out, expression, tokens) => dispatch => {
  const ROUND_PLACES = 3;

  if (isNaN(out) || out == undefined) {
    out = MATH_TEXT.nan;
    dispatch(updateTokenList([]));
  } else {
    out = Number.isInteger(out) ? out : (+out).toFixed(ROUND_PLACES);
    dispatch(updateTokenList([`${out}`]));
  }
  dispatch(displayEquationAction());
  dispatch(
    updateCalcHistory({
      out,
      expression,
      tokens,
      id: Date.now(),
    }),
  );
};

export const addPeriodAction = () => (dispatch, getState) => {
  const tokenList = getState().calculatorState.tokenList.slice();

  if (tokenList[tokenList.length - 1].indexOf(MATH_TEXT.point) === -1) {
    tokenList[tokenList.length - 1] += MATH_TEXT.point;
  }
  dispatch(updateTokenList(tokenList));
  dispatch(displayEquationAction());
};
