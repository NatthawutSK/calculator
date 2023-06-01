type initial = {
  currentValue: any;
  operator: any;
  previousValue: any;
};

export const initialState: initial = {
  currentValue: 0,
  operator: null,
  previousValue: null,
};

export const handleDelete = (value: string, state: initial) => {
  // console.log(state.currentValue.toString().length);

  if (state.currentValue.toString().length === 1) {
    return {
      operator: null,
      previousValue: null,
      currentValue: 0,
    };
  }
  return {
    currentValue: state.currentValue.toString().slice(0, -1),
    operator: state.operator,
    previousValue: state.previousValue,
  };
};

export const handleOperator = (value: string, state: initial) => {
  if (state.operator !== null) {
    return {
      operator: value,
      previousValue: state.previousValue,
      currentValue: state.currentValue,
    };
  }
  return {
    operator: value,
    previousValue: state.currentValue,
    currentValue: '0',
  };
};

export const handleNumber = (value: string, state: initial) => {
  if (state.currentValue === 0) {
    return {
      previousValue: state.previousValue,
      operator: state.operator,
      currentValue: value,
    };
  }

  return {
    currentValue: `${state.currentValue}${value}`,
    operator: state.operator,
    previousValue: state.previousValue,
  };
};

export const handleEqual = (state: initial) => {
  const {currentValue, previousValue, operator} = state;
  const current = parseFloat(currentValue.toString());
  const previous = parseFloat(previousValue);
  const resetState = {
    operator: null,
    previousValue: null,
  };

  if (operator === '/') {
    return {
      currentValue: previous / current,
      ...resetState,
    };
  }

  if (operator === '*') {
    return {
      currentValue: previous * current,
      ...resetState,
    };
  }

  if (operator === '+') {
    return {
      currentValue: previous + current,
      ...resetState,
    };
  }

  if (operator === '-') {
    return {
      currentValue: previous - current,
      ...resetState,
    };
  }

  return state;
};

const calculator = (type: string, value: string, state: initial) => {
  switch (type) {
    case 'number':
      return handleNumber(value, state);
    case 'operator':
      return handleOperator(value, state);
    case 'equal':
      return handleEqual(state);
    case 'clear':
      return initialState;
    case 'posneg':
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`,
        operator: state.operator,
        previousValue: state.previousValue,
      };
    case 'percentage':
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
        operator: state.operator,
        previousValue: state.previousValue,
      };
    case 'del':
      return handleDelete(value, state);
    default:
      return state;
  }
};

export default calculator;
// return {
//   currentValue: state.currentValue.toString().slice(0, -1),
//   operator: state.operator,
//   previousValue: state.previousValue,
// };
