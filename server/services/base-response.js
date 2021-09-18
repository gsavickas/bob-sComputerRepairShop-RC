/**
 * * Title: base-response.js
 * Author: Larry Ohaka
 * Date: 09/16/21
 * Description: Users API
 */


//Base response class gives out the base information
class BaseResponse {
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

module.exports = BaseResponse