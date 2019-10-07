/*
=====================================
  ; Title: dashboard-card.js
  ; Author: Tyler Armstrong
  ; Date: 30 Sep 2019
  ; Description: Dashboard-card object model.
======================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardSchema = new Schema({
  cardId: String,
  cardHeader: String,
  cardSubheader: String,
  cardImage: String,
  cardContent: String,
  btnText: String,
}, {collection: 'cards'});

module.exports = mongoose.model('Card', cardSchema, 'cards');


