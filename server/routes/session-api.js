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

//-------------------------------VerifySecurityQuestions api modified by Larry-------------------------------//
     /**
      *
      * VerifySecurityQuestions
      */
      router.post('/verify/users/:userName/security-questions', async(req, res) =>{
        try{
            User.findOne({'userName': req.params.userName}, function(err, user){
                if (err){
                    console.log(err)
                    const verifySecurityQuestionsMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                    res.status(500).send(verifySecurityQuestionsMongodbErrorResponse.toObject());
                }
                else{
                    console.log(err);
                    const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(q => q.questionText === req.body.questionText1);
                    const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(q2 => q2.questionText === req.body.questionText2);
                    const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(q3 => q3.questionText === req.body.questionText3);

                    const isValidAnswerOne = selectedSecurityQuestionOne.answerText === req.body.answerText1;
                    const isValidAnswerTwo = selectedSecurityQuestionTwo.answerText === req.body.answerText2;
                    const isValidAnswerThree = selectedSecurityQuestionThree.answerText === req.body.answerText3;

                    if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree){
                        console.log(`User ${user.userName} answer their security questions correctly`);
                        const validSecurityQuestionsResponse = new BaseResponse('200', 'success', user);
                        res.json(validSecurityQuestionsResponse.toObject());
                    }
                    else{
                        console.log(`User ${user.userName} did not answer their security questions correctly`);
                        const invalidSecurityQuestionsResponse = new BaseResponse('200', 'error', user);
                        res.json(invalidSecurityQuestionsResponse.toObject());
                    }
                }
            })
        }
        catch (e){
            console.log(e);
            const verifySecurityQuestionCatchErrorResponse = new ErrorResponse('500', "Internal server error", e.message);
            res.status(500).send(verifySecurityQuestionCatchErrorResponse.toObject());
        }
     })


     //-------------------------------User sign-in api -------------------------------//

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
                    if (passwordIsValid && !(user.isDisabled))
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


//-------------------------------Register User api -------------------------------//


//Here we do a post request to /register.
router.post('/register', async (req, res) => {
try {
    //We first use the findOne function to find the user by Username. 
    User.findOne({'userName': req.body.userName}, function(err, user)  
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



//-------------------------------deleteUser api modified by Grayton-------------------------------//
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

/**
 * reset-password
 */
router.post('/users/:userName/reset-password', async(req, res) => {
    try
    {
        const password = req.body.password;

        User.findOne({'userName': req.params.userName}, function(err, user)
        {
            if (err)
            {
                // If there is an error in the provided password
                console.log(err)
                const resetPasswordMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(user);
                let hashedPassword = bcrypt.hashSync(password, saltRounds); 

                user.set({
                    password: hashedPassword
                });

                user.save(function(err, updatedUser)
                {
                    if (err)
                    {
                        console.log(err)
                        const updatedUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                        res.status(500).send(updatedUserMongodbErrorResponse.toObject())
                    }
                    else
                    {
                        console.log(updatedUser);
                        const updatedPasswordResponse = new BaseResponse('200', 'Query successful', updatedUser);
                        res.json(updatedPasswordResponse.toObject());
                    }
                })
            }
        });
    }
    catch(e)
    {
        console.log(e);
        const resetPasswordCatchError = new ErrorResponse('500', 'Internal server error', e);
        res.status(500).send(resetPasswordCatchError.toObject());
    }
})

module.exports = router;