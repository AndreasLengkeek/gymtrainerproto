import React, { Component } from 'react';
import ResetPassword from '../components/ResetPassword';
import auth from '../utils/Auth';
import axios from 'axios';

/**
 * Pass data between user API and compoents for Reset password
 */
class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: {
        email: '',
        password: '',
        confirm: ''
      }
    };

    this.changeUser = this.changeUser.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  /**
   * Update state with values onChange in components
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    console.log(`${field} = ${event.target.value}`);
    this.setState({
      user
    });
  }

  /**
   *  Reset password for user in state.
   *  calling API password/reset.
   */
  resetPassword(event) {
    event.preventDefault();
    let { code } = this.props.match.params;
    let { history } = this.props;
    this.setLoading(true);

    // obtain email, password and code.
    const resetForm = {
      email: this.state.user.email,
      password: this.state.user.password,
      reset: code
    };

    axios.post('/auth/password/reset', resetForm)
      .then(response => {
        this.setLoading(false);
        if (response.data.success) {
          const { token, user } = response.data;
          auth.authenticateUser(token, user);
          history.push('/');
        }
      }).catch(err => {
        console.log('error = ',err.response);
        const { error } = err.response.data;
        if (error) {
          this.setState({
            error: error
          });
        }
        this.setLoading(false);
      });
  }
  /**
   * Set loading status while updating password.
   */
  setLoading(l) {
    this.setState({
      loading: l
    });
  }

  render() {
    return (
      <ResetPassword
        onSubmit={this.resetPassword}
        onChange={this.changeUser}
        loading={this.state.loading}
        error={this.state.error}
        user={this.state.user} />
    );
  }
}

export default ResetPasswordContainer;
