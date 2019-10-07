/*
=====================================
  ; Title: quiz.js
  ; Author: Tyler Armstrong
  ; Date: 2 Oct 2019
  ; Description: Quiz model.
======================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quizSchema = new Schema({
  id: String,
  title: String,
  questions:
    [
      {
        challenge: String,
        choices:
          [
            { a: String, flag: Boolean },
            { b: String, flag: Boolean },
            { c: String, flag: Boolean },
            { d: String, flag: Boolean }
          ]
      }
    ]
});

module.exports = mongoose.model('Quiz', quizSchema);
