import React, { Component } from 'react'
import SurveyCreation from './SurveyCreation'
import SurveyList from './SurveyList'
import styles from './Surveys.module.css'

export default class Surveys extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      creating: false,
      surveys: [],
    }

    this.getSurveys = this.getSurveys.bind(this)
    this.handleCreateNewClick = this.handleCreateNewClick.bind(this)
    this.handleSurveyCreation = this.handleSurveyCreation.bind(this)
    this.handleAnswerChange = this.handleAnswerChange.bind(this)
  }

  getUser() {
    let url = '/user/' + this.props.userId
    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      
    })
    .then(response => response.json());
  }

  getSurveys() {
    return fetch('/surveys', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      
    })
    .then(response => response.json());
  }

  postSurvey(url = '', data = {}) {
    
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',  
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data),
    })
    .then(response => response.json());
  }

  postAnswer(url = '', data = {}) {
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
          'Content-Type': 'application/json',
          
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data),
    })
    .then(response => response.json()); 
  }

  handleSurveyCreation(survey) {
    this.setState({ loading: true });

    this.postSurvey('/survey', survey)
      .then(data => {
        this.setState({ });
        this.setState({ surveys: data, loading: false, creating: false })
      })
      .catch(error => console.error(error));
  }

  handleCreateNewClick() {
    this.setState({creating: true});
  }

  handleAnswerChange(e, survey, answer) {
    let payload = {
      surveyId: survey.id,
      answer,
      user: this.state.user
    }

    this.postAnswer('/answer', payload)
      .then(response => {
        this.setState({ surveys: response.surveys, user: response.user })
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getUser()
      .then(user => {
        this.setState({user}, () => {
          this.getSurveys()
            .then(data => {
              this.setState({ surveys: data })
            })
            .catch(error => console.error(error));
        })
      })
  }

  render() {
    return (
      <div>
        <button id="create-new-survey" className={styles.New_Survey_Button} onClick={this.handleCreateNewClick}>+</button>
        {this.state.creating ?
          <SurveyCreation user={this.state.user} handleSurveyCreation={this.handleSurveyCreation} /> :
          <SurveyList user={this.state.user} surveys={this.state.surveys} handleAnswerChange={this.handleAnswerChange}></SurveyList>}
      </div>
    )
  }
}
