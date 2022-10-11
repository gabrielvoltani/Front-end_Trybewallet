import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  sumExpenses = ({ expenses } = this.props) => {
    let sumExp = 0;
    expenses.forEach((exp) => {
      const expValue = exp.expense;
      const exchangeValue = exp.exchangeRates[exp.currency].ask;
      sumExp += expValue * exchangeValue;
    });
    return sumExp.toFixed(2);
  };

  render() {
    const {
      email,
    } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          { this.sumExpenses() }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
