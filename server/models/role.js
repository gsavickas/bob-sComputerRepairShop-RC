/**
 * * Title: role.js
 * Author: James Pinson
 * Date: 09/29/21
 * Description: This is the model for the roles. 
 */

//Here we have our require statement and schema. 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Here we create our role schema. 
const roleSchema = new Schema({
    text: { type: String, unique: true },
    isDisabled: { type: Boolean, default: false }
})

//Here we export our role mongoose model. 
module.exports = mongoose.model('Role', roleSchema);