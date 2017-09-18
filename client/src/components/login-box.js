import React from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { loginUser } from '../utils/auth';

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChangeInput(e, inputName) {
    const value = e.target.value;
    this.setState({ [inputName]: value });
  }


  onSubmitForm(event) {
    event.preventDefault();
    const { email, password } = this.state;
    loginUser(email, password).then((resolve) => {
      this.props.login(resolve.data.data.token);
      this.props.history.push('/list');
    });
    // .catch(error => console.log(error)); // uncomment only for debugging
  }

  render() {
    return (
      <div className="qd-login-box">
        <form onSubmit={e => this.onSubmitForm(e)}>
          <h1 className="qd-login-box__title">Witaj!</h1>
          <Input className="qd-login-box__input" label="Login" value={this.state.email} onChange={e => this.onChangeInput(e, 'email')} placeholder="Twój login..." />
          <Input className="qd-login-box__input" label="Hasło" value={this.state.password} onChange={e => this.onChangeInput(e, 'password')} type="password" placeholder="Twoje hasło..." />
          <div className="qd-login-box__actions qd-actions">
            <Link to="/register">
              <Button className="actions__btn" type="button" animated>
                <Button.Content visible>Stwórz konto</Button.Content>
                <Button.Content hidden>
                  <Icon name="user" />
                </Button.Content>
              </Button>
            </Link>
            <Button className="actions__btn" type="submit" animated>
              <Button.Content visible>Zaloguj się</Button.Content>
              <Button.Content hidden>
                <Icon name="right arrow" />
              </Button.Content>
            </Button>
          </div>
        </form>
        <a className="qd-missing-pass-link" href="/">Nie pamiętasz hasła?</a>
      </div>
    );
  }
}

LoginBox.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  login: PropTypes.func,
};

LoginBox.defaultProps = {
  login: () => {},
};

export default withRouter(LoginBox);
