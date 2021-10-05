/**
 * Title: app.js
 * Author: James Pinson, Grayton Savickas
 * Date: 16 September 2021
 * Description: This sets the main application file for our node.js server. 
 */

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');


/**
 * Routes
 */

const UserApi = require('./routes/user-api')
const SessionApi = require('./routes/session-api');
const SecurityQuestionApi = require('./routes/security-question-api');
const RoleApi = require('./routes/role-api');
const InvoiceApi = require('./routes/invoice-api');

/**
 * App configurations
 */
let app = express();
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bob-sComputerRepairShop-RC')));
app.use('/', express.static(path.join(__dirname, '../dist/bob-sComputerRepairShop-RC')));



//-------------------------------Database connection edited by Larry-------------------------------//

/**
 * Variables
 * Uses either the supplied port or port 3000 as default
 */
const port = process.env.PORT || 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://bcrs_user:psswrd@cluster0.7thzg.mongodb.net/bcrsDB?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex:true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 */
app.use('/api/users', UserApi);
app.use('/api/session', SessionApi);
app.use('/api/security-questions', SecurityQuestionApi);
app.use('/api/roles', RoleApi);
app.use('/api/invoices', InvoiceApi)


/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
