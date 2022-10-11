import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      const { email, password } = this.state;
      const minLength = 6;
      const validRegex = /\S+@\S+\.\S+/;
      this.setState({
        isDisabled: password.length < minLength || !validRegex.test(email),
      });
    });
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const {
      email,
      isDisabled,
      password,
    } = this.state;

    return (
      <div>
        <input
          data-testid="email-input"
          type="text"
          placeholder="Email"
          onChange={ this.handleChange }
          value={ email }
          name="email"
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
          onChange={ this.handleChange }
          value={ password }
          name="password"
        />
        <div>
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect()(Login);
