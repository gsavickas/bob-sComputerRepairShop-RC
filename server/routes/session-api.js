/**
 * * Title: session-api.js
 * Author: Grayton Savickas
 * Date: 09/19/21
 * Description: session API
 */

// required statements
const express = require('express');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');
const User = require('../models/user');
const bcrypt = require('bcrypt')

// configuration for route
const router = express.Router();
const saltRounds = 10;
/**
 * User sign-in
 */
router.post('/signin', async(req, res) => {
    try{
        User.findOne({'userName': req.body.userName}, function(err, user){
            if (err)
            {
                console.log(err)
                const signinMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err)
                res.status(500).send(signinMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(user);

                /**
                 * If the provided userName is valid
                 */
                if (user)
                {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                    /**
                     * If the password is valid
                     */
                    if (passwordIsValid)
                    {
                        console.log('Login successful');
                        const signinResponse = new BaseResponse(200, 'Login successful', user);
                        res.json(signinResponse.toObject());
                    }

                    /**
                     * If the password is not valid
                     */
                    else
                    {
                        console.log(`Invalid password for username: ${user.userName}`);
                        const invalidPasswordResponse = new BaseResponse(401, 'Invalid username and/or password combination, please try again', null);
                        res.status(401).send(invalidPasswordResponse.toObject());
                    }
                /**
                 * If the userName is invalid 
                 */
                }
                else
                {
                    console.log(`Username: ${req.body.userName} is invalid`)
                    const invalidUserNameResponse = new BaseResponse(200, 'Invalid username and/or password combination, please tyr again', null);
                    res.status(401).send(invalidUserNameResponse.toObject());
                }
            }
        })
    }
    catch (e) {
        console.log(e);
        const signinCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(signinCatchErrorResponse.toObject());
    }
});

//User Register
router.post('/register', async (req, res) => {
try {
    User.findOne({'userName': reg.body.userName}, function(err, user)  
    {
        if (err) {
            console.log(err);
            const registerUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(registerUserMongodbErrorResponse.toObject());
        }
        else
        {
            if (!user)
            {
                let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
                standardRole = {
                    role: "standard"
                }

                let registeredUser = {
                    userName: req.body.userName,
                    password: hashedPassword,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                    email: req.body.email,
                    role: standardRole,
                    selectedSecurityQuestions: req.body.selectedSecurityQuestions
                };

                User.create(registeredUser, function(err, newUser)
                {
                    if (err)
                    {
                        console.log(err);
                        const newUserMongodbErrorResponse = new ErrorResponse('500', 'Internal 2 server error', err);
                        res.status(500).send(newUserMongodbErrorResponse.toObject());
                    }
                    else
                    {
                        console.log(newUser);
                        const registeredUserResponse = new BaseResponse('200', 'Query successful', newUser);
                        res.json(registeredUserResponse.toObject());
                    }
                })
            }
            else
            {
            console.log(`Username ${req.body.userName} already exists.`);
            const userInUseError = new BaseResponse('400', `The username '${req.body.userName}' is already in use.`,null);
            res.status(400).send(userInUseError.toObject());
            }
        }
    })
} catch (e)
{
    console.log(e);
    const registerUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(registerUserCatchErrorResponse.toObject());
}
});



module.exports = router;