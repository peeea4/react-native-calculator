import {useCallback, useMemo} from 'react';

import {useTheme} from '@react-navigation/native';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {OPERATORS_ID, KEYPAD_BUTTONS} from '../../constants';
import {
  addTokenAction,
  addPeriodAction,
  displayEquationAction,
  deleteLastTokenAction,
  calculateAction,
} from '../../store/slices/asyncCalc';
import {
  clearCalcHistory,
  clearTokenList,
  updatePreviousValue,
} from '../../store/slices/calculator';
import {KeypadButton} from './KeypadButton';

const screen = Dimensions.get('window');
const height = screen.height / 11;
const keyPadHeight = screen.height * 0.66 + 16;

const Keypad = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {tokenList} = useSelector(state => state.calculatorState);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const clickButton = useCallback(
    btn => {
      switch (btn.id) {
        case OPERATORS_ID.delete:
          dispatch(deleteLastTokenAction());
          break;
        case OPERATORS_ID.clear:
          if (tokenList.length === 0) {
            dispatch(clearCalcHistory());
            dispatch(updatePreviousValue(''));
          } else {
            dispatch(clearTokenList());
            dispatch(displayEquationAction());
            dispatch(updatePreviousValue(''));
          }
          break;
        case OPERATORS_ID.period:
          if (isNaN(tokenList[tokenList.length - 1])) {
            dispatch(addTokenAction('0.'));
          } else {
            dispatch(addPeriodAction());
          }
          dispatch(displayEquationAction());
          break;
        case OPERATORS_ID.equals:
          dispatch(calculateAction());
          break;
        case OPERATORS_ID.op_negate:
          if (
            !tokenList.length ||
            !tokenList[tokenList.length - 1].match(/[\d]/g)
          )
            dispatch(addTokenAction(btn.id));
          break;
        default:
          if (btn.id.includes(OPERATORS_ID.num)) {
            dispatch(addTokenAction(btn.valueButton));
          } else {
            if (
              (tokenList.length &&
                tokenList[tokenList.length - 1].match(/[\d]/)) ||
              btn.id === OPERATORS_ID.bracket_right ||
              btn.id === OPERATORS_ID.bracket_left ||
              tokenList[tokenList.length - 1] === OPERATORS_ID.bracket_right
            )
              dispatch(addTokenAction(btn.id));
          }
      }
    },
    [dispatch, tokenList],
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.row}>
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.opNegate}
            style={styles.engineerOps}
          />
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.bracketLeft}
            style={styles.engineerOps}
          />
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.bracketRight}
            style={styles.engineerOps}
          />
        </View>
        <View style={styles.row}>
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.clear}
            style={styles.clearBtns}
          />
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.delete}
            style={styles.clearBtns}
          />
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.opDivide}
            style={styles.operators}
          />
        </View>
        <View style={styles.row}>
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.num7}
            style={styles.num}
          />
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.num8}
            style={styles.num}
          />
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.num9}
            style={styles.num}
          />
        </View>
        <View style={styles.row}>
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.num4}
            style={styles.num}
          />
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.num5}
            style={styles.num}
          />
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.num6}
            style={styles.num}
          />
        </View>
        <View style={styles.row}>
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.num1}
            style={styles.num}
          />
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.num2}
            style={styles.num}
          />
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.num3}
            style={styles.num}
          />
        </View>
        <View style={styles.row}>
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.num0}
            style={styles.zero}
          />
          <KeypadButton
            handlePress={clickButton}
            buttonInfo={KEYPAD_BUTTONS.period}
            style={styles.num}
          />
        </View>
      </View>
      <View>
        <KeypadButton
          handlePress={clickButton}
          buttonInfo={KEYPAD_BUTTONS.opMultiply}
          style={styles.engineerOps}
        />
        <KeypadButton
          handlePress={clickButton}
          buttonInfo={KEYPAD_BUTTONS.opMultiply}
          style={styles.operators}
        />
        <KeypadButton
          handlePress={clickButton}
          buttonInfo={KEYPAD_BUTTONS.opSubstract}
          style={styles.operators}
        />
        <KeypadButton
          handlePress={clickButton}
          buttonInfo={KEYPAD_BUTTONS.opAdd}
          style={styles.pluse}
        />
        <KeypadButton
          handlePress={clickButton}
          buttonInfo={KEYPAD_BUTTONS.equals}
          style={styles.equals}
        />
      </View>
    </View>
  );
};

export default Keypad;

const createStyles = theme =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      height: keyPadHeight,
    },
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    num: {
      width: height,
      height: height,
      color: theme.colors.buttonColor,
      backgroundColor: theme.colors.buttonBackground,
    },
    operators: {
      width: height,
      height: height,
      color: theme.colors.opsColor,
      backgroundColor: theme.colors.opsBackground,
    },
    equals: {
      width: height,
      height: height * 1.5 + 8,
      color: theme.colors.equalsButtonColor,
      backgroundColor: theme.colors.equalsButtonBackground,
    },
    clearBtns: {
      width: height,
      height: height,
      color: theme.colors.clearBtnsColor,
      backgroundColor: theme.colors.clearBtnsBackground,
    },
    engineerOps: {
      width: height,
      height: height * 0.66,
      borderRadius: 24,
      fontSize: 18,
      color: theme.colors.buttonColor,
      backgroundColor: theme.colors.buttonBackground,
    },
    zero: {
      width: height * 2 + 16,
      height: height,
      color: theme.colors.buttonColor,
      backgroundColor: theme.colors.buttonBackground,
    },
    pluse: {
      width: height,
      height: height * 1.5 + 8,
      color: theme.colors.opsColor,
      backgroundColor: theme.colors.opsBackground,
    },
  });
