/**
 * Title: security-question.js
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 16 September 2021
 * Description: This sets up the schema for the security questions. 
 */

//This requires mongoose and creates the Schema variable. 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This creates the new security question schema with the text variable and isDisabled set to false.
//This also links the schema to the securityQuestions collection. 
let securityQuestionSchema = new Schema({
    text: { type: String },
    isDisabled: { type: Boolean, default: false }
}, { collection: 'SecurityQuestions' })

//This exports the schema to the rest of the application. 
module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);