/*
=====================================
  ; Title: app.js
  ; Author: Tyler Armstrong
  ; Date: 29 Sep 2019
  ; Description: API for NodeQuiz
======================================
*/

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./db-models/user');
const Quiz = require('./db-models/quiz');
const router = express.Router();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../dist/nodequiz')));
app.use('/', express.static(path.join(__dirname, '../dist/nodequiz')));

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Global variables
const serverPort = 3000;

/************************* Mongoose connection strings go below this line  ***************/
// Connect to DB
const mongoDB = "mongodb+srv://user:PassW0rd1234@nodequiz-yk3sx.mongodb.net/nodequiz?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connected error: "));
db.once("open", function() {
  console.log("Application connected to Atlas MongoDB instance");
});


/************************* API routes go below this line ********************/

/**
 * Add new user
 */
app.post('/api/users', function(req, res, next) {
  const user = {
    userId: req.body.userId
  };
});

/**
 * Add new quiz
 */
app.post('/api/quizzes', function(req, res, next) {
  const quiz = {
    quizId: req.body.quizId,
    questions: [
      {
        question_text: req.body.question_text,
        question_choices: [
          req.body.choices
        ],
        answer: req.body.answer
      }
    ]
  };
});

Quiz.create(quiz, function(err, quiz) {
  if (err) {
    console.log(err);
    return next(err);
  } else {
    console.log(quiz);
    res.json(quiz);
  }
});

/**
 * Get all users
 */
app.get('/api/users', function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(users);
      res.json(users);
    }
  })
});

/**
 * Get all quizzes
 */


/**
 * API to validate user in NodeQuiz
 */
app.get('/api/user/:id', function(req, res, next) {
  User.findOne({'userId': req.params.id}, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(user);
      res.json(user);
    }
  })
});

/**
 * Creates an express server and listens on port 3000
 */
http.createServer(app).listen(serverPort, function() {
  console.log(`Application started and listing on port: ${serverPort}`);
});
