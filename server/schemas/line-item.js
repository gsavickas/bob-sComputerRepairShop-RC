/**
 * * Title: line-item.js
 * Author: Larry Ohaka
 * Date: 09/29/21
 * Description: Users API
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Line Item schema with title and price variables
const lineItemSchema = new Schema({
    title: { type: String },
    price: { type: Number },
})

module.exports = lineItemSchema;