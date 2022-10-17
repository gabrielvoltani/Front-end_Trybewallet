import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getCurrenciesThunk, addExpense } from '../redux/actions/index';
import getCurrencies from '../services/CurrencyAPI';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesThunk());
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClick = async () => {
    const currencies = await getCurrencies();
    const {
      dispatch,
      idExpense,
    } = this.props;
    this.setState({
      id: idExpense.length > 0 ? idExpense.length : 0,
      exchangeRates: currencies,
    });
    dispatch(addExpense(this.state));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const {
      currencies,
    } = this.props;

    return (
      <main>
        <div>
          <input
            type="number"
            data-testid="value-input"
            placeholder="Insert your expense"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            data-testid="description-input"
            placeholder="Insert your expense's description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((cy, index) => (
              <option key={ index } value={ cy }>{ cy }</option>
            ))}
          </select>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <div>
            <button
              type="submit"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  idExpense: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
  idExpense: propTypes.arrayOf(propTypes.shape({ }).isRequired).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
