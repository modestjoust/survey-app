import React from 'react'
import styles from './SurveyList.module.css'

export default function SurveyList({user, surveys, handleAnswerChange}) {
  // let surveyList = surveys.reverse();
  let surveyList = surveys
  return (
    <div className={styles.Container}>
      {surveyList.map((s, si) => 
        <div className={styles.Survey_Card}>
          <div className={styles.Question}>{s.question}</div>
          <form className={styles.Responses}>
            {s.answers.map(a => (
              <div className={`${styles.Response} ${(user.answers[si] === a.value ? styles.Selected : '')}`}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={a.value}
                    checked={user.answers[si] === a.value}
                    onChange={(e) => handleAnswerChange(e, s, a)}
                    className="form-check-input"
                  />
                  <div className={styles.Answer_Value}>{a.value}</div>
                </label>
                <div className={styles.Response_Count}>{a.responses.length}</div>
                <div className={styles.Responders}>{a.responses.map(r => <span>{r}</span>)}</div>
                </div>
            ))}
          </form>
        </div>
      )}
    </div>
  )
}
