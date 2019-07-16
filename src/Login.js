import React, { Component } from 'react'
import styles from './Login.module.css'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postData = this.postData.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postData('/user', {name: this.state.value})
      .then(data => {
        this.props.handleLogin(data);
      })
      .catch(error => console.error(error));
  }
  
  postData(url = '', data = {}) {
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data),
    })
    .then(response => response.json());
  }

  render() {
    return (
      <div className={styles.Form_Container}>
        <form className={styles.Form} onSubmit={this.handleSubmit}>
          <label>
            What's your name?
            <input className={styles.Name_Input} type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input className={styles.Submit_Button} type="submit" value="Ask away!" disabled={!this.state.value.length}/>
        </form>
      </div>
    )
  }
}
