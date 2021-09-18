/**
 * * Title: security-question-api.js
 * Author: Larry Ohaka
 * Date: 09/18/21
 * Description: Security-question object model
 */


const mongoose = require( 'mongoose');
const  Schema = mongoose.Schema;


let securityQuestionSchema = new Schema ({
    text: {type: String },
    isDisabled: { type: Boolean, default: false }
}, { collection: 'securityQuestions'})


module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);