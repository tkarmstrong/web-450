/*
=====================================
  ; Title: presentation.js
  ; Author: Tyler Armstrong
  ; Date: 29 Sep 2019
  ; Description: Presentation model.
======================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let presentationSchema = new Schema({
  id: String,
  title: String,
  subTitle: String,
  slides: [
    { source: String, alt: String, title: String }
  ]
});

module.exports = mongoose.model('Presentation', presentationSchema);
