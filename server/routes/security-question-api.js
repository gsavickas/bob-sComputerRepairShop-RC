/**
 * Title: security-question-api.js
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 16 September 2021
 * Description: This sets up the api's for the security questions. 
 */

//Here are the require statements for this file. 
const express = require('express');
const SecurityQuestion = require('../models/security-question');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

//Here we set up the express router. 
const router = express.Router();




//-------------------------------findAll API modified by Jimmy-------------------------------//

//This is the FindAllAPI.

//Here we set our route as a get request. 
router.get('/', async(req, res) => {
    try
    {
        //This is the try statement where we find all security questions where isDisabled is set to false. 
        SecurityQuestion.find({})
        .where('isDisabled')
        .equals(false)
        .exec(function(err, securityQuestions)
        {
            //This is our if statement which starts with the mongodb error response. 
            if (err)
            {
                console.log(err);
                const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findAllMongodbErrorResponse.toObject());
            }
            //If it is not an error then we return the security questions. 
            else
            {
                console.log(securityQuestions);
                const findAllResponse = new BaseResponse(200, 'Query successful', securityQuestions);
                res.json(findAllResponse.toObject());
            }
        })
    }
    //This is our catch block which contains our server error response. 
    catch (e)
    {
        console.log(e);
        const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findAllCatchErrorResponse.toObject());
    }
});







//-------------------------------CreateSecurityQuestion API modified by Larry-------------------------------//

/**
 * CreateSecurityQuestion API
 */
 router.post('/', async(req,res)  =>{
    try{
        let newSecurityQuestion = {
            text: req.body.text
        };
        SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion) {
            if(err){
                console.log(err);
                const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal Server error', err);
                res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
            }
            else{
                console.log(securityQuestion);
                const createSecurityQuestionResponse = new BaseResponse(200, 'Query Successful!', securityQuestion);
                res.json(createSecurityQuestionResponse.toObject());
            }
        })
    }
      //catch exceptions of error responses
      catch(e){
        console.log(e);
        const createSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(createSecurityQuestionCatchErrorResponse .toObject());
      }
});







//-------------------------------FindById api modified by Jimmy-------------------------------//

//This is the FindbyId API.
//This sets up our route using a get request. 
router.get('/:id', async(req, res) => {
    try
    {
        //This is uses the find one function to find the security question by the id. 
        SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {

            //This starts our if statement first setting up the mongo db error response. 
            if (err)
            {
                console.log(err);
                const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findByIdMongodbErrorResponse.toObject());
            }

            //If there is no mongodb error then it is successful and we return the security question. 
            else
            {
                console.log(securityQuestion);
                const findByIdResponse = new BaseResponse(200, 'Query successful', securityQuestion);
                res.json(findByIdResponse.toObject());
            }
        })
    }

    //This is the catch block which contains our server error response. 
    catch(e)
    {
        console.log(e);
        const findByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findByIdCatchErrorResponse.toObject());
    }
});

/**
 * Update Security Question
 */
router.put('/:id', async(req, res) => {
    try{
        //  Looks for the provide id match within the securityQuestions collection
        SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){
            if (err){
                console.log(err);
                const updateSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(updateSecurityQuestionMongodbErrorResponse.toObject());
            }
            else{
                console.log(securityQuestion);

                securityQuestion.set({
                    text: req.body.text
                });

                securityQuestion.save(function(err, savedSecurityQuestion){
                    if (err){
                        console.log(err)
                        const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                        res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
                    }
                    else{
                        console.log(savedSecurityQuestion);
                        const updateSecurityQuestionResponse = new BaseResponse(200, 'Query successful', savedSecurityQuestion);
                        res.json(updateSecurityQuestionResponse.toObject());
                    }
                })
            }
        })   
    }
    catch (e) {
        console.log(e);
        const updateSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
    }
})

/**
 * Delete a securityQuestion by Id
 */
router.delete('/:id', async (req, res) => {
    try
    {
        SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){
            if (err){
                console.log(err);
                const deleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(deleteSecurityQuestionMongodbErrorResponse.toObject());
            }
            else{
                console.log(securityQuestion);

                securityQuestion.set({
                    isDisabled: true
                });

                securityQuestion.save(function(err, savedSecurityQuestion){
                    if (err)
                    {
                        console.log(err);
                        const savedSecurityQuestionMongodbErrorResponse = new BaseResponse(500, 'Internal server error', err);
                        res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
                    }
                    else
                    {
                        console.log(err);
                        const deleteSecurityQuestionResponse = new BaseResponse(200, 'Query successful', savedSecurityQuestion);
                        res.json(deleteSecurityQuestionResponse.toObject());
                    }
                })
            }
        })
    }
    catch(e){
        console.log(e)
        const deleteSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());
    }
})

module.exports = router;