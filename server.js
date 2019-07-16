const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

const Store = require('data-store');
const store = new Store({ path: 'config.json' });
// initialize store
store.set('users', []);
store.set('surveys', []);

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/user', function (req, res) {
  let users = store.get('users');
  let user;
  let i = users.map(function(u) { return u.name; }).indexOf(req.body.name);

  if (users[i]) {
    user = users[i];
  } else {
    //create user and return user
    user = { name: req.body.name, id: users.length, answers: [] };
    users.push(user);
    store.set('users', users);
  }

  res.json(user.id);
})

app.get('/user/:id', function (req, res) {
  res.json(store.get('users').find(u => u.id === parseInt(req.params.id)));
})

app.get('/surveys', function (req, res) {
  let surveys = store.get('surveys');
  res.json(surveys)
})

app.post('/survey', function(req, res) {
  let answers = req.body.answers.map((a, i) => {
    a.responses = [];
    a.id = i;
    return a;
  })
  let surveys = store.get('surveys');
  let survey = {
    question: req.body.question,
    answers,
    id: surveys.length
  };

  surveys.push(survey);
  store.set('surveys', surveys);
  res.json(surveys);
})

app.post('/answer', function(req, res) {

  let users = store.get('users');
  let ui = users.findIndex(u => u.id === req.body.user.id);
  let surveys = store.get('surveys');

  let si = surveys.findIndex(s => {
    return s.id === req.body.surveyId;
  })

  let ai = surveys[si].answers.findIndex(a => {
    return a.id === req.body.answer.id;
  })

  let currentAnswer = users[ui].answers[si];

  // If user has voted, clear vote first
  if (currentAnswer) {
    let ci = surveys[si].answers.findIndex(a => {
      return a.value === currentAnswer;
    })
    let responseIndex = surveys[si].answers[ci].responses.findIndex(userName => {
      return userName === req.body.user.name
    });

    // clear from survey
    surveys[si].answers[ci].responses.splice(responseIndex, 1) // name is specified identifier?
  }

  // set new answer
  surveys[si].answers[ai].responses.push(req.body.user.name);

  // set answer at survey index on user
  users[ui].answers[si] = req.body.answer.value

  store.set('surveys', surveys);
  store.set('users', users);

  let response = {surveys, user: users[ui]};
  
  res.json(response);
})

app.listen(process.env.PORT || 8080);

console.log('Listing on port ' + (process.env.PORT || 8080));