/**
 * * Title:error-response.js
 * Author: Larry Ohaka
 * Date: 09/16/21
 * Description: Users API
 */


//Error response class gives out the error information
 class ErrorResponse {
    constructor(httpCode, message, data) {
        this.httpCode = httpCode;
        this.message = message;
        this.data = data;
    }
    toObject() {
        return {
            'httpCode': this.httpCode,
            'message': this.message,
            'data': this.data,
            'timestamp': new Date().toLocaleDateString()
        }
    }


}

module.exports = ErrorResponse;