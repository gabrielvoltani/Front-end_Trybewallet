import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import mockData from './mockData';

const STATE = {
  user: {
    email: 'abc@def.com',
    senha: '123564',
  },
  wallet: {
    editor: false,
    idToEdit: 0,
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '100',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: 'Lazer',
        description: 'Viagem',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '20',
        currency: 'DOGE',
        method: 'Cartão de Crédito',
        tag: 'Transporte',
        description: 'Passagem',
        exchangeRates: mockData,
      },
      {
        id: 2,
        value: '30',
        currency: 'BTC',
        method: 'Cartão de Débito',
        tag: 'Alimentação',
        description: 'Dogão',
        exchangeRates: mockData,
      },
    ],
  },
};

const VALUE_INPUT_TEST_ID = 'value-input';
const DESCRIPTION_INPUT_TEST_ID = 'description-input';
const TOTAL_FIELD_TEST_ID = 'total-field';
const CURRENCY_FIELD_TEST_ID = 'header-currency-field';
const BUTTON_DELETE_TEST_ID = 'delete-btn';

describe('Tests Wallet.js file ', () => {
  test('Verifica se ao renderizar a rota está correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');
    expect(history.location.pathname).toBe('/carteira');
  });

  test('Verifica se os inputs (Valor, Descrição) e os campos Total Field e Currency existem', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');
    const inputValor = screen.getByTestId(VALUE_INPUT_TEST_ID);
    const inputDescription = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
    const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);
    const currencyField = screen.getByTestId(CURRENCY_FIELD_TEST_ID);
    expect(inputValor).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
    expect(currencyField).toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão excluir a despesa é excluída', () => {
    const {
      history, store } = renderWithRouterAndRedux(<App />, { initialEntries: STATE });
    history.push('/carteira');
    const buttonDelete = screen.getAllByTestId(BUTTON_DELETE_TEST_ID);
    userEvent.click(buttonDelete[0]);
    userEvent.click(buttonDelete[1]);
    const expense = [
      {
        id: 2,
        value: '30',
        currency: 'BTC',
        method: 'Cartão de Débito',
        tag: 'Alimentação',
        description: 'Dogão',
        exchangeRates: mockData,
      },
    ];
    expect(store.getState().wallet.expenses).toEqual(expense);
  });
});
