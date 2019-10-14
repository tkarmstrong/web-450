/*
=====================================
  ; Title: summary.js
  ; Author: Tyler Armstrong
  ; Date: 30 Sep 2019
  ; Description: Object model for
  ;  storing quiz results.
======================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let summarySchema = new Schema({
  userId: String,
  title: String,
  dateTaken: String,
  challenge: String,
  results: [{"question": String, "answer": String, "flag": Boolean}],
  score: Number,
}, {collection: 'summary'});

module.exports = mongoose.model('Summary', summarySchema, 'summary');


