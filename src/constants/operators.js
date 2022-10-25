export const OPERATORS = [
  {
    id: 'op-negate',
    numOperands: 1,
    symbol: ' -',
    calc: (a) => -a,
  },
  {
    id: 'op-square-root',
    numOperands: 1,
    symbol: ' √',
    calc: (a) => Math.sqrt(a),
  },
  {
    id: 'op-multiply',
    numOperands: 2,
    symbol: ' * ',
    calc: (a, b) => a * b,
  },
  {
    id: 'op-divide',
    numOperands: 2,
    symbol: ' / ',
    calc: (a, b) => a / b,
  },
  {
    id: 'op-add',
    numOperands: 2,
    symbol: ' + ',
    calc: (a, b) => a + b,
  },
  {
    id: 'op-subtract',
    numOperands: 2,
    symbol: ' - ',
    calc: (a, b) => a - b,
  },
]
