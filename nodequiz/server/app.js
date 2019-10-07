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
const Presentation = require('./db-models/presentation');
const Card = require('./db-models/card');
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
 * API to validate user in NodeQuiz
 */
app.get('/api/user/:id', function(req, res, next) {
  User.findOne({'userId': req.params.id}, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      res.json(user);
    }
  })
});

/**
 * Add new card
 */
app.post('/api/cards', function(req, res, next) {

  const card = new Card();

    card.cardId = req.body.cardId;
    card.cardHeader = req.body.cardHeader,
    card.cardSubheader = req.body.cardSubheader,
    card.cardImage = req.body.cardImage,
    card.cardContent = req.body.cardContent,
    card.btnText = req.body.btnText

    card.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Card created!' });
  });

});

/**
 * Get all dashboard cards
 */
app.get('/api/cards', function(req, res, next) {
  Card.find({}, function(err, cards) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      res.json(cards);
    }
  })
});

/**
 * Add new presentation
 */
app.post('/api/presentations', function(req, res, next) {

  const prez = new Presentation();

    prez.id = req.body.id,
    prez.title = req.body.title,
    prez.subTitle = req.body.subTitle,
    prez.slides = req.body.slides

    prez.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Presentation Created!' });
  });

});

/**
 * Get presentations
 */
app.get('/api/presentations', function(req, res, next) {
  Presentation.find({}, function(err, presentation) {
    if (err) {
      return next(err);
    }  else {
      res.json(presentation);
    }
  })
});

/**
 * Get presentation
 */
app.get('/api/presentations/:id', function(req, res, next) {
  Presentation.findOne({'id': req.params.id}, function(err, presentation) {
    if (err) {
      return next(err);
    }  else {
      res.json(presentation);
    }
  })
});

/**
 * Add new quiz
 */
app.post('/api/quizzes', function(req, res, next) {

  const quiz = new Quiz();

    quiz.id = req.body.id,
    quiz.title = req.body.title,
    quiz.questions = req.body.questions,
    quiz.challenge = req.body.challenge,
    quiz.choices = req.body.choices

    quiz.save(function(err) {
      if (err)
        res.send(err);
      res.json({ quiz });
    });

});

/**
 * Get quizzes
 */
app.get('/api/quizzes', function(req, res, next) {
  Quiz.find({}, function(err, quiz) {
    if (err) {
      return next(err);
    }  else {
      res.json(quiz);
    }
  })
});

/**
 * Get quiz
 */
app.get('/api/quizzes/:id', function(req, res, next) {
  Quiz.findOne({'id': req.params.id}, function(err, quiz) {
    if (err) {
      return next(err);
    }  else {
      res.json(quiz);
    }
  })
});

/**
 * Creates an express server and listens on port 3000
 */
http.createServer(app).listen(serverPort, function() {
  console.log(`Application started and listing on port: ${serverPort}`);
});
