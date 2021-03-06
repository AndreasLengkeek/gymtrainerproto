import React, { Component } from 'react';
import ForgotPassword from '../components/ForgotPassword';
import auth from '../utils/Auth';
import axios from 'axios';

/**
 * Passes functions to use API to components for forgot password
 */
class ForgotPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      error: null,
      loading: false,
      email: ''
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.submit = this.submit.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  /**
   * Update state when value in component is changed.
   */
  changeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  /**
   * Post forgotten email with message.
   */
  submit(event) {
    event.preventDefault();
    this.setLoading(true);

    const forgot = {
      email: this.state.email
    };

    axios.post('/auth/forgotten', forgot)
      .then(response => {
        const { message } = response.data;
        if (message) {
          this.setState({
            message: message,
            error: null
          });
        }
        this.setLoading(false);
      }).catch(err => {
        console.log('error = ',err.response);
        const { error } = err.response.data;
        if (error) {
          this.setState({
            error: error,
            message: null
          });
        }
        this.setLoading(false);
      });
  }

  /**
   * While post is occuring update components to state loading.
   */
  setLoading(l) {
      this.setState({
          loading: l
      });
  }

  render() {
    return (
      <ForgotPassword
        onSubmit={this.submit}
        onChange={this.changeEmail}
        loading={this.state.loading}
        error={this.state.error}
        message={this.state.message}
        email={this.state.email} />
    );
  }
}

export default ForgotPasswordContainer;
