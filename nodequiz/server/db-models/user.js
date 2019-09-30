/*
=====================================
  ; Title: user.js
  ; Author: Tyler Armstrong
  ; Date: 29 Sep 2019
  ; Description: DB model for User object.
======================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: String
});

module.exports = mongoose.model('User', userSchema);
