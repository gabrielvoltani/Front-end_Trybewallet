import {
  SAVE_EXPENSE,
  ADD_EXPENSE,
  DEL_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EXPENSE:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((cy) => cy !== 'USDT'),
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DEL_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
      edito: false,
    };
  default:
    return state;
  }
};

export default wallet;
