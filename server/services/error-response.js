/**
 * Title: error-response.js
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 16 September 2021
 * Description: This sets up response for our error messages.
 */

//This creates the error response class with the variables httpCode, message, and data. 
class ErrorResponse {
    constructor(httpCode, message, data) {
        this.httpCode = httpCode;
        this.message = message;
        this.data = data;
    }


    //This creates the toObject function which returns the variables. 
    toObject() {
        return {
            'httpCode': this.httpCode,
            'message': this.message,
            'data': this.data,
            'timestamp': new Date().toLocaleDateString()
        }
    }
}

//This exports the ErrorResponse class to the rest of the application. 
module.exports = ErrorResponse;