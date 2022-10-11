import getCurrencies from '../../services/CurrencyAPI';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DEL_EXPENSE = 'DEL_EXPENSE';

export function saveEmail(payload) {
  return {
    type: SAVE_EMAIL,
    payload,
  };
}

function saveExpense(payload) {
  return {
    type: SAVE_EXPENSE,
    payload,
  };
}

export function addExpense(payload) {
  return {
    type: ADD_EXPENSE,
    payload,
  };
}

export function delExpense(payload) {
  return {
    type: DEL_EXPENSE,
    payload,
  };
}

export const getCurrenciesThunk = () => async (dispatch) => {
  const apiResponse = await getCurrencies();
  dispatch(saveExpense(apiResponse));
};

export default { SAVE_EMAIL, SAVE_EXPENSE };
