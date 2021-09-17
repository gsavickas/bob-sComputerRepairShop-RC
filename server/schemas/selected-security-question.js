/**
 * Title: selected-security-questions.js
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 16 September 2021
 * Description: This sets up our selected security questions schema. 
 */

//Here we have the require statement for mongoose and create our Schema variable. 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Here we create the new selected security questions schema with the variables question text, and answer text. 
let selectedSecurityQuestionSchema = new Schema({
    questionText: { type: String },
    answerText: { type: String}
})

//This exports the schema to the rest of the application. 
module.exports = selectedSecurityQuestionSchema;