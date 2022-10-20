import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import mockData from './mockData';

// const STATE = {
//   user: {
//     email: 'abc@def.com',
//     senha: '123564',
//   },
//   wallet: {
//     editor: false,
//     idToEdit: 0,
//     currencies: [
//       'USD',
//       'CAD',
//       'GBP',
//       'ARS',
//       'BTC',
//       'LTC',
//       'EUR',
//       'JPY',
//       'CHF',
//       'AUD',
//       'CNY',
//       'ILS',
//       'ETH',
//       'XRP',
//       'DOGE',
//     ],
//     expenses: [
//       {
//         id: 0,
//         value: '100',
//         description: 'Viagem',
//         currency: 'EUR',
//         method: 'Dinheiro',
//         tag: 'Lazer',
//         exchangeRates: mockData,
//       },
//       {
//         id: 1,
//         value: '20',
//         description: 'Passagem',
//         currency: 'DOGE',
//         method: 'Cartão de Crédito',
//         tag: 'Transporte',
//         exchangeRates: mockData,
//       },
//       {
//         id: 2,
//         value: '30',
//         description: 'Dogão',
//         currency: 'BTC',
//         method: 'Cartão de Débito',
//         tag: 'Alimentação',
//         exchangeRates: mockData,
//       },
//     ],
//   },
// };

const teste = [
  {
    id: 0,
    value: '100',
    description: 'Viagem',
    currency: 'EUR',
    method: 'Dinheiro',
    tag: 'Lazer',
    exchangeRates: mockData,
  },
  {
    id: 1,
    value: '20',
    description: 'Passagem',
    currency: 'DOGE',
    method: 'Cartão de Crédito',
    tag: 'Transporte',
    exchangeRates: mockData,
  },
  {
    id: 2,
    value: '30',
    description: 'Dogão',
    currency: 'BTC',
    method: 'Cartão de Débito',
    tag: 'Alimentação',
    exchangeRates: mockData,
  },
];

const teste2 = [
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
];

const VALUE_INPUT_TEST_ID = 'value-input';
const DESCRIPTION_INPUT_TEST_ID = 'description-input';
const TOTAL_FIELD_TEST_ID = 'total-field';
const CURRENCY_FIELD_TEST_ID = 'header-currency-field';
const BUTTON_DELETE_TEST_ID = 'delete-btn';

describe('Renderização do WalletForm', () => {
  test('Itens da página wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(history.location.pathname).toBe('/carteira');

    const vaDespesa = screen.getByTestId(VALUE_INPUT_TEST_ID);
    const vaDescri = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');

    expect(vaDespesa).toBeInTheDocument();
    expect(vaDescri).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
  });
  test('Botão adc', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { wallet: { currencies: teste2, expenses: teste } } });
    const { pathname } = history.location;
    const botAdc = screen.getByRole('button', { name: /Adicionar despesa/i });
    expect(pathname).toBe('/carteira');
    expect(botAdc).toBeInTheDocument();
    const vaDespesa = screen.getByTestId(VALUE_INPUT_TEST_ID);
    userEvent.type(vaDespesa, '30');
    expect(vaDespesa).toHaveValue(30);
    const vaComValor = screen.getByDisplayValue(30);
    expect(vaComValor).toBeInTheDocument();
    const excBtn = screen.getAllByRole('button', { name: /Excluir/i });
    expect(excBtn[0]).toBeInTheDocument();
    userEvent.click(botAdc);
    // const excBtn = await screen.findByTestId(BUTTON_DELETE_TEST_ID);
    // expect(excBtn).toBeInTheDocument();
  });
  test('click do Botão adc', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { pathname } = history.location;
    const vaDespesa = screen.getByTestId(VALUE_INPUT_TEST_ID);
    const vaDescri = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
    const botAdc = screen.getByRole('button', { name: /Adicionar despesa/i });
    expect(pathname).toBe('/carteira');
    expect(botAdc).toBeInTheDocument();
    userEvent.type(vaDespesa, '30');
    userEvent.type(vaDescri, 'restaurante');
    userEvent.click(botAdc);
    const btnExcluir = await screen.findByTestId(BUTTON_DELETE_TEST_ID);
    const data = await screen.findByRole('cell', {
      name: /alimentação/i,
    });
    expect(btnExcluir).toBeInTheDocument();
    expect(data).toBeInTheDocument();

    userEvent.click(btnExcluir);
  });
});
describe('', () => {
  test('Heard', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { user: { email: 'textbox' } } });

    const emailUsed = screen.getByTestId('email-field');
    const valueTotal = screen.getByTestId(TOTAL_FIELD_TEST_ID);
    const currencyCoin = screen.getByTestId(CURRENCY_FIELD_TEST_ID);

    expect(emailUsed.innerHTML).toBe('textbox');
    expect(valueTotal.innerHTML).toBe('0.00');
    expect(currencyCoin.innerHTML).toBe('BRL');
  });
  test('Verifica se ao clicar no botão excluir a despesa é excluída', () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { wallet: { currencies: teste2, expenses: teste } } });
    const buttonDelete = screen.getAllByTestId(BUTTON_DELETE_TEST_ID);
    const somatoria = screen.getByTestId('total-field');
    expect(somatoria.innerHTML).toEqual('4937.97');
    userEvent.click(buttonDelete[0]);
    userEvent.click(buttonDelete[1]);
    const expense = [
      {
        id: 2,
        value: '30',
        description: 'Dogão',
        currency: 'BTC',
        method: 'Cartão de Débito',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
    ];
    expect(somatoria.innerHTML).toEqual('4417.05');
    expect(store.getState().wallet.expenses).toEqual(expense);
  });
});
