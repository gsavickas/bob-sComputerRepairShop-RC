/**
 * * Title: session-api.js
 * Author: Larry Ohaka
 * Date: 09/18/21
 * Description: Api manages session users
 */

//require statements
const express = require('express');
const User = require('../models/User');
//bcrypt library for the signin function
const bcrpyt = require('bcryptjs');
const ErrorResponse = require('../services/error-response')
const BaseResponse = require('../services/base-response');

//configuration
const router = express.Router();

/**
 * User sign-in
 */

router.post('/signin', async(req,res) =>{
    try{
        User.findOne({'userName': req.body.userName}, function(err, user)
        {
            //if there is an error response class
            if(err)
            {
            console.log(err);
            const signinMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(signinMongodbErrorResponse.toObject());
        }
        else{
            console.log(user);
            /**
             * if the username is valid
             */
            if (user){
                let passwordIdValid = bcrpyt.compareSync(req.body.password, user.password);

                /**
                 * if password is valid
                 */
                if (passwordIsValid){
                    console.log('Login Successful!');
                    const signinResponse = new BaseResponse(200, 'Login successful', user);
                    res.json(signinResponse.toObject());
                }
            

                /**
                 * if password isnt valid
                 */
                else{
                    console.log(`Invalid password for User: ${user.userName}`);
                    const invalidPasswordResponse = new BaseResponse(401, 'Invalid username and/or password, please try again', null);
                    res.status(401).send(invalidPasswordResponse.toObject());
                }
            }
            /**
                 * if username is valid
                 */
             else{
                console.log(`Username: ${req.body.userName} is invalid`);
                const invalidUserNameResponse = new BaseResponse(200, 'Invalid username and/or password, please try again', null);
                res.status(401).send(invalidUserNameResponse.toObject());
            }
        }
        
        })
    }
    /** returns error response
     * 
     */
    catch(e){
        console.log(e);
        const signinCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(signinCatchErrorResponse.toObject());
    }
});

module.exports = router;