/*
=====================================
  ; Title: quiz.js
  ; Author: Tyler Armstrong
  ; Date: 29 Sep 2019
  ; Description: DB model for Quiz object.
======================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quizSchema = new Schema({
  quizId: String,
  questions: [{
    question_text: String,
    question_choices: [String]
  }],
  answer: String
});

module.exports = mongoose.model('Quiz', quizSchema);
