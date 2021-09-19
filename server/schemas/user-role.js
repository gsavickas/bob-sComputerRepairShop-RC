/**
 * * Title: user.js
 * Author: Grayton Savickas
 * Date: 09/16/21
 * Description: Users API
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserRoleSchema = new Schema({
    role: {type: String, default: 'standard'}

});

module.exports = UserRoleSchema;