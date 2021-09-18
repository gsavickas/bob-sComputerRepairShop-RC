/**
 * * Title: user.js
 * Author: Larry Ohaka
 * Date: 09/16/21
 * Description: Users API
 */



const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserRoleSchema = require('../schemas/user-role');
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-question')


/**
 * User role schema lists
 * 
 */
let userSchema = new Schema({
userName:                       {type: String, require: true, unique: true},
password:                       {type: String, require: true},
firstName:                       {type: String},
lastName:                       {type: String},
phoneNumber:                       {type: String},
address:                       {type: String},
email:                       {type: String},
isDisabled:                       {type: Boolean, default: false},
role:                       UserRoleSchema,
SelectedSecurityQuestionSchema:                       [SelectedSecurityQuestionSchema],
dateCreated:                       {type: Date, default: new Date()},
dateModified:                       {type: Date},
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);