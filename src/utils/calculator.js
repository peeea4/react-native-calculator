import {
  DEFAULT_PRIORITY,
  OPERATORS,
  MATH_TEXT,
  OPERATORS_ID,
} from '../constants';

export const applyOperator = (operator, values) =>
  operator.calc(...values.reverse().map(parseFloat));

export const hasPriority = (firstOperator, secondOperator) => {
  if (getOperator(firstOperator) !== undefined) {
    return (
      getOperatorPriority(firstOperator) <= getOperatorPriority(secondOperator)
    );
  }
};

const isCorrectOperatorId = operatorId => operator =>
  operator.id === operatorId;

export const getOperator = operatorId =>
  OPERATORS.find(isCorrectOperatorId(operatorId));

const getOperatorPriority = operatorId => {
  const priority = OPERATORS.findIndex(isCorrectOperatorId(operatorId));
  return priority > -1 ? priority : DEFAULT_PRIORITY;
};

export const sumTokenString = (htmlString, currentToken) => {
  if (isNaN(currentToken)) {
    switch (currentToken) {
      case OPERATORS_ID.bracket_left:
        return (htmlString += MATH_TEXT.bracket_left);

      case OPERATORS_ID.bracket_right:
        return (htmlString += MATH_TEXT.bracket_right);

      default:
        return (htmlString += getOperator(currentToken).symbol);
    }
  } else {
    return (htmlString += currentToken);
  }
};
