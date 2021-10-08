/**
 * Author: Prof. Richard Krasso
 * Modified By: Larry Ohaka
 * Date: 10/2/21
 * Title: invoice.js
 * 
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
const lineItemDocument = require('../schemas/line-item');

 //invoice schema
 const invoiceSchema = new Schema({
     userName: { type: String },
     lineItems: [lineItemDocument],
     partsAmount: { type: Number },
     laborAmount: { type:Number},
     lineItemTotal: { type: Number },
     total: { type: Number },
     orderDate: { type: Date, default: new Date() }
 })
 //exports to module
 module.exports = mongoose.model('Invoice', invoiceSchema);