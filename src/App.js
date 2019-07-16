import React, { Component } from 'react'
import Login from './Login'
import Surveys from './Surveys'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: null };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(userId) {
    this.setState({userId})
  }

  render() {
    return (
      !(this.state.userId == null) ?
        <Surveys userId={this.state.userId} /> :
        <Login handleLogin={this.handleLogin}/>
    )
  }
}
