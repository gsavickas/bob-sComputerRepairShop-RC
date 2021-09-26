/**
 * * Title: session-api.js
 * Author: Grayton Savickas, James Pinson
 * Date: 09/25/21
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

//This is the register user api. 

//Here we do a post request to /register.
router.post('/register', async (req, res) => {
try {
    //We first use the findOne function to find the user by Username. 
    User.findOne({'userName': reg.body.userName}, function(err, user)  
    {
        //Here we log the error if there is a mongoDB error.
        if (err) {
            console.log(err);
            const registerUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(registerUserMongodbErrorResponse.toObject());
        }
        else
        {
            //This checks for a user and begins the registration process. 
            if (!user)
            {
                //Here we hash the password and set the role to standard. 
                let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
                standardRole = {
                    role: "standard"
                }

                //Here we set up the required fields for the registered user. 
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

                //We call the user create function.
                User.create(registeredUser, function(err, newUser)
                {
                    //If there is a mongoDB server error we log it here. 
                    if (err)
                    {
                        console.log(err);
                        const newUserMongodbErrorResponse = new ErrorResponse('500', 'Internal 2 server error', err);
                        res.status(500).send(newUserMongodbErrorResponse.toObject());
                    }
                    //Here we return the new user if successful. 
                    else
                    {
                        console.log(newUser);
                        const registeredUserResponse = new BaseResponse('200', 'Query successful', newUser);
                        res.json(registeredUserResponse.toObject());
                    }
                })
            }
            //If the userName already exist we return this error message. 
            else
            {
            console.log(`Username ${req.body.userName} already exists.`);
            const userInUseError = new BaseResponse('400', `The username '${req.body.userName}' is already in use.`,null);
            res.status(400).send(userInUseError.toObject());
            }
        }
    })
    //Here we return the error message if there is a server error. 
} catch (e)
{
    console.log(e);
    const registerUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(registerUserCatchErrorResponse.toObject());
}
});

//This is the api for findSelectedSecurityQuestions

//Here we do a get request using the username/security-questions.
router.get('/:userName/security-questions', async (req, res) => {
    try
    {
        //Here we call the findOne function based on the userName to return a user. 
        User.findOne({'userName': req.params.userName}, function(err,user)
        {
            //Here we log the error if there is Mongodb server error. 
            if (err)
            {
                console.log(err);
                const findSelectedSecurityQuestionsMongodbErrorResponse = new ErrorResponse('500', "Internal server error", err);
                res.status(500).send(findSelectedSecurityQuestionsMongodbErrorResponse.toObject());
            }
            //Here we return the users selected security questions.
            else
            {
                console.log(user);
                const findSelectedSecurityQuestionsResponse = new BaseResponse('200', 'Query successful', user.selectedSecurityQuestions);
                res.json(findSelectedSecurityQuestionsResponse.toObject());
            }
        })
    }
    //Here we log the response if there is a server error. 
    catch (e)
    {
        console.log(e);
        const findSelectedSecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e);
        res.status(500).send(findSelectedSecurityQuestionsCatchErrorResponse.toObject());
    }
});

/**
 * VerifyUser
 */
router.get('/verify/users/:userName', async (req, res) => {
    try
    {
        // Compares userName value in provided user object
        User.findOne({'userName': req.params.userName}, function(err, user){
            if (user){
                if (err)
                {
                    //If there is an error with the provided user
                    console.log(err)
                    const verifyUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                    res.status(500).send(verifyUserMongodbErrorResponse.toObject());
                }
                else
                {
                    //If the userName does exist
                    console.log(user);
                    const verifyUserResponse = new BaseResponse('200', 'Query successful', user);
                    res.json(verifyUserResponse.toObject());
                }
                // If the userName does not exist
            } else{
                const invalidUsernameResponse = new BaseResponse('400', 'Invalid username', req.params.userName);
                res.status(400).send(invalidUsernameResponse.toObject());
            }
        })
    }
    catch (e)
    {
        // Catch any error from the server
        console.log(e);
        const verifyUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(verifyUserCatchErrorResponse.toObject())
    }
})

module.exports = router;