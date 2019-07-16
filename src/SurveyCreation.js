import React, { Component } from 'react'
import styles from './SurveyCreation.module.css'

export default class SurveyCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '', 
      answers: [{ value: '' }, { value: '' }]
    };

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSurveyCreation({ 
      question: this.state.question, 
      answers: this.state.answers, 
      user: this.props.user 
    });
  }

  handleQuestionChange(event) {
    this.setState({question: event.target.value});
  }

  handleAnswerChange(event, i) {
    const target = event.target;
    const value = target.value;

    let answers = [...this.state.answers];
    answers[i].value = value;

    this.setState({answers});
  }

  handleAddAnswer() {
    this.setState(prevState => ({
      answers: [...prevState.answers, {value: ''}]
    }));
  }

  render() {
    return (
      <div className={styles.Form_Container}>
        <form className={styles.Form} onSubmit={this.handleSubmit}>
          <label className={styles.Question_Label}>
            Question:
            <input className={styles.Question_Input} type="text" value={this.state.question} onChange={this.handleQuestionChange} />
          </label>

          <div className={styles.Answers_Container}>
            <div className={styles.Answers_Header}>Options:</div>
            {this.state.answers.map((a, i) => (
              <label className={styles.Answer_Label}>
                <span>{i+1}:</span>
                <input className={styles.Answer_Input} type="text" name={'Option_'+i} value={a.value} onChange={(e) => this.handleAnswerChange(e, i)} />
              </label>
            ))}
          </div>
          
          <button className={styles.Add_Answer} type="button" onClick={this.handleAddAnswer}>+ Add another answer</button>

          <input className={styles.Submit_Button}type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
