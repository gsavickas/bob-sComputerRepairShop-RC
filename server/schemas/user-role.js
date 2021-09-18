/**
 * * Title: user-role.js
 * Author: Larry Ohaka
 * Date: 09/16/21
 * Description: Nested array of data
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userRoleSchema = new Schema ({
    role: {type: String, default: 'standard'}
})

module.exports = userRoleSchema;