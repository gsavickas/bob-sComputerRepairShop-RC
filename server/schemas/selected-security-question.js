/**
 * * Title: user-role.js
 * Author: Larry Ohaka
 * Date: 09/16/21
 * Description: Nested array of data
 */


 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 //Variable saves the answer and the text
 /**
  * Allows to delete without effecting the user or deleting the question from the system
  */
 let selectedSecurityQuestionSchema = new Schema ({
     questionText: {type: String },
     answerText: {type: String }
 })
 
 module.exports = selectedSecurityQuestionSchema;