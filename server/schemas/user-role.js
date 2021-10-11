/**
 * * Title: user-role.js
 * Author: Grayton Savickas
 * Date: 09/16/21
 * Description: Users role schema
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user role schema
let UserRoleSchema = new Schema({
    role: {type: String, default: 'standard'}

});

module.exports = UserRoleSchema;