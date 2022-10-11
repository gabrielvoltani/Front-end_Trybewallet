import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

const eInput = 'email-input';
const pInput = 'password-input';

describe('Test Login.js file', () => {
  test('Check if App is renderized', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Check inputs and button', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(eInput);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId(pInput);
    expect(passwordInput).toBeInTheDocument();
    const button = screen.getByText('Entrar');
    expect(button).toBeInTheDocument();
  });

  test('Check wrong emails and passwords', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByText('Entrar');
    expect(button).toHaveAttribute('disabled');
    const emailInput = screen.getByTestId(eInput);
    const passwordInput = screen.getByTestId(pInput);
    userEvent.type(emailInput, '1');
    userEvent.type(passwordInput, '123');
    expect(button).toHaveAttribute('disabled');
  });

  test('Check right inputs', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByText('Entrar');
    expect(button).toHaveAttribute('disabled');
    const emailInput = screen.getByTestId(eInput);
    const passwordInput = screen.getByTestId(pInput);
    userEvent.type(emailInput, 'abc@def.com');
    userEvent.type(passwordInput, '123654');
    expect(button).not.toHaveAttribute('disabled');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});
