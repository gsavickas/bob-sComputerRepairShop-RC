/**
 * Title: base-response.js
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 16 September 2021
 * Description: This sets up the base response for our successful api calls.
 */

//This creates our base response class with its variables of httpCode, message, and data. 
class BaseResponse {
    constructor(httpCode, message, data) {
        this.httpCode = httpCode;
        this.message = message;
        this.data = data;
    }

    //This is the toObject function which returns the variables. 
    toObject() {
        return {
            'httpCode': this.httpCode,
            'message': this.message,
            'data': this.data,
            'timestamp': new Date().toLocaleDateString()
        }
    }
}

//This exports the base response class to the rest of the application. 
module.exports = BaseResponse;