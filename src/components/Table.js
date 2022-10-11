import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { delExpense } from '../redux/actions/index';

class Table extends Component {
  deleteExpense = ({ target }) => {
    const {
      expenses,
      dispatch,
    } = this.props;
    const removeExpense = expenses.filter((exp) => exp.id !== Number(target.id));
    dispatch(delExpense(removeExpense));
  };

  render() {
    const {
      expenses,
    } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => {
            const exchangeValue = Number(exp.exchangeRates[exp.currency].ask);
            return (
              <tr key={ exp.id }>
                <td>{exp.description}</td>
                <td>{exp.expenseType}</td>
                <td>{exp.paymentType}</td>
                <td>{Number(exp.expense).toFixed(2)}</td>
                <td>{exp.exchangeRates[exp.currency].name}</td>
                <td>{exchangeValue.toFixed(2)}</td>
                <td>{(exp.expense * Number(exchangeValue)).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    id={ exp.id }
                    onClick={ this.deleteExpense }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.shape({}).isRequired).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
